# Vibe Codesitor - AI Coding Assistant Instructions

## Architecture Overview

This is a **React-based TypeScript music editor** with a **custom notation-to-audio pipeline**. Key architectural decisions:

- **React Frontend**: Modern component-based UI built with React, TypeScript, and Tailwind CSS
- **Parser → Audio Engine**: Custom text notation gets parsed into structured `MusicData`, then rendered via Web Audio API  
- **Component Architecture**: All UI logic in React components with hooks for state management
- **LocalStorage persistence**: User notations saved client-side with versioning support

### Core Components

- **`MusicConverter`** (`src/index.ts`): Main orchestrator, detects notation vs. text input, coordinates parsing/audio
- **`MusicParser`** (`src/parser.ts`): Converts custom notation syntax to structured `MusicData` objects
- **`AudioEngine`** (`src/audio.ts`): Web Audio synthesis with instrument-specific sound design (violin, panduri, timpani, etc.)
- **`LangChainTextToMusicConverter`** (`src/langchainTextToMusic.ts`): AI-powered text-to-music using LangChain + OpenAI/Gemini/Claude
- **`TextToMusicConverter`** (`src/textToMusic.ts`): Rule-based text-to-music generation using character-to-note mapping

### React Components

- **`MusicEditorApp.tsx`**: Main app component, manages global state, coordinates all interactions
- **`EditorSection.tsx`**: Text editor, mode switching, control buttons (play/stop/convert/download)
- **`Sidebar.tsx`**: Examples, saved notations, syntax guide with mobile-responsive collapsible design  
- **`TextSettings.tsx`**: AI provider selection, API key management, text-to-music options
- **`Header.tsx`**: App title, tempo control, sidebar toggle for mobile

## Key Development Patterns

### Custom Notation Syntax
```typescript
// Format: instrument:note1.duration,note2.duration|nextMeasure;
"piano:C4.1+E4.1+G4.1,F4.1+A4.1+C5.1|G4.1+B4.1+D5.1;"
```
- Instruments separated by `;`, measures by `|`, notes by `,`, chords by `+`
- **Always test notation parsing** with `MusicParser.parse()` before audio rendering

### Event Binding Convention
All UI events use **React event handlers** in components:
```tsx
// React functional component with event handlers
<button onClick={() => handleButtonAction()}>Click Me</button>
```
- **Never embed JavaScript in HTML** - all logic in React components
- State management via React hooks (`useState`, `useCallback`, `useRef`)
- Props passed down from parent components for communication

### Tailwind-First Styling
```tsx
// All styling uses Tailwind classes in JSX
<div className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600">
  Button Content
</div>
```
- **No custom CSS files** - utility-first approach throughout
- Conditional classes using template literals and state
- Mobile-responsive design with Tailwind breakpoints (`sm:`, `lg:`)

## Development Workflow

### Build & Test Commands
```bash
npm run build    # Production webpack build
npm start        # Dev server on port 8080 (React app)
npm test         # Jest tests (limited coverage)
npm run preview  # Test production build locally
```

### Deployment
- **Auto-deploy**: Push to `main` branch triggers GitHub Pages deployment via Actions
- **Live site**: https://iosebkoplatadze.github.io/vibe-codesitor/
- **Webpack config**: Different `publicPath` for dev vs production (GitHub Pages compatibility)

### MIDI Export Implementation
Uses `midi-writer-js` library in React components:
```tsx
// Pattern: Convert MusicData → MIDI via instrument/note mapping
const MidiWriter = await import('midi-writer-js');
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
### File Organization Logic
- `src/components/`: **React components** - all UI logic with hooks and state management
- `src/parser.ts`: **Pure parsing logic** - no UI/audio dependencies
- `src/audio.ts`: **Web Audio synthesis** - no UI dependencies  
- `src/index.ts`: **Core orchestration** - imports and coordinates other modules
- `index.html`: **React mount point** - all behavior in React components

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
- **`MusicConverter`** holds references to parser, audio engine, text converter
- **React state management** via hooks (`useState`, `useRef`, `useCallback`)
- **Props drilling** for parent-child component communication

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

### React State Synchronization
- **Mode switching** (notation vs. text) updates component state via `setIsTextMode()`
- **Example loading** populates textarea via `setNotation()` and switches modes
- **Toast notifications** managed via `useState` array and timeout cleanup

When modifying this codebase, **always test the full pipeline**: notation input → parsing → audio output → UI feedback.
