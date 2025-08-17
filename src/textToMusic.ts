import { MusicData, Track, Note, Chord } from './parser';

export interface TextToMusicOptions {
  style: 'melodic' | 'rhythmic' | 'harmonic' | 'ambient';
  scale: 'major' | 'minor' | 'pentatonic' | 'chromatic';
  tempo: number;
  baseOctave: number;
  instruments: string[];
}

export class TextToMusicConverter {
  private defaultOptions: TextToMusicOptions = {
    style: 'melodic',
    scale: 'major',
    tempo: 120,
    baseOctave: 4,
    instruments: ['piano']
  };

  // Musical scales for mapping
  private scales = {
    major: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    minor: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
    pentatonic: ['C', 'D', 'E', 'G', 'A'],
    chromatic: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  };

  // Character to note mapping
  private getCharacterNote(char: string, scale: string[], baseOctave: number): Note {
    const charCode = char.toLowerCase().charCodeAt(0);
    
    // Map characters to scale positions
    let noteIndex: number;
    if (char >= 'a' && char <= 'z') {
      noteIndex = (charCode - 97) % scale.length; // a=0, b=1, etc., wrapping around scale
    } else if (char >= '0' && char <= '9') {
      noteIndex = parseInt(char) % scale.length;
    } else {
      // For special characters, use ASCII value
      noteIndex = charCode % scale.length;
    }

    const pitch = scale[noteIndex];
    
    // Determine octave based on character type and position in alphabet
    let octave = baseOctave;
    if (char >= 'a' && char <= 'z') {
      // Vary octave based on position in alphabet
      octave += Math.floor((charCode - 97) / scale.length);
      octave = Math.max(2, Math.min(6, octave)); // Keep within reasonable range
    }

    // Determine duration and velocity based on character type
    let duration = 0.5; // Default duration
    let velocity = 0.7; // Default velocity

    if (this.isVowel(char)) {
      duration = 1.0; // Vowels get longer notes
      velocity = 0.8;
    } else if (char === ' ') {
      duration = 0.25; // Spaces are short rests
      velocity = 0;
    } else if (this.isPunctuation(char)) {
      duration = 0.75; // Punctuation gets medium length
      velocity = 0.6;
    }

    return {
      pitch,
      octave,
      duration,
      velocity
    };
  }

  private isVowel(char: string): boolean {
    return 'aeiouAEIOU'.includes(char);
  }

  private isPunctuation(char: string): boolean {
    return '.,!?;:()-"\''.includes(char);
  }

