import { MusicData, Track, Note, Chord } from './parser';

export class TextToMusicConverter {

  // Musical scales for mapping
  private readonly scales = {
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

  public convertTextToMusic(text: string): MusicData {
    const scale = this.scales.major;

    const musicData: MusicData = {
      tracks: [],
      tempo: 120
    };

    // Create melodic track (simplified, no style options)
    musicData.tracks.push(this.createMelodicTrack(text, scale));

    return musicData;
  }

  private createMelodicTrack(text: string, scale: string[]): Track {
    const notes: Note[] = [];
    
    for (const char of text) {
      const note = this.getCharacterNote(char, scale, 4); // baseOctave = 4
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
      instrument: 'piano',
      patterns: patterns.length > 0 ? patterns : [[]]
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