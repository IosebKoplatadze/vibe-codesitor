import { LangChainTextToMusicConverter } from '../langchainTextToMusic';

// Mock the LangChain imports to avoid Jest configuration issues
jest.mock('@langchain/openai', () => ({
  ChatOpenAI: jest.fn()
}));

jest.mock('@langchain/google-genai', () => ({
  ChatGoogleGenerativeAI: jest.fn()
}));

jest.mock('@langchain/core/messages', () => ({
  SystemMessage: jest.fn(),
  HumanMessage: jest.fn()
}));

describe('LangChainTextToMusicConverter', () => {
  let converter: LangChainTextToMusicConverter;

  beforeEach(() => {
    converter = new LangChainTextToMusicConverter();
  });

  describe('isLangChainAvailable', () => {
    it('should return false when no API key is available', () => {
      delete process.env.OPENAI_API_KEY;
      delete process.env.GEMINI_API_KEY;
      expect(LangChainTextToMusicConverter.isLangChainAvailable()).toBe(false);
    });

    it('should return true when OpenAI API key is available', () => {
      process.env.OPENAI_API_KEY = 'test-key';
      expect(LangChainTextToMusicConverter.isLangChainAvailable()).toBe(true);
      delete process.env.OPENAI_API_KEY;
    });

    it('should return true when Gemini API key is available', () => {
      process.env.GEMINI_API_KEY = 'test-key';
      expect(LangChainTextToMusicConverter.isLangChainAvailable()).toBe(true);
      delete process.env.GEMINI_API_KEY;
    });
  });

  describe('convertTextToNotation', () => {
    it('should fallback to rule-based converter when LangChain is disabled', async () => {
      const text = 'Hello world!';
      const options = { 
        useLangChain: false,
        style: 'melodic' as const,
        scale: 'major' as const,
        tempo: 120,
        baseOctave: 4
      };

      const notation = await converter.convertTextToNotation(text, options);
      expect(typeof notation).toBe('string');
      expect(notation.length).toBeGreaterThan(0);
      // Should contain instrument and note patterns
      expect(notation).toMatch(/\w+:/);
      expect(notation).toMatch(/;$/);
    });

    it('should handle invalid options gracefully', async () => {
      const text = 'Test';
      const notation = await converter.convertTextToNotation(text, {});
      
      expect(typeof notation).toBe('string');
      expect(notation.length).toBeGreaterThan(0);
    });

    it('should fallback when LangChain throws error', async () => {
      const text = 'Hello world!';
      const options = { 
        useLangChain: true,
        langChainOptions: { apiKey: 'invalid-key' }
      };

      const notation = await converter.convertTextToNotation(text, options);
      expect(typeof notation).toBe('string');
      expect(notation.length).toBeGreaterThan(0);
    });
  });
});