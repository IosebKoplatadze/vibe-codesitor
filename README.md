# 🎵 Vibe Codesitor

A modern web-based music notation converter that transforms custom text-based musical notation into playable audio. Built with React, TypeScript, Web Audio API, and featuring both traditional notation and AI-powered text-to-music conversion.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Web Audio](https://img.shields.io/badge/Web%20Audio-FF6B6B?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌐 Live Demo

**Try it now:** [https://iosebkoplatadze.github.io/vibe-codesitor/](https://iosebkoplatadze.github.io/vibe-codesitor/)

No installation required - just open the link and start creating music!

## ✨ Features

- **🎼 Custom Notation System**: Simple text-based notation for complex musical compositions
- **🎹 Multiple Instruments**: Piano, violin, bass, panduri, choir, timpani, drums, and more
- **🤖 AI-Powered Text-to-Music**: Convert plain text into sophisticated musical notation using LangChain and OpenAI
- **🎯 Rule-Based Text Conversion**: Built-in character mapping algorithms for deterministic text-to-music conversion
- **💾 Local Storage**: Save and manage your musical compositions locally
- **📱 Responsive UI**: Modern sidebar-based interface with tabbed navigation
- **🎵 Real-time Playback**: Instant audio feedback using Web Audio API
- **📁 MIDI Export**: Download your compositions as standard MIDI files
- **🎨 Beautiful UI**: Tailwind CSS-powered interface with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Modern web browser with Web Audio API support

### Installation

1. Clone the repository:
```bash
git clone https://github.com/IosebKoplatadze/vibe-codesitor.git
cd vibe-codesitor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. **For AI-powered features** (optional):
   
   Enter your API key directly in the app's settings panel:
   - Switch to "Text Mode" 
   - Click the AI settings toggle
   - Enter your OpenAI, Gemini, or Claude API key
   - The key is stored locally in your browser
   
   **API Key Sources:**
   - OpenAI: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
   - Google Gemini: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Anthropic Claude: [https://console.anthropic.com/](https://console.anthropic.com/)

5. Open your browser and navigate to `http://localhost:8080`


### Building for Production
```bash
npm run build
```

### Deploying to GitHub Pages

This project is set up for automatic deployment to GitHub Pages via GitHub Actions. The deployment happens automatically when you push to the `main` branch.

**Manual deployment steps:**
1. Ensure your repository is public or has GitHub Pages enabled
2. Push your changes to the `main` branch
3. GitHub Actions will automatically build and deploy the site
4. Your site will be available at `https://yourusername.github.io/vibe-codesitor/`

**Local testing of production build:**
```bash
npm run preview
```

## 🎵 Notation Syntax

### Basic Format
```
instrument:note1.duration,note2.duration|nextMeasure;
nextInstrument:note1.duration;
```

### Example - Simple Chord Progression
```
piano:C4.1+E4.1+G4.1,F4.1+A4.1+C5.1|G4.1+B4.1+D5.1,C4.2+E4.2+G4.2;
```

### Example - Multi-Instrument Rock Song
```
piano:C4.0.5+E4.0.5+G4.0.5,C4.0.5+F4.0.5+A4.0.5|D4.0.5+F4.0.5+B4.0.5,C4.0.5+E4.0.5+G4.0.5;
bass:C2.1|G2.1|F2.1|C2.1;
drums:k.0.5,s.0.5,k.0.5,s.0.5|k.0.5,s.0.5,k.0.5,s.0.5;
```

### Syntax Rules
- **Instruments**: Separated by semicolons (`;`)
- **Measures**: Separated by pipes (`|`)  
- **Notes**: Separated by commas (`,`)
- **Chords**: Notes joined with plus (`+`)
- **Note Format**: `PitchOctave.Duration` (e.g., `C4.1`, `F#3.0.5`)
- **Rests**: Empty positions or commas without notes

## 🎼 Supported Instruments

### Melodic Instruments
- **piano**: Standard piano with triangle wave
- **violin**: Sawtooth wave with lowpass filter and slow attack
- **bass**: Deep bass tones for basslines
- **panduri**: Georgian traditional plucked string instrument
- **choir**: Multiple detuned sine waves for chorus effect
- **timpani**: Sine wave with pitch bend for orchestral kettle drums

### Percussion
- **drums**: Multi-sound percussion kit
  - `k` - Kick drum
  - `s` - Snare drum  
  - `h` - Hi-hat
  - `d` - Frame drum (doli)

## 🤖 AI-Powered Text-to-Music Conversion

Transform any text into beautiful musical notation using advanced AI technology:

### Getting Started with AI Music Generation

1. **Switch to Text Mode**: Click the "Text Mode" button in the app
2. **Enable AI Generation**: Toggle the AI settings panel
3. **Select Provider**: Choose OpenAI, Gemini, or Claude
4. **Add API Key**: Enter your API key (stored locally in browser)
5. **Configure Settings**: Choose mood, complexity, and musical style
6. **Enter Text**: Write any text prompt describing the music you want
7. **Generate**: Click "Convert Text to Music" to create AI-powered notation

### AI Settings

- **API Key**: Your OpenAI/Gemini/Claude API key (stored securely in browser localStorage)
- **Provider**: Choose between OpenAI, Google Gemini, or Anthropic Claude
- **AI Model**: Select from available models (GPT-3.5, GPT-4, Gemini-Pro, Claude-3, etc.)
- **Mood**: Balanced, Happy, Sad, Energetic, Peaceful, Dramatic, Romantic, Mysterious
- **Complexity**: Simple, Moderate, or Complex musical arrangements
- **Style**: Melodic, Rhythmic, Harmonic, or Ambient
- **Scale**: Major, Minor, Pentatonic, or Chromatic

### AI-Optimized Example Prompts

- *"Create a triumphant melody that builds to an epic crescendo, like a hero's journey"*
- *"Compose a gentle lullaby that flows like a peaceful river under moonlight"*
- *"Write an energetic jazz piece with syncopated rhythms that makes you want to dance"*
- *"Imagine the sound of rain falling on leaves while birds sing in a mystical forest"*

### Fallback System

If AI generation fails or is unavailable, the system automatically falls back to the built-in rule-based text-to-music converter, ensuring your text is always converted to music.

## 🎯 Rule-Based Text-to-Music Conversion

For users who prefer deterministic conversion or don't have an AI API key:

1. Switch to "Text Mode"
2. Enter any text (e.g., "Hello world! This creates beautiful music.")
3. Configure style (melodic, rhythmic, harmonic, ambient)
4. Choose scale (major, minor, pentatonic, chromatic)
5. Click "Convert Text to Music"

The system maps characters to musical notes based on:
- **Character ASCII values** → Scale positions
- **Word boundaries** → Musical phrases
- **Punctuation** → Rhythm variations
- **Text length** → Composition structure

This method provides consistent, predictable results without requiring API keys.

## 🏗️ Architecture

### Core Components

- **`MusicConverter`** (`src/index.ts`): Main orchestrator with AI/rule-based routing
- **`LangChainTextToMusicConverter`** (`src/langchainTextToMusic.ts`): AI-powered text conversion
- **`TextToMusicConverter`** (`src/textToMusic.ts`): Rule-based text conversion
- **`MusicParser`** (`src/parser.ts`): Notation parsing engine
- **`AudioEngine`** (`src/audio.ts`): Web Audio synthesis
- **React Components** (`src/components/`): Modern UI built with React and TypeScript

### Technology Stack

- **React**: Modern UI framework with hooks and functional components
- **TypeScript**: Type-safe JavaScript development
- **LangChain + AI APIs**: OpenAI, Gemini, and Claude for AI-powered text-to-music generation
- **Webpack**: Multi-entry bundling with React support
- **Web Audio API**: Real-time audio synthesis
- **Tailwind CSS**: Utility-first styling
- **midi-writer-js**: MIDI file generation

## 🎯 Development

### Project Structure

```
vibe-codesitor/
├── src/
│   ├── components/          # React components
│   │   ├── MusicEditorApp.tsx    # Main app component
│   │   ├── EditorSection.tsx     # Editor UI
│   │   ├── Sidebar.tsx           # Sidebar with examples
│   │   ├── Header.tsx            # App header
│   │   └── TextSettings.tsx      # AI settings panel
│   ├── index.ts            # Core music logic
│   ├── parser.ts           # Notation parser
│   ├── audio.ts            # Audio engine
│   ├── langchainTextToMusic.ts   # AI text-to-music
│   └── textToMusic.ts      # Rule-based text-to-music
├── index.html              # React app mount point
├── webpack.config.js       # Build configuration
└── package.json           # Dependencies and scripts
```

### Development Commands

```bash
npm start       # Start development server
npm run build   # Production build
npm test        # Run tests
```

### Adding New Instruments

1. Add instrument mapping in `AudioEngine.setupInstruments()`
2. Create synthesis method in `SynthInstrument` class
3. Configure oscillator type, filters, and envelope
4. Update MIDI export mapping in React components

## 🎵 Examples

### Georgian Folk Music
```
violin:D5.0.5,E5.0.5|F5.1.5,E5.0.5,D5.1,A4.1|C5.1.5,D5.0.5,C5.1,A4.1;
panduri:D4.0.25,A4.0.25,D5.0.25,A4.0.25|D4.0.25,A4.0.25,D5.0.25,A4.0.25;
bass:D3.4|D3.4;
drums:d.1,d.0.5,d.0.5|d.1,d.0.5,d.0.5;
```

### Jazz Chord Progression
```
piano:C4.1+E4.1+G4.1+B4.1|F4.1+A4.1+C5.1+E5.1|G4.1+B4.1+D5.1+F5.1|C4.2+E4.2+G4.2;
bass:C2.1|F2.1|G2.1|C2.1;
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with descriptive messages
5. Push to your fork and submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling (no custom CSS)
- Test the full pipeline: notation → parsing → audio → UI
- Update documentation for new features

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Georgian folk music inspiration for traditional instruments
- Web Audio API community for synthesis techniques
- Open source music notation projects for reference

## 🐛 Issues & Support

Found a bug or have a feature request? Please open an issue on GitHub with:
- Browser and OS information
- Steps to reproduce
- Expected vs actual behavior
- Sample notation (if applicable)

---

**Made with ❤️ for music lovers and developers**
