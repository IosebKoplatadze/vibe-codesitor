# 🎵 Vibe Codesitor

A modern web-based music notation converter that transforms custom text-based musical notation into playable audio. Built with TypeScript, Web Audio API, and featuring both traditional notation and AI-powered text-to-music conversion.

![Vibe Codesitor Interface](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Web Audio](https://img.shields.io/badge/Web%20Audio-FF6B6B?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- **🎼 Custom Notation System**: Simple text-based notation for complex musical compositions
- **🎹 Multiple Instruments**: Piano, violin, bass, panduri, choir, timpani, drums, and more
- **🤖 Text-to-Music AI**: Convert plain text into musical notation using character mapping algorithms
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

4. Open your browser and navigate to `http://localhost:9000` (or `http://localhost:8080` if 9000 is occupied)

### Building for Production
```bash
npm run build
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

## 🤖 Text-to-Music Conversion

Convert any text into musical notation using our AI-powered text-to-music engine:

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

## 🏗️ Architecture

### Core Components
- **`MusicConverter`** (`src/index.ts`): Main orchestrator
- **`MusicParser`** (`src/parser.ts`): Notation parsing engine
- **`AudioEngine`** (`src/audio.ts`): Web Audio synthesis
- **`MusicAppController`** (`src/ui.ts`): UI management
- **`TextToMusicConverter`** (`src/textToMusic.ts`): AI text conversion

### Technology Stack
- **TypeScript**: Type-safe JavaScript development
- **Webpack**: Multi-entry bundling (`index.js` + `ui.js`)
- **Web Audio API**: Real-time audio synthesis
- **Tailwind CSS**: Utility-first styling
- **midi-writer-js**: MIDI file generation

## 🎯 Development

### Project Structure
```
vibe-codesitor/
├── src/
│   ├── index.ts        # Main MusicConverter class
│   ├── parser.ts       # Notation parser
│   ├── audio.ts        # Audio engine and instruments
│   ├── ui.ts          # UI controller and event handling
│   └── textToMusic.ts  # Text-to-music conversion
├── index.html          # Main interface
├── webpack.config.js   # Build configuration
├── package.json        # Dependencies and scripts
└── README.md          # This file
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
4. Update MIDI export mapping in `ui.ts`

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