  private analyzeTextStructure(text: string) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);

    return {
      sentences,
      words,
      paragraphs,
      totalChars: text.length,
      wordCount: words.length,
      sentenceCount: sentences.length,
      paragraphCount: paragraphs.length
    };
  }

  public convertTextToMusic(text: string, options: Partial<TextToMusicOptions> = {}): MusicData {
    const opts = { ...this.defaultOptions, ...options };
    const scale = this.scales[opts.scale];
    const structure = this.analyzeTextStructure(text);

    const musicData: MusicData = {
      tracks: [],
      tempo: opts.tempo
    };

    // Create tracks based on style
    switch (opts.style) {
      case 'melodic':
        musicData.tracks.push(this.createMelodicTrack(text, scale, opts));
        break;
      case 'rhythmic':
        musicData.tracks.push(this.createMelodicTrack(text, scale, opts));
        musicData.tracks.push(this.createRhythmicTrack(text, opts));
        break;
      case 'harmonic':
        musicData.tracks.push(this.createMelodicTrack(text, scale, opts));
        musicData.tracks.push(this.createHarmonicTrack(text, scale, opts));
        break;
      case 'ambient':
        musicData.tracks.push(this.createAmbientTrack(text, scale, opts));
        break;
    }

    return musicData;
  }

  private createMelodicTrack(text: string, scale: string[], options: TextToMusicOptions): Track {
    const notes: Note[] = [];
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const note = this.getCharacterNote(char, scale, options.baseOctave);
      notes.push(note);
    }

    // Group notes into chords (one note per chord for melody)
    const chords: Chord[] = notes.map(note => ({
      notes: note.velocity > 0 ? [note] : [], // Skip rest notes
      duration: note.duration
    }));

    // Group chords into patterns based on words/sentences
    const patterns: Chord[][] = [];
    let currentPattern: Chord[] = [];
    let charIndex = 0;

    for (const chord of chords) {
      currentPattern.push(chord);
      
      // Start new pattern at word boundaries or every 8 chords
      if (charIndex < text.length && (text[charIndex] === ' ' || currentPattern.length >= 8)) {
        if (currentPattern.length > 0) {
          patterns.push([...currentPattern]);
          currentPattern = [];
        }
      }
      charIndex++;
    }

    // Add remaining pattern
    if (currentPattern.length > 0) {
      patterns.push(currentPattern);
    }

    return {
      instrument: options.instruments[0] || 'piano',
      patterns: patterns.length > 0 ? patterns : [[]]
    };
  }

  private createRhythmicTrack(text: string, options: TextToMusicOptions): Track {
    const chords: Chord[] = [];
    
    // Create rhythm based on text structure
    const words = text.split(/\s+/);
    for (const word of words) {
      // Kick on word start
      chords.push({
        notes: [{ pitch: 'k', octave: 0, duration: 0.25, velocity: 0.8 }],
        duration: 0.25
      });
      
      // Hi-hat between characters
      for (let i = 1; i < word.length; i++) {
        chords.push({
          notes: [{ pitch: 'h', octave: 0, duration: 0.125, velocity: 0.4 }],
          duration: 0.125
        });
      }
      
      // Snare at word end if punctuation follows
      if (this.isPunctuation(word[word.length - 1])) {
        chords.push({
          notes: [{ pitch: 's', octave: 0, duration: 0.25, velocity: 0.7 }],
          duration: 0.25
        });
      }
    }

    return {
      instrument: 'drums',
      patterns: [chords]
    };
  }

  private createHarmonicTrack(text: string, scale: string[], options: TextToMusicOptions): Track {
    const chords: Chord[] = [];
    const words = text.split(/\s+/);
    
    // Create harmony based on words
    for (const word of words) {
      if (word.length >= 3) {
        // Create chord from first 3 characters
        const harmonicNotes: Note[] = [];
        for (let i = 0; i < Math.min(3, word.length); i++) {
          const note = this.getCharacterNote(word[i], scale, options.baseOctave - 1);
          note.duration = word.length * 0.25; // Longer words = longer chords
          note.velocity *= 0.6; // Softer for harmony
          harmonicNotes.push(note);
        }
        
        chords.push({
          notes: harmonicNotes,
          duration: word.length * 0.25
        });
      }
    }

    return {
      instrument: 'strings',
      patterns: [chords]
    };
  }

  private createAmbientTrack(text: string, scale: string[], options: TextToMusicOptions): Track {
    const chords: Chord[] = [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Create ambient pads based on sentence characteristics
    for (const sentence of sentences) {
      const vowelCount = sentence.split('').filter(c => this.isVowel(c)).length;
      const consonantCount = sentence.length - vowelCount;
      
      // Base note from first character
      const baseNote = this.getCharacterNote(sentence[0], scale, options.baseOctave - 1);
      baseNote.duration = 2.0; // Long ambient notes
      baseNote.velocity = 0.5;
      
      // Add harmonic content based on vowel/consonant ratio
      const ambientNotes = [baseNote];
      if (vowelCount > consonantCount) {
        // More vowels = brighter harmony
        const brightNote = this.getCharacterNote(sentence[sentence.length - 1], scale, options.baseOctave);
        brightNote.duration = 2.0;
        brightNote.velocity = 0.3;
        ambientNotes.push(brightNote);
      }

      chords.push({
        notes: ambientNotes,
        duration: 2.0
      });
    }

    return {
      instrument: 'choir',
      patterns: [chords]
    };
  }

  // Convert music data to notation string for compatibility with existing system
  public musicDataToNotation(musicData: MusicData): string {
    let notation = `tempo:${musicData.tempo};`;
    
    for (const track of musicData.tracks) {
      notation += `${track.instrument}:`;
      
      const patternNotations: string[] = [];
      for (const pattern of track.patterns) {
        const chordNotations: string[] = [];
        
        for (const chord of pattern) {
          if (chord.notes.length === 0) {
            continue; // Skip empty chords (rests)
          }
          
          const noteNotations = chord.notes.map(note => {
            if (track.instrument.toLowerCase() === 'drums') {
              return `${note.pitch}.${note.duration}`;
            } else {
              return `${note.pitch}${note.octave}.${note.duration}`;
            }
          });
          
          chordNotations.push(noteNotations.join('+'));
        }
        
        if (chordNotations.length > 0) {
          patternNotations.push(chordNotations.join(','));
        }
      }
      
      notation += patternNotations.join('|') + ';';
    }
    
    return notation;
  }
}