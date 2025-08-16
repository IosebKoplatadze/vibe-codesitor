export interface Note {
  pitch: string;
  octave: number;
  duration: number;
  velocity: number;
}

export interface Chord {
  notes: Note[];
  duration: number;
}

export interface Track {
  instrument: string;
  patterns: Chord[][];
}

export interface MusicData {
  tracks: Track[];
  tempo: number;
}

export class MusicParser {
  private removeComments(notation: string): string {
    // Split by lines to handle line-by-line comment removal
    const lines = notation.split('\n');
    const cleanLines = lines.map(line => {
      // Find the first occurrence of '//'
      const commentIndex = line.indexOf('//');
      if (commentIndex !== -1) {
        // Return everything before the comment
        return line.substring(0, commentIndex);
      }
      return line;
    });
    
    // Join lines back and return
    return cleanLines.join('\n');
  }

  parse(notation: string): MusicData {
    const musicData: MusicData = {
      tracks: [],
      tempo: 120
    };

    // Remove comments first, then clean up the input
    const commentFreeNotation = this.removeComments(notation);
    const cleanNotation = commentFreeNotation.trim();
    
    // Split by instruments (separated by semicolons)
    const trackStrings = cleanNotation.split(';').filter(t => t.trim().length > 0);
    
    for (const trackString of trackStrings) {
      const [instrumentPart, patternPart] = trackString.trim().split(':');
      if (!instrumentPart || !patternPart) continue;
      
      const instrument = instrumentPart.trim();
      const track: Track = {
        instrument,
        patterns: []
      };
      
      // Split by patterns/measures (separated by pipes)
      const patternStrings = patternPart.split('|');
      
      for (const patternString of patternStrings) {
        if (!patternString.trim()) continue;
        
        const pattern: Chord[] = [];
        
        // Split by chords/notes (separated by commas)
        const chordStrings = patternString.trim().split(',');
        
        for (const chordString of chordStrings) {
          if (!chordString.trim()) continue;
          
          // Split chord into individual notes (joined with +)
          const noteStrings = chordString.trim().split('+');
          const notes: Note[] = [];
          let maxDuration = 0;
          
          for (const noteString of noteStrings) {
            // Parse each note (e.g., "C4.1" or "k.0.5" for drums)
            const isDrum = instrument.toLowerCase() === 'drums';
            
            if (isDrum) {
              const [sound, duration] = noteString.split('.');
              const note: Note = {
                pitch: sound,
                octave: 0,
                duration: parseFloat(duration) || 1,
                velocity: 1
              };
              notes.push(note);
              maxDuration = Math.max(maxDuration, note.duration);
            } else {
              // For melodic instruments
              const match = noteString.match(/([A-Ga-g][#b]?)(\d+)\.(\d+(\.\d+)?)/);
              if (match) {
                const [_, pitch, octave, duration] = match;
                const note: Note = {
                  pitch,
                  octave: parseInt(octave, 10),
                  duration: parseFloat(duration),
                  velocity: 1
                };
                notes.push(note);
                maxDuration = Math.max(maxDuration, note.duration);
              }
            }
          }
          
          pattern.push({ notes, duration: maxDuration });
        }
        
        track.patterns.push(pattern);
      }
      
      musicData.tracks.push(track);
    }
    
    return musicData;
  }
}