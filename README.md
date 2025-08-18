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
- **🎹 Comprehensive Instrument Library**: 76+ instruments including full orchestra, world instruments, synthesizers, and extensive percussion
- **🥁 Advanced Percussion**: 50+ drum sounds from basic kit to ethnic percussion, orchestral, and electronic effects
- **🎭 Sophisticated Synthesis**: Each instrument features realistic ADSR envelopes, frequency-dependent filtering, and authentic timbres
- **🌍 World Music Support**: Instruments from Georgian (panduri), Indian (sitar, tabla), Middle Eastern (oud, duduk), African (djembe, kalimba), and more
- **🤖 AI-Powered Text-to-Music**: Convert plain text into sophisticated musical notation using LangChain with OpenAI/Gemini
- **🎯 Rule-Based Text Conversion**: Built-in character mapping algorithms for deterministic text-to-music conversion
- **💾 Local Storage**: Save and manage your musical compositions locally with versioning
- **📱 Responsive UI**: Modern sidebar-based interface with tabbed navigation and mobile optimization
- **🎵 Real-time Playback**: Instant audio feedback using advanced Web Audio API synthesis
- **📁 MIDI Export**: Download your compositions as standard MIDI files
- **🎨 Beautiful Examples**: Rich library of examples from classical to electronic to world fusion
- **🔄 Multiple Synthesis Modes**: From acoustic simulation to analog synthesizer to FM synthesis
- **🎚️ Dynamic Expression**: Support for velocity, duration, and articulation control

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

### Example - Epic Orchestral Composition
```
// String section with rich harmonies
violin:G5.2+B5.2+D6.2|A5.2+C6.2+E6.2|B5.2+D6.2+F#6.2|G5.4+B5.4+D6.4;
viola:D5.2+G5.2+B5.2|E5.2+A5.2+C6.2|F#5.2+B5.2+D6.2|D5.4+G5.4+B5.4;
cello:G3.2+D4.2|A3.2+E4.2|B3.2+F#4.2|G3.4+D4.4;
double_bass:G2.4|A2.4|B2.4|G2.4;

// Brass fanfare
trumpet:D6.1,E6.1,F#6.1,G6.1|A6.2,G6.1,F#6.1|E6.2,D6.2|G6.4;
french_horn:G4.2+B4.2+D5.2|A4.2+C5.2+E5.2|B4.2+D5.2+F#5.2|G4.4+B4.4+D5.4;
trombone:G3.4|A3.4|B3.4|G3.4;

// Woodwind flourishes
flute:D6.0.5,E6.0.5,F#6.0.5,G6.0.5|A6.1,G6.0.5,F#6.0.5|E6.1,D6.1|G6.4;
clarinet:B4.2+D5.2+G5.2|C5.2+E5.2+A5.2|D5.2+F#5.2+B5.2|B4.4+D5.4+G5.4;

// Dramatic percussion
timpani:G2.4|A2.4|B2.4|G2.4;
drums:k.1,s.0.5,h.0.5|c.2,r.1,r.1|k.0.5,s.0.5,t.0.5,f.0.5,c.2;
```

### Syntax Rules
- **Instruments**: Separated by semicolons (`;`)
- **Measures**: Separated by pipes (`|`)  
- **Notes**: Separated by commas (`,`)
- **Chords**: Notes joined with plus (`+`)
- **Note Format**: `PitchOctave.Duration` (e.g., `C4.1`, `F#3.0.5`)
- **Rests**: Empty positions or commas without notes

## 🎼 Supported Instruments (76 Total)

### Keyboard Instruments (5)

`piano` • `electric_piano` • `harpsichord` • `organ` • `accordion`

### String Instruments (14)

`violin` • `viola` • `cello` • `double_bass` • `bass` • `guitar` • `electric_guitar` • `acoustic_guitar` • `banjo` • `mandolin` • `harp` • `sitar` • `oud` • `panduri`

### Brass Instruments (7)

`trumpet` • `cornet` • `trombone` • `french_horn` • `tuba` • `euphonium` • `brass`

### Woodwind Instruments (13)

`flute` • `piccolo` • `recorder` • `clarinet` • `bass_clarinet` • `saxophone` • `alto_sax` • `tenor_sax` • `baritone_sax` • `oboe` • `english_horn` • `bassoon` • `duduk`

### Voice (5)

`choir` • `soprano` • `alto` • `tenor` • `bass_voice`

### Mallet Percussion (6)

`xylophone` • `marimba` • `vibraphone` • `glockenspiel` • `bells` • `celesta`

### Orchestral Percussion (10)

`timpani` • `drums` • `triangle` • `tambourine` • `castanets` • `wood_block` • `temple_block` • `gong` • `tam_tam` • `cymbal`

### Electronic/Synthesizer (10)

`synth` • `lead` • `pad` • `arp` • `pluck` • `strings` • `warm_pad` • `bright_pad` • `polysynth` • `fm_synth`

### Exotic/Unique Instruments (6)

`theremin` • `glass_harmonica` • `musical_saw` • `kalimba` • `steel_drum` • `hang_drum`

### Percussion Kit

The drums instrument supports comprehensive percussion sounds:

#### Basic Kit

- `k` or `kick` - Bass drum
- `s` or `snare` - Snare drum
- `h` or `hihat` - Closed hi-hat
- `o` or `open_hihat` - Open hi-hat
- `c` or `crash` - Crash cymbal
- `r` or `ride` - Ride cymbal
- `t` or `tom` - Tom drum
- `f` or `floor_tom` - Floor tom

#### Extended Kit

- `sp` or `splash` - Splash cymbal
- `ch` or `china` - China cymbal
- `rb` or `ride_bell` - Ride bell
- `cb` or `cowbell` - Cowbell
- `wb` or `wood_block` - Wood block
- `cl` or `clap` - Hand clap

#### Shakers & Hand Percussion

- `tam` or `tambourine` - Tambourine
- `sha` or `shaker` - Shaker
- `ca` or `cabasa` - Cabasa
- `ma` or `maracas` - Maracas

#### Ethnic Percussion

- `d` or `frame_drum` - Traditional frame drum
- `ta` or `tabla` - Indian tabla
- `bongo` - Bongo drums
- `conga` - Conga drums
- `djembe` - West African djembe
- `cai` or `cajon` - Box drum
- `ti` or `timbale` - Latin timbales
- `uk` or `udu` - Nigerian clay pot drum

#### Orchestral Percussion

- `tim` or `timpani` - Orchestral timpani
- `gong` - Large gong
- `tri` or `triangle` - Triangle
- `sus` or `suspended_cymbal` - Suspended cymbal
- `vib` or `vibraslap` - Vibraslap

#### Special Effects

- `ws` or `wind_chimes` - Wind chimes
- `ra` or `ratchet` - Ratchet
- `wh` or `whip` - Whip crack
- `808` or `kick_808` - Electronic 808 kick
- `elec` or `electronic_snare` - Electronic snare
- `rev` or `reverse_cymbal` - Reverse cymbal swell
- `gat` or `gated_snare` - Gated reverb snare

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
