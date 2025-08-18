import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { MusicData } from './parser';
import { TextToMusicConverter, TextToMusicOptions } from './textToMusic';

export interface LangChainOptions {
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  provider?: 'openai' | 'gemini';
}

export interface EnhancedTextToMusicOptions extends TextToMusicOptions {
  useLangChain?: boolean;
  langChainOptions?: LangChainOptions;
  mood?: 'happy' | 'sad' | 'energetic' | 'peaceful' | 'dramatic' | 'romantic' | 'mysterious' | 'balanced';
  complexity?: 'simple' | 'moderate' | 'complex';
}

export class LangChainTextToMusicConverter {
  private readonly fallbackConverter: TextToMusicConverter;
  private readonly defaultLangChainOptions: LangChainOptions = {
    model: 'gemini-1.5-pro',
    temperature: 0.7,
    maxTokens: 1000,
    provider: 'gemini'
  };

  constructor() {
    this.fallbackConverter = new TextToMusicConverter();
  }

  private createSystemPrompt(options: EnhancedTextToMusicOptions): string {
    const { style, scale, tempo, mood, complexity } = options;
    
    return `You are an expert music composer and notation system specialist. Your task is to convert user text into beautiful musical notation using a specific format.

NOTATION FORMAT:
- Structure: instrument:notes|measures;next_instrument:notes;
- Instruments: piano, violin, bass, drums, panduri, choir, timpani, strings
- Notes: PitchOctave.Duration (e.g., C4.1, F#3.0.5)
- Chords: Use + to join notes (C4.1+E4.1+G4.1)
- Measures: Separate with | 
- Duration: 0.25=sixteenth, 0.5=eighth, 1=quarter, 2=half, 4=whole
- Drums: k=kick, s=snare, h=hi-hat, d=frame_drum

COMPOSITION GUIDELINES:
- Style: ${style}
- Scale: ${scale} (${this.getScaleNotes(scale)})
- Tempo: ${tempo} BPM
- Mood: ${mood || 'balanced'}
- Complexity: ${complexity || 'moderate'}

MUSICAL RULES:
1. Create meaningful musical phrases that reflect the text's emotion and rhythm
2. Use appropriate harmonies for the chosen scale
3. Vary note durations to create interesting rhythmic patterns  
4. Add bass lines and percussion when appropriate for the style
5. Keep octaves between 2-6 for realistic playback
6. Consider the text's punctuation for musical phrasing
7. Match the mood with appropriate chord progressions and instrument choices

STYLE SPECIFIC INSTRUCTIONS:
- melodic: Focus on a single beautiful melody line
- rhythmic: Add drum tracks and varied rhythmic patterns
- harmonic: Include chord progressions and multiple instruments
- ambient: Use longer notes, choir/strings, create atmospheric soundscapes

EXAMPLES:
Simple piano melody: "piano:C4.1,D4.1,E4.1,F4.1|G4.2,F4.1,E4.1|D4.1,C4.2;"
Rock with bass/drums: "piano:C4.0.5+E4.0.5+G4.0.5,F4.0.5+A4.0.5+C5.0.5|G4.0.5+B4.0.5+D5.0.5,C4.1+E4.1+G4.1;bass:C2.1|F2.1|G2.1,C2.1;drums:k.0.5,s.0.5,k.0.5,s.0.5|k.0.5,s.0.5,h.0.25,h.0.25,s.0.5;"

Now convert the user's text into musical notation that captures its essence and emotion. Return ONLY the notation string, no explanations.`;
  }

  private getScaleNotes(scale: string): string {
    const scales = {
      major: 'C D E F G A B',
      minor: 'C D Eb F G Ab Bb',  
      pentatonic: 'C D E G A',
      chromatic: 'C C# D D# E F F# G G# A A# B'
    };
    return scales[scale as keyof typeof scales] || scales.major;
  }

