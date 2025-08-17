# Vibe Codesitor - AI Coding Assistant Instructions

## Architecture Overview

This is a **modular TypeScript music editor** with a **custom notation-to-audio pipeline**. Key architectural decisions:

- **Multi-entry Webpack build**: `src/index.ts` (core logic) + `src/ui.ts` (UI management) generate separate bundles
- **Parser → Audio Engine**: Custom text notation gets parsed into structured `MusicData`, then rendered via Web Audio API
- **Separation of concerns**: UI logic extracted from HTML, all styling via Tailwind CSS (no custom CSS)
- **LocalStorage persistence**: User notations saved client-side with versioning support

### Core Components

- **`MusicConverter`** (`src/index.ts`): Main orchestrator, detects notation vs. text input, coordinates parsing/audio
- **`MusicParser`** (`src/parser.ts`): Converts custom notation syntax to structured `MusicData` objects
- **`AudioEngine`** (`src/audio.ts`): Web Audio synthesis with instrument-specific sound design (violin, panduri, timpani, etc.)
- **`MusicAppController`** (`src/ui.ts`): Manages all UI interactions, tabs, examples, saved notations, MIDI export
- **`TextToMusicConverter`** (`src/textToMusic.ts`): AI-like text-to-music generation using character-to-note mapping

## Key Development Patterns

### Custom Notation Syntax
```typescript
// Format: instrument:note1.duration,note2.duration|nextMeasure;
"piano:C4.1+E4.1+G4.1,F4.1+A4.1+C5.1|G4.1+B4.1+D5.1;"
```
- Instruments separated by `;`, measures by `|`, notes by `,`, chords by `+`
- **Always test notation parsing** with `MusicParser.parse()` before audio rendering

### Event Binding Convention
All UI events use **direct DOM manipulation** in `src/ui.ts`:
```typescript
button?.addEventListener('click', () => this.handleButtonAction());
```
- **Never embed JavaScript in HTML** - all logic moved to TypeScript modules
- Global window bindings only for onclick handlers in dynamically generated HTML

### Tailwind-First Styling
```typescript
// All dynamic styling uses Tailwind classes
element.className = 'px-4 py-2 bg-blue-500 text-white hover:bg-blue-600';
```
- **No custom CSS files** - utility-first approach throughout
- Dynamic UI updates manipulate Tailwind classes, not inline styles

## Development Workflow

### Build & Test Commands
```bash
npm run build    # Production webpack build
npm start        # Dev server on port 9000 (or try 8080 if occupied)
npm test         # Jest tests (limited coverage)
npm run preview  # Test production build locally
```

### Deployment
- **Auto-deploy**: Push to `main` branch triggers GitHub Pages deployment via Actions
- **Live site**: https://iosebkoplatadze.github.io/vibe-codesitor/
- **Webpack config**: Different `publicPath` for dev vs production (GitHub Pages compatibility)

### MIDI Export Implementation
Uses `midi-writer-js` library:
```typescript
// Pattern: Convert MusicData → MIDI via instrument/note mapping
const track = new (MidiWriter as any).Track();
// Note: Library uses 'any' casting due to incomplete TypeScript definitions
```

### Audio Engine Debugging
```typescript
// Test individual instruments:
const audioEngine = new AudioEngine();
await audioEngine.play(musicData); // Check browser console for Web Audio errors
```
Common issues: **AudioContext requires user interaction** - audio won't play without click event first.

## Project-Specific Conventions

### Instrument Sound Design
Each instrument has **custom Web Audio synthesis**:
- **`violin`**: Sawtooth + lowpass filter + slow attack envelope
- **`panduri`**: Triangle + bandpass filter + plucked string decay
- **`choir`**: Multiple detuned sine waves for chorus effect
- **`timpani`**: Sine + pitch bend + drum-like envelope

### File Organization Logic
- `src/parser.ts`: **Pure parsing logic** - no UI/audio dependencies
- `src/audio.ts`: **Web Audio synthesis** - no UI dependencies  
- `src/ui.ts`: **UI orchestration** - imports and coordinates other modules
- `index.html`: **Static structure** - all behavior in TypeScript

### LocalStorage Schema
```typescript
interface SavedNotation {
  id: number;           // timestamp-based
  name: string;         // user-defined
  content: string;      // raw notation text
  createdAt: string;    // ISO timestamp
  updatedAt: string;    // ISO timestamp for versioning
}
```

## Integration Points

### Text-to-Music Pipeline
```typescript
// Character mapping to musical notes via scale systems
converter.convertTextToNotation(text, { style: 'melodic', scale: 'major' })
```
- Maps characters to scale positions, considers word boundaries for phrasing
- **Different from standard MIDI** - uses custom notation as intermediate format

### Cross-Component Communication
- **`MusicAppController`** holds references to parser, audio engine, text converter
- **UI state management** via class properties (tab switching, mode toggling)
- **Toast notifications** via centralized `NotationUI.showToast()` method

## Common Debugging Patterns

### Notation Parsing Issues
```typescript
// Always validate before playing:
const musicData = parser.parse(notation);
console.log('Parsed tracks:', musicData.tracks.length);
```

### Audio Playback Problems
- Check **AudioContext state** - might be suspended until user interaction
- **Instrument mapping** - verify instrument name exists in `AudioEngine.setupInstruments()`
- **Note format validation** - ensure `pitch.octave.duration` format

### UI State Synchronization
- **Tab switching** updates both visual classes and content visibility
- **Mode switching** (notation vs. text) shows/hides relevant UI elements
- **Example loading** populates textarea and switches to appropriate mode

When modifying this codebase, **always test the full pipeline**: notation input → parsing → audio output → UI feedback.
