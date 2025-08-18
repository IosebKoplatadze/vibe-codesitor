import { MusicParser } from './parser';
import { AudioEngine } from './audio';
import { TextToMusicConverter, TextToMusicOptions } from './textToMusic';
import { LangChainTextToMusicConverter, EnhancedTextToMusicOptions } from './langchainTextToMusic';

// Main entry point for the application
class MusicConverter {
  private parser: MusicParser;
  private textConverter: TextToMusicConverter;
  private langChainConverter: LangChainTextToMusicConverter;
  public audioEngine: AudioEngine; // Make it public for stop functionality

  constructor() {
    this.parser = new MusicParser();
    this.textConverter = new TextToMusicConverter();
    this.langChainConverter = new LangChainTextToMusicConverter();
    this.audioEngine = new AudioEngine();
  }

  // Detect if input is structured notation or plain text
  private isNotationFormat(input: string): boolean {
    // Check for notation patterns: instrument:notes format
    const notationPattern = /\w+\s*:\s*[A-Ga-g#b0-9.,+|;\s]+/;
    const tempoPattern = /tempo\s*:\s*\d+/;
    
    return notationPattern.test(input) || tempoPattern.test(input);
  }

  public async convertToMusic(input: string, textOptions?: Partial<EnhancedTextToMusicOptions>): Promise<void> {
    let musicData;
    
    if (this.isNotationFormat(input)) {
      // Use existing notation parser
      musicData = this.parser.parse(input);
    } else {
      // Check if we should use LangChain or fallback converter
      if (textOptions?.useLangChain && this.hasValidApiKey(textOptions)) {
        // Generate notation using LangChain and then parse it
        const notation = await this.langChainConverter.convertTextToNotation(input, textOptions);
        musicData = this.parser.parse(notation);
      } else {
        // Convert text to music using rule-based converter
        musicData = this.textConverter.convertTextToMusic(input, textOptions);
      }
    }
    
    await this.audioEngine.play(musicData);
  }

  public async convertTextToNotation(text: string, options?: Partial<EnhancedTextToMusicOptions>): Promise<string> {
    // Check if we should use LangChain or fallback converter
    if (options?.useLangChain && this.hasValidApiKey(options)) {
      return await this.langChainConverter.convertTextToNotation(text, options);
    } else {
      // Use rule-based converter
      const musicData = this.textConverter.convertTextToMusic(text, options);
      return this.textConverter.musicDataToNotation(musicData);
    }
  }

  // Helper method to check if we have a valid API key
  private hasValidApiKey(options?: Partial<EnhancedTextToMusicOptions>): boolean {
    const apiKey = options?.langChainOptions?.apiKey;
    return !!(apiKey && apiKey.trim().length > 0);
  }
}

// Example usage
async function demo() {
  const converter = new MusicConverter();
  
  // Example with text input
  const textInput = "Hello world! This is a test of text to music conversion.";
  console.log("Converting text to music:", textInput);
  
  // Convert text with different styles
  await converter.convertToMusic(textInput, { 
    style: 'melodic', 
    scale: 'major',
    tempo: 120 
  });
  
  // Example with traditional notation (still works)
  const notation = `
    piano:C4.1+E4.1+G4.1|F4.1+A4.1+C5.1;
    bass:C2.2|G2.2;
    drums:k.0.5,s.0.5,k.0.5,s.0.5|k.0.5,s.0.5,k.0.5,s.0.5;
  `;
  
  setTimeout(async () => {
    console.log("Converting notation to music");
    await converter.convertToMusic(notation);
  }, 3000);
}

// Run the demo when page loads (only in browser environment)
if (typeof window !== 'undefined') {
  // Expose MusicConverter globally for UI to access
  (window as any).MusicConverter = MusicConverter;
  
  window.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('beethoven-button');
    if (startButton) {
      startButton.addEventListener('click', demo);
    }
  });
}

export default MusicConverter;
export { MusicConverter, TextToMusicConverter, LangChainTextToMusicConverter };
export type { TextToMusicOptions } from './textToMusic';
export type { EnhancedTextToMusicOptions, LangChainOptions } from './langchainTextToMusic';