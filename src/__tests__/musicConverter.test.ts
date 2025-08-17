import { MusicConverter } from '../index';

// Mock the AudioEngine since we can't play audio in tests
jest.mock('../audio', () => ({
  AudioEngine: jest.fn().mockImplementation(() => ({
    play: jest.fn().mockResolvedValue(undefined),
    stop: jest.fn()
  }))
}));

describe('MusicConverter Integration', () => {
  let converter: MusicConverter;

  beforeEach(() => {
    converter = new MusicConverter();
  });

  test('should detect notation format correctly', async () => {
    const notationInput = 'piano:C4.1+E4.1+G4.1;';
    const textInput = 'Hello world';

    // Should not throw errors
    await expect(converter.convertToMusic(notationInput)).resolves.not.toThrow();
    await expect(converter.convertToMusic(textInput)).resolves.not.toThrow();
  });

  test('should convert text to notation', () => {
    const text = 'Hello world';
    const notation = converter.convertTextToNotation(text);

    expect(typeof notation).toBe('string');
    expect(notation).toContain('tempo:');
    expect(notation).toContain('piano:');
  });

  test('should handle text with custom options', () => {
    const text = 'Test music';
    const options = {
      style: 'rhythmic' as const,
      scale: 'minor' as const,
      tempo: 90
    };

    const notation = converter.convertTextToNotation(text, options);

    expect(notation).toContain('tempo:90');
    // Should contain both piano and drums for rhythmic style
    expect(notation).toMatch(/piano:.*drums:/);
  });

  test('should preserve backward compatibility with notation', async () => {
    const notation = 'piano:C4.1,D4.1,E4.1;';
    
    // Should handle traditional notation without errors
    await expect(converter.convertToMusic(notation)).resolves.not.toThrow();
  });
});