# API Keys Configuration

This React-based music editor uses AI APIs for text-to-music conversion. API keys are managed entirely through the browser interface - no environment variables needed.

## Setup Instructions

1. **Open the app** in your browser
2. **Switch to Text Mode** by clicking the "Text Mode" button
3. **Open AI Settings** by toggling the AI settings panel
4. **Select Provider**: Choose OpenAI, Google Gemini, or Anthropic Claude
5. **Enter API Key**: Input your API key in the appropriate field
6. **Start Creating**: The key is stored securely in browser localStorage

## Supported AI Providers

### OpenAI
- **Models**: GPT-3.5 Turbo, GPT-4, GPT-4 Turbo
- **API Key**: Get from [OpenAI Platform](https://platform.openai.com/account/api-keys)
- **Features**: High-quality music generation, fast processing

### Google Gemini
- **Models**: Gemini-1.0-Pro, Gemini-1.5-Pro  
- **API Key**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Features**: Creative music generation, good for experimental styles

### Anthropic Claude
- **Models**: Claude-3 Haiku, Claude-3 Sonnet, Claude-3 Opus
- **API Key**: Get from [Anthropic Console](https://console.anthropic.com/)
- **Features**: Thoughtful composition, excellent for complex arrangements

## How It Works

The React app checks for API keys in the following order:

1. **Browser localStorage**: Keys entered via the UI settings panel
2. **Component props**: Passed down from parent components
3. **Runtime options**: Direct API key passing to conversion functions

If no API key is configured, the AI text-to-music feature will show a user-friendly message with setup instructions.

## Development vs Production

- **Development**: API keys entered via browser UI (stored in localStorage)
- **Production**: Same as development - all client-side configuration
- **GitHub Pages**: Works seamlessly since all configuration is browser-based

## Security & Privacy

✅ **Client-Side Storage**: API keys stored only in your browser's localStorage  
✅ **No Server**: Keys never sent to our servers - only directly to AI providers  
✅ **Local Control**: You can clear keys anytime via browser developer tools  
✅ **No Tracking**: We don't collect or store your API keys or usage data

## Fallback System

If AI generation fails or no API key is provided:
- **Automatic fallback** to rule-based text-to-music conversion
- **Character mapping** algorithm converts any text to music notation
- **No API key required** for basic text-to-music functionality

This ensures the app always works, even without AI API access.