  private async generateNotationWithLangChain(
    text: string,
    options: EnhancedTextToMusicOptions
  ): Promise<string> {
    const { langChainOptions } = options;
    
    // Determine provider from options or environment
    const provider = langChainOptions?.provider || 
      (typeof process !== 'undefined' && process.env?.AI_PROVIDER) || 
      this.defaultLangChainOptions.provider || 'gemini';
    
    // Get API key based on provider
    let apiKey = langChainOptions?.apiKey;
    if (!apiKey && typeof process !== 'undefined' && process.env) {
      if (provider === 'gemini') {
        apiKey = process.env.GEMINI_API_KEY;
      } else {
        apiKey = process.env.OPENAI_API_KEY;
      }
    }
    if (!apiKey && typeof window !== 'undefined') {
      if (provider === 'gemini') {
        apiKey = (window as any).GEMINI_API_KEY;
      } else {
        apiKey = (window as any).OPENAI_API_KEY;
      }
    }

    if (!apiKey) {
      throw new Error(`${provider === 'gemini' ? 'Gemini' : 'OpenAI'} API key not provided. Please set ${provider === 'gemini' ? 'GEMINI_API_KEY' : 'OPENAI_API_KEY'} environment variable or provide it in langChainOptions.`);
    }

    // Create the appropriate LLM based on provider
    let llm;
    if (provider === 'gemini') {
      llm = new ChatGoogleGenerativeAI({
        apiKey: apiKey,
        model: langChainOptions?.model || 'gemini-1.5-pro',
        temperature: langChainOptions?.temperature ?? this.defaultLangChainOptions.temperature,
        maxOutputTokens: langChainOptions?.maxTokens || this.defaultLangChainOptions.maxTokens,
      });
    } else {
      llm = new ChatOpenAI({
        openAIApiKey: apiKey,
        modelName: langChainOptions?.model || 'gpt-3.5-turbo',
        temperature: langChainOptions?.temperature ?? this.defaultLangChainOptions.temperature,
        maxTokens: langChainOptions?.maxTokens || this.defaultLangChainOptions.maxTokens,
      });
    }

    const systemPrompt = this.createSystemPrompt(options);
    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(`Convert this text to musical notation: "${text}"`)
    ];

    try {
      const response = await llm.invoke(messages);
      let notation: string;
      
      if (typeof response.content === 'string') {
        notation = response.content.trim();
      } else if (Array.isArray(response.content)) {
        // Handle array of content parts (for some models)
        notation = response.content
          .map(part => typeof part === 'string' ? part : JSON.stringify(part))
          .join('').trim();
      } else {
        // Fallback for other content types
        notation = JSON.stringify(response.content).trim();
      }
      
      console.log('🚀 ~ LangChainTextToMusicConverter ~ generateNotationWithLangChain ~ notation:', notation)
      
      // Validate that the response looks like notation
      if (!this.isValidNotation(notation)) {
        throw new Error('Generated notation appears to be invalid');
      }

      return notation;
    } catch (error) {
      console.warn(`${provider === 'gemini' ? 'Gemini' : 'OpenAI'} generation failed:`, error);
      throw error;
    }
  }

  private isValidNotation(notation: string): boolean {
    // Basic validation to ensure the response looks like musical notation
    const hasInstrument = /\w+\s*:/.test(notation);
    const hasNotes = /[A-G][#b]?\d+\.\d+/.test(notation);
    const hasSemicolon = /;/.test(notation);
    
    return hasInstrument && hasNotes && hasSemicolon;
  }

  public async convertTextToNotation(
    text: string,
    options: Partial<EnhancedTextToMusicOptions> = {}
  ): Promise<string> {
    const opts: EnhancedTextToMusicOptions = {
      style: 'melodic',
      scale: 'major',
      tempo: 120,
      baseOctave: 4,
      instruments: ['piano'],
      useLangChain: true,
      mood: 'balanced',
      complexity: 'moderate',
      ...options
    };

    if (opts.useLangChain) {
      try {
        return await this.generateNotationWithLangChain(text, opts);
      } catch (error) {
        console.warn('LangChain conversion failed, falling back to rule-based converter:', error);
        // Fall back to rule-based converter
        const musicData = this.fallbackConverter.convertTextToMusic(text, opts);
        return this.fallbackConverter.musicDataToNotation(musicData);
      }
    } else {
      // Use the original rule-based converter
      const musicData = this.fallbackConverter.convertTextToMusic(text, opts);
      return this.fallbackConverter.musicDataToNotation(musicData);
    }
  }

  public async convertTextToMusic(
    text: string,
    options: Partial<EnhancedTextToMusicOptions> = {}
  ): Promise<MusicData> {
    // For now, we generate notation first and then parse it
    // This ensures compatibility with the existing system
    await this.convertTextToNotation(text, options);
    
    // We would need access to MusicParser to parse the generated notation
    // For now, return a basic structure - this should be integrated with the main converter
    const musicData: MusicData = {
      tracks: [],
      tempo: options.tempo || 120
    };

    // This is a placeholder - in the actual integration, we'll parse the generated notation
    return musicData;
  }

  // Utility method to check if LangChain is available
  public static isLangChainAvailable(): boolean {
    // Check for environment variables in both Node.js and browser environments
    const hasOpenAIKey = typeof process !== 'undefined' && process.env?.OPENAI_API_KEY ||
      typeof window !== 'undefined' && (window as any).OPENAI_API_KEY;
    const hasGeminiKey = typeof process !== 'undefined' && process.env?.GEMINI_API_KEY ||
      typeof window !== 'undefined' && (window as any).GEMINI_API_KEY;
    
    return !!(hasOpenAIKey || hasGeminiKey);
  }
}