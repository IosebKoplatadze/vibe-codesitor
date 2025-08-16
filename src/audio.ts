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
    this.instruments.set('drums', new DrumKit(this.audioContext));
    
    // Add synthesizer instruments for rock/electronic sounds
    this.instruments.set('synth', new SynthInstrument(this.audioContext, 'synth'));
    this.instruments.set('lead', new SynthInstrument(this.audioContext, 'lead'));
    this.instruments.set('brass', new SynthInstrument(this.audioContext, 'brass'));
    this.instruments.set('strings', new SynthInstrument(this.audioContext, 'strings'));
    
    // Add support for existing instruments
    this.instruments.set('violin', new SynthInstrument(this.audioContext, 'violin'));
    this.instruments.set('panduri', new SynthInstrument(this.audioContext, 'panduri'));
    this.instruments.set('choir', new SynthInstrument(this.audioContext, 'choir'));
    this.instruments.set('timpani', new SynthInstrument(this.audioContext, 'timpani'));
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
      const oscillator = this.context.createOscillator();
      const gainNode = this.context.createGain();
      const filterNode = this.context.createBiquadFilter();
      
      // Set oscillator type and filter based on instrument
      this.configureInstrument(oscillator, filterNode, gainNode, note, time);
      
      // Calculate frequency from note information
      const frequency = this.noteToFrequency(note);
      oscillator.frequency.value = frequency;
      
      // Configure envelope based on instrument type
      this.configureEnvelope(gainNode, note, time, secondsPerBeat);
      
      // Connect nodes with optional filter
      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(this.context.destination);
      
      // Play the note
      oscillator.start(time);
      oscillator.stop(time + note.duration * secondsPerBeat + 0.1);
    }
  }
  
  private configureInstrument(oscillator: OscillatorNode, filter: BiquadFilterNode, gain: GainNode, note: Note, time: number): void {
    switch(this.type) {
      case 'piano':
        oscillator.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.value = 2000;
        break;
        
      case 'bass':
        oscillator.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.value = 300;
        break;
        
      case 'synth':
      case 'lead':
        oscillator.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.value = 1200;
        filter.Q.value = 8;
        // Add slight filter sweep for synth lead
        if (this.type === 'lead') {
          filter.frequency.setValueAtTime(1200, time);
          filter.frequency.linearRampToValueAtTime(2400, time + 0.1);
          filter.frequency.exponentialRampToValueAtTime(800, time + note.duration * (60/120));
        }
        break;
        
      case 'brass':
        oscillator.type = 'square';
        filter.type = 'lowpass';
        filter.frequency.value = 1500;
        filter.Q.value = 2;
        break;
        
      case 'strings':
        oscillator.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.value = 2500;
        filter.Q.value = 1;
        break;
        
      case 'violin':
        oscillator.type = 'triangle';
        filter.type = 'highpass';
        filter.frequency.value = 200;
        break;
        
      case 'panduri':
        oscillator.type = 'triangle';
        filter.type = 'bandpass';
        filter.frequency.value = 800;
        filter.Q.value = 5;
        break;
        
      case 'choir':
        oscillator.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.value = 1800;
        break;
        
      case 'timpani':
        oscillator.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        break;
        
      default:
        oscillator.type = 'sine';
        filter.type = 'allpass';
        break;
    }
  }

  private configureEnvelope(gain: GainNode, note: Note, time: number, secondsPerBeat: number): void {
    const duration = note.duration * secondsPerBeat;
    const velocity = note.velocity * 0.3; // Reduce overall volume
    
    switch(this.type) {
      case 'piano':
      case 'panduri':
        // Sharp attack, quick decay
        gain.gain.setValueAtTime(velocity, time);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.1, time + duration);
        break;
        
      case 'bass':
        // Sustained bass
        gain.gain.setValueAtTime(velocity * 0.8, time);
        gain.gain.setValueAtTime(velocity * 0.7, time + duration * 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        break;
        
      case 'synth':
      case 'lead':
        // Classic synth envelope with sustain
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity, time + 0.02); // Quick attack
        gain.gain.linearRampToValueAtTime(velocity * 0.7, time + 0.1); // Decay
        gain.gain.setValueAtTime(velocity * 0.7, time + duration * 0.7); // Sustain
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration); // Release
        break;
        
      case 'brass':
        // Brass-like envelope with slower attack
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.9, time + 0.05);
        gain.gain.setValueAtTime(velocity * 0.8, time + duration * 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        break;
        
      case 'strings':
      case 'violin':
      case 'choir':
        // Slow attack for bowed/breath instruments
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.8, time + 0.1);
        gain.gain.setValueAtTime(velocity * 0.7, time + duration * 0.9);
        gain.gain.linearRampToValueAtTime(0, time + duration);
        break;
        
      case 'timpani':
        // Percussion-like envelope
        gain.gain.setValueAtTime(velocity, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + Math.min(duration, 2.0));
        break;
        
      default:
        gain.gain.setValueAtTime(velocity, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        break;
    }
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
        case 'c': // Crash cymbal
          this.playCrash(time, note.duration);
          break;
        case 't': // Tom
          this.playTom(time, note.duration);
          break;
        case 'd': // Generic drum (from existing patterns)
          this.playGenericDrum(time, note.duration);
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

  private playCrash(time: number, duration: number): void {
    // White noise with band-pass filter for crash cymbal
    const bufferSize = this.context.sampleRate * 0.5;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 4000;
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.6;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.8);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 0.8);
  }

  private playTom(time: number, duration: number): void {
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 200;
    oscillator.frequency.exponentialRampToValueAtTime(50, time + 0.2);
    
    gainNode.gain.value = 0.8;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator.start(time);
    oscillator.stop(time + 0.3);
  }

  private playGenericDrum(time: number, duration: number): void {
    // Generic drum sound for 'd' - similar to existing patterns
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    
    oscillator.type = 'triangle';
    oscillator.frequency.value = 100;
    oscillator.frequency.exponentialRampToValueAtTime(40, time + 0.15);
    
    gainNode.gain.value = 0.7;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator.start(time);
    oscillator.stop(time + 0.2);
  }
}