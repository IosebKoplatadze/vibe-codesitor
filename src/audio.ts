import { MusicData, Track, Chord, Note } from './parser';

export class AudioEngine {
  private audioContext: AudioContext | null = null;
  private instruments: Map<string, AudioInstrument> = new Map();
  
  constructor() {
    // Create audio context on first user interaction
  }
  
  private initAudioContext(): void {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
      this.setupInstruments();
    }
  }
  
  private setupInstruments(): void {
    if (!this.audioContext) return;
    
    // Create basic instrument types
    this.instruments.set('piano', new SynthInstrument(this.audioContext, 'piano'));
    this.instruments.set('bass', new SynthInstrument(this.audioContext, 'bass'));
    this.instruments.set('violin', new SynthInstrument(this.audioContext, 'violin'));
    this.instruments.set('panduri', new SynthInstrument(this.audioContext, 'panduri'));
    this.instruments.set('choir', new SynthInstrument(this.audioContext, 'choir'));
    this.instruments.set('timpani', new SynthInstrument(this.audioContext, 'timpani'));
    this.instruments.set('drums', new DrumKit(this.audioContext));
  }
  
  public async play(musicData: MusicData): Promise<void> {
    this.initAudioContext();
    if (!this.audioContext) return;
    
    const startTime = this.audioContext.currentTime + 0.1;
    const secondsPerBeat = 60 / musicData.tempo;
    
    for (const track of musicData.tracks) {
      const instrument = this.instruments.get(track.instrument.toLowerCase());
      if (!instrument) continue;
      
      let currentTime = startTime;
      
      for (const pattern of track.patterns) {
        for (const chord of pattern) {
          await instrument.playChord(chord, currentTime);
          currentTime += chord.duration * secondsPerBeat;
        }
      }
    }
  }

  public stop(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

interface AudioInstrument {
  playChord(chord: Chord, time: number): Promise<void>;
}

class SynthInstrument implements AudioInstrument {
  private context: AudioContext;
  private type: string;
  
  constructor(context: AudioContext, type: string) {
    this.context = context;
    this.type = type;
  }
  
  async playChord(chord: Chord, time: number): Promise<void> {
    const secondsPerBeat = 60 / 120; // Default tempo
    
    for (const note of chord.notes) {
      switch (this.type.toLowerCase()) {
        case 'violin':
          this.playViolinNote(note, time, secondsPerBeat);
          break;
        case 'panduri':
          this.playPanduriNote(note, time, secondsPerBeat);
          break;
        case 'choir':
          this.playChoirNote(note, time, secondsPerBeat);
          break;
        case 'timpani':
          this.playTimpaniNote(note, time, secondsPerBeat);
          break;
        case 'piano':
        case 'bass':
        default:
          this.playBasicNote(note, time, secondsPerBeat);
          break;
      }
    }
  }
  
  private playBasicNote(note: Note, time: number, secondsPerBeat: number): void {
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    
    // Set oscillator type based on instrument
    oscillator.type = this.type === 'piano' ? 'triangle' : 'sine';
    
    // Calculate frequency from note information
    const frequency = this.noteToFrequency(note);
    oscillator.frequency.value = frequency;
    
    // Configure envelope
    gainNode.gain.value = note.velocity;
    gainNode.gain.setValueAtTime(note.velocity, time);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + note.duration * secondsPerBeat);
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    // Play the note
    oscillator.start(time);
    oscillator.stop(time + note.duration * secondsPerBeat + 0.1);
  }
  
  private playViolinNote(note: Note, time: number, secondsPerBeat: number): void {
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    // Violin-like sound: sawtooth wave with filter
    oscillator.type = 'sawtooth';
    const frequency = this.noteToFrequency(note);
    oscillator.frequency.value = frequency;
    
    // Low-pass filter for warmth
    filter.type = 'lowpass';
    filter.frequency.value = frequency * 4;
    filter.Q.value = 1;
    
    // Violin-like envelope with slow attack
    const duration = note.duration * secondsPerBeat;
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(note.velocity * 0.7, time + Math.min(0.1, duration * 0.3));
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    
    // Connect nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    // Play the note
    oscillator.start(time);
    oscillator.stop(time + duration + 0.1);
  }
  
  private playPanduriNote(note: Note, time: number, secondsPerBeat: number): void {
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    
    // Plucked string sound: triangle wave with quick decay
    oscillator.type = 'triangle';
    const frequency = this.noteToFrequency(note);
    oscillator.frequency.value = frequency;
    
    // Sharp attack, quick decay like a plucked string
    const duration = note.duration * secondsPerBeat;
    gainNode.gain.setValueAtTime(note.velocity, time);
    gainNode.gain.exponentialRampToValueAtTime(note.velocity * 0.3, time + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    // Play the note
    oscillator.start(time);
    oscillator.stop(time + duration + 0.1);
  }
  
  private playChoirNote(note: Note, time: number, secondsPerBeat: number): void {
    const frequency = this.noteToFrequency(note);
    const duration = note.duration * secondsPerBeat;
    
    // Create multiple oscillators for choir effect
    for (let i = 0; i < 3; i++) {
      const oscillator = this.context.createOscillator();
      const gainNode = this.context.createGain();
      const filter = this.context.createBiquadFilter();
      
      // Sine waves with slight detuning for chorus effect
      oscillator.type = 'sine';
      const detune = (i - 1) * 5; // Slight detuning
      oscillator.frequency.value = frequency;
      oscillator.detune.value = detune;
      
      // Formant-like filtering for voice characteristics
      filter.type = 'bandpass';
      filter.frequency.value = frequency * (2 + i * 0.5);
      filter.Q.value = 2;
      
      // Soft attack and sustain
      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(note.velocity * 0.3, time + 0.2);
      gainNode.gain.linearRampToValueAtTime(note.velocity * 0.25, time + duration * 0.8);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);
      
      // Connect nodes
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.context.destination);
      
      // Play the note
      oscillator.start(time);
      oscillator.stop(time + duration + 0.1);
    }
  }
  
  private playTimpaniNote(note: Note, time: number, secondsPerBeat: number): void {
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    // Timpani sound: sine wave with pitch bend
    oscillator.type = 'sine';
    const frequency = this.noteToFrequency(note);
    const duration = note.duration * secondsPerBeat;
    
    // Pitch bend effect (slight downward sweep)
    oscillator.frequency.setValueAtTime(frequency * 1.1, time);
    oscillator.frequency.exponentialRampToValueAtTime(frequency, time + 0.1);
    
    // Low-pass filter for drum-like sound
    filter.type = 'lowpass';
    filter.frequency.value = frequency * 2;
    filter.Q.value = 0.5;
    
    // Timpani envelope: sharp attack, long sustain, gradual decay
    gainNode.gain.setValueAtTime(note.velocity, time);
    gainNode.gain.exponentialRampToValueAtTime(note.velocity * 0.6, time + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    
    // Connect nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    // Play the note
    oscillator.start(time);
    oscillator.stop(time + duration + 0.1);
  }
  
  private noteToFrequency(note: Note): number {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const noteIndex = noteNames.indexOf(note.pitch.toUpperCase());
    
    if (noteIndex === -1) return 440; // Default to A4
    
    // A4 is 440Hz, which is note A in octave 4
    const a4 = 440;
    const a4NoteIndex = noteNames.indexOf('A');
    const a4Octave = 4;
    
    // Calculate semitone difference from A4
    const semitones = (note.octave - a4Octave) * 12 + noteIndex - a4NoteIndex;
    
    // Calculate frequency using equal temperament formula
    return a4 * Math.pow(2, semitones / 12);
  }
}

class DrumKit implements AudioInstrument {
  private context: AudioContext;
  
  constructor(context: AudioContext) {
    this.context = context;
  }
  
  async playChord(chord: Chord, time: number): Promise<void> {
    for (const note of chord.notes) {
      switch(note.pitch.toLowerCase()) {
        case 'k': // Kick drum
          this.playKick(time, note.duration);
          break;
        case 's': // Snare
          this.playSnare(time, note.duration);
          break;
        case 'h': // Hi-hat
          this.playHihat(time, note.duration);
          break;
        case 'd': // Frame drum/doli
          this.playFrameDrum(time, note.duration);
          break;
      }
    }
  }
  
  private playKick(time: number, duration: number): void {
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 150;
    oscillator.frequency.exponentialRampToValueAtTime(0.01, time + 0.1);
    
    gainNode.gain.value = 1;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator.start(time);
    oscillator.stop(time + 0.1);
  }
  
  private playSnare(time: number, duration: number): void {
    // White noise for snare sound
    const bufferSize = this.context.sampleRate * 0.1;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.8;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
    
    noise.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 0.1);
  }
  
  private playHihat(time: number, duration: number): void {
    // White noise with high-pass filter for hi-hat
    const bufferSize = this.context.sampleRate * 0.05;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.4;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.02);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 0.05);
  }
  
  private playFrameDrum(time: number, duration: number): void {
    // Frame drum: combination of sine wave and filtered noise
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 200;
    oscillator.frequency.exponentialRampToValueAtTime(80, time + 0.1);
    
    // Band-pass filter for frame drum character
    filter.type = 'bandpass';
    filter.frequency.value = 300;
    filter.Q.value = 2;
    
    gainNode.gain.value = 0.8;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.15);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator.start(time);
    oscillator.stop(time + 0.15);
  }
}