# Environment Variables Example

This project uses environment variables to configure the OpenAI integration for AI-powered text-to-music conversion.

## Setup Instructions

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file:**
   ```bash
   # Required: Your OpenAI API key
   OPENAI_API_KEY=sk-your-actual-openai-api-key-here

   # Optional: Specify the model (defaults to gpt-3.5-turbo)
   OPENAI_MODEL=gpt-3.5-turbo

   # Optional: Set creativity level 0-2 (defaults to 0.7)
   OPENAI_TEMPERATURE=0.7
   ```

3. **Get your API key:**
   - Visit [OpenAI Platform](https://platform.openai.com/account/api-keys)
   - Create a new API key
   - Copy it to your `.env` file

## How it Works

The application checks for the OpenAI API key in the following order:

1. **Environment Variable**: `process.env.OPENAI_API_KEY`
2. **Window Global**: `window.OPENAI_API_KEY` (for browser environments)
3. **Direct Option**: Passed via `langChainOptions.apiKey`

If no API key is found, the AI text-to-music feature will show an error message asking you to configure it.

## Development vs Production

- **Development**: Environment variables are loaded via `dotenv-webpack` from your `.env` file
- **Production**: Set environment variables in your deployment platform (Vercel, Netlify, etc.)
- **GitHub Pages**: Since GitHub Pages only serves static files, users enter their API key directly in the browser UI (stored in localStorage)

## Security Note

⚠️ **Never commit your `.env` file to version control!** 

The `.env` file is already included in `.gitignore` to prevent accidental commits of your API keys.
