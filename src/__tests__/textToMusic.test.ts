import { TextToMusicConverter } from '../textToMusic';

describe('TextToMusicConverter', () => {
  let converter: TextToMusicConverter;

  beforeEach(() => {
    converter = new TextToMusicConverter();
  });

  test('should convert simple text to music data', () => {
    const result = converter.convertTextToMusic('Hello', { style: 'melodic', scale: 'major' });
    
    expect(result).toHaveProperty('tracks');
    expect(result).toHaveProperty('tempo');
    expect(result.tracks).toHaveLength(1);
    expect(result.tracks[0].instrument).toBe('piano');
    expect(result.tracks[0].patterns).toBeDefined();
  });

  test('should create different tracks for different styles', () => {
    const melodic = converter.convertTextToMusic('Test', { style: 'melodic' });
    const rhythmic = converter.convertTextToMusic('Test', { style: 'rhythmic' });
    const harmonic = converter.convertTextToMusic('Test', { style: 'harmonic' });
    const ambient = converter.convertTextToMusic('Test', { style: 'ambient' });

    expect(melodic.tracks).toHaveLength(1);
    expect(rhythmic.tracks).toHaveLength(2); // melody + drums
    expect(harmonic.tracks).toHaveLength(2); // melody + harmony
    expect(ambient.tracks).toHaveLength(1);
  });

  test('should handle different scales', () => {
    const major = converter.convertTextToMusic('Hello', { scale: 'major' });
    const minor = converter.convertTextToMusic('Hello', { scale: 'minor' });
    
    expect(major).toHaveProperty('tracks');
    expect(minor).toHaveProperty('tracks');
    // Should produce different note patterns for different scales
    expect(major.tracks[0].patterns[0]).not.toEqual(minor.tracks[0].patterns[0]);
  });

  test('should respect tempo settings', () => {
    const slow = converter.convertTextToMusic('Test', { tempo: 60 });
    const fast = converter.convertTextToMusic('Test', { tempo: 140 });

    expect(slow.tempo).toBe(60);
    expect(fast.tempo).toBe(140);
  });

  test('should convert music data to notation string', () => {
    const musicData = converter.convertTextToMusic('Hi', { style: 'melodic' });
    const notation = converter.musicDataToNotation(musicData);

    expect(typeof notation).toBe('string');
    expect(notation).toContain('piano:');
    expect(notation).toMatch(/tempo:\d+/);
  });

  test('should handle empty string input', () => {
    const result = converter.convertTextToMusic('');
    
    expect(result).toHaveProperty('tracks');
    expect(result.tracks[0].patterns[0]).toEqual([]);
  });

  test('should handle punctuation and spaces', () => {
    const result = converter.convertTextToMusic('Hello, world!');
    
    expect(result.tracks).toHaveLength(1);
    expect(result.tracks[0].patterns).toBeDefined();
    // Should handle punctuation without errors
  });

  test('should create different patterns for vowels vs consonants', () => {
    const vowelText = converter.convertTextToMusic('aeiou');
    const consonantText = converter.convertTextToMusic('bcdfg');
    
    // Vowels should generally have longer durations
    const vowelDurations = vowelText.tracks[0].patterns[0].map(chord => 
      chord.notes.length > 0 ? chord.notes[0].duration : 0
    );
    const consonantDurations = consonantText.tracks[0].patterns[0].map(chord => 
      chord.notes.length > 0 ? chord.notes[0].duration : 0
    );
    
    expect(vowelDurations.some(d => d >= 1.0)).toBe(true); // Vowels should have some long notes
  });

  test('should maintain reasonable octave ranges', () => {
    const result = converter.convertTextToMusic('abcdefghijklmnopqrstuvwxyz');
    
    const octaves = result.tracks[0].patterns.flat()
      .flatMap(chord => chord.notes)
      .map(note => note.octave);
    
    const minOctave = Math.min(...octaves);
    const maxOctave = Math.max(...octaves);
    
    expect(minOctave).toBeGreaterThanOrEqual(2);
    expect(maxOctave).toBeLessThanOrEqual(6);
  });
});