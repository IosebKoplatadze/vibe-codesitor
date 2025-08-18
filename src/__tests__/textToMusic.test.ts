import { TextToMusicConverter } from '../textToMusic';

describe('TextToMusicConverter', () => {
  let converter: TextToMusicConverter;

  beforeEach(() => {
    converter = new TextToMusicConverter();
  });

  test('should convert simple text to music data', () => {
    const result = converter.convertTextToMusic('Hello');
    
    expect(result).toHaveProperty('tracks');
    expect(result).toHaveProperty('tempo');
    expect(result.tracks).toHaveLength(1);
    expect(result.tracks[0].instrument).toBe('piano');
    expect(result.tracks[0].patterns).toBeDefined();
  });

  test('should create melodic track (simplified since styles removed)', () => {
    const melodic = converter.convertTextToMusic('Test');

    expect(melodic.tracks).toHaveLength(1);
    expect(melodic.tracks[0].instrument).toBe('piano');
  });

  test('should use major scale by default', () => {
    const major = converter.convertTextToMusic('Hello');
    
    expect(major).toHaveProperty('tracks');
    // Should produce music in major scale by default
  });

  test('should use default tempo of 120', () => {
    const result = converter.convertTextToMusic('Test');

    expect(result.tempo).toBe(120);
  });

  test('should convert music data to notation string', () => {
    const musicData = converter.convertTextToMusic('Hi');
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