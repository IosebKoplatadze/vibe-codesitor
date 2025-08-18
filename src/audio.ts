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
    
    // === KEYBOARD INSTRUMENTS ===
    this.instruments.set('piano', new SynthInstrument(this.audioContext, 'piano'));
    this.instruments.set('electric_piano', new SynthInstrument(this.audioContext, 'electric_piano'));
    this.instruments.set('harpsichord', new SynthInstrument(this.audioContext, 'harpsichord'));
    this.instruments.set('organ', new SynthInstrument(this.audioContext, 'organ'));
    this.instruments.set('accordion', new SynthInstrument(this.audioContext, 'accordion'));
    
    // === STRING INSTRUMENTS ===
    this.instruments.set('violin', new SynthInstrument(this.audioContext, 'violin'));
    this.instruments.set('viola', new SynthInstrument(this.audioContext, 'viola'));
    this.instruments.set('cello', new SynthInstrument(this.audioContext, 'cello'));
    this.instruments.set('double_bass', new SynthInstrument(this.audioContext, 'double_bass'));
    this.instruments.set('bass', new SynthInstrument(this.audioContext, 'bass'));
    this.instruments.set('guitar', new SynthInstrument(this.audioContext, 'guitar'));
    this.instruments.set('electric_guitar', new SynthInstrument(this.audioContext, 'electric_guitar'));
    this.instruments.set('acoustic_guitar', new SynthInstrument(this.audioContext, 'acoustic_guitar'));
    this.instruments.set('banjo', new SynthInstrument(this.audioContext, 'banjo'));
    this.instruments.set('mandolin', new SynthInstrument(this.audioContext, 'mandolin'));
    this.instruments.set('harp', new SynthInstrument(this.audioContext, 'harp'));
    this.instruments.set('sitar', new SynthInstrument(this.audioContext, 'sitar'));
    this.instruments.set('oud', new SynthInstrument(this.audioContext, 'oud'));
    this.instruments.set('panduri', new SynthInstrument(this.audioContext, 'panduri'));
    
    // === BRASS INSTRUMENTS ===
    this.instruments.set('trumpet', new SynthInstrument(this.audioContext, 'trumpet'));
    this.instruments.set('cornet', new SynthInstrument(this.audioContext, 'cornet'));
    this.instruments.set('trombone', new SynthInstrument(this.audioContext, 'trombone'));
    this.instruments.set('french_horn', new SynthInstrument(this.audioContext, 'french_horn'));
    this.instruments.set('tuba', new SynthInstrument(this.audioContext, 'tuba'));
    this.instruments.set('euphonium', new SynthInstrument(this.audioContext, 'euphonium'));
    this.instruments.set('brass', new SynthInstrument(this.audioContext, 'brass')); // generic
    
    // === WOODWIND INSTRUMENTS ===
    this.instruments.set('flute', new SynthInstrument(this.audioContext, 'flute'));
    this.instruments.set('piccolo', new SynthInstrument(this.audioContext, 'piccolo'));
    this.instruments.set('recorder', new SynthInstrument(this.audioContext, 'recorder'));
    this.instruments.set('clarinet', new SynthInstrument(this.audioContext, 'clarinet'));
    this.instruments.set('bass_clarinet', new SynthInstrument(this.audioContext, 'bass_clarinet'));
    this.instruments.set('saxophone', new SynthInstrument(this.audioContext, 'saxophone'));
    this.instruments.set('alto_sax', new SynthInstrument(this.audioContext, 'alto_sax'));
    this.instruments.set('tenor_sax', new SynthInstrument(this.audioContext, 'tenor_sax'));
    this.instruments.set('baritone_sax', new SynthInstrument(this.audioContext, 'baritone_sax'));
    this.instruments.set('oboe', new SynthInstrument(this.audioContext, 'oboe'));
    this.instruments.set('english_horn', new SynthInstrument(this.audioContext, 'english_horn'));
    this.instruments.set('bassoon', new SynthInstrument(this.audioContext, 'bassoon'));
    this.instruments.set('duduk', new SynthInstrument(this.audioContext, 'duduk'));
    
    // === VOICE ===
    this.instruments.set('choir', new SynthInstrument(this.audioContext, 'choir'));
    this.instruments.set('soprano', new SynthInstrument(this.audioContext, 'soprano'));
    this.instruments.set('alto', new SynthInstrument(this.audioContext, 'alto'));
    this.instruments.set('tenor', new SynthInstrument(this.audioContext, 'tenor'));
    this.instruments.set('bass_voice', new SynthInstrument(this.audioContext, 'bass_voice'));
    
    // === MALLET PERCUSSION ===
    this.instruments.set('xylophone', new SynthInstrument(this.audioContext, 'xylophone'));
    this.instruments.set('marimba', new SynthInstrument(this.audioContext, 'marimba'));
    this.instruments.set('vibraphone', new SynthInstrument(this.audioContext, 'vibraphone'));
    this.instruments.set('glockenspiel', new SynthInstrument(this.audioContext, 'glockenspiel'));
    this.instruments.set('bells', new SynthInstrument(this.audioContext, 'bells'));
    this.instruments.set('celesta', new SynthInstrument(this.audioContext, 'celesta'));
    
    // === ORCHESTRAL PERCUSSION ===
    this.instruments.set('timpani', new SynthInstrument(this.audioContext, 'timpani'));
    this.instruments.set('drums', new DrumKit(this.audioContext));
    this.instruments.set('triangle', new SynthInstrument(this.audioContext, 'triangle'));
    this.instruments.set('tambourine', new SynthInstrument(this.audioContext, 'tambourine'));
    this.instruments.set('castanets', new SynthInstrument(this.audioContext, 'castanets'));
    this.instruments.set('wood_block', new SynthInstrument(this.audioContext, 'wood_block'));
    this.instruments.set('temple_block', new SynthInstrument(this.audioContext, 'temple_block'));
    this.instruments.set('gong', new SynthInstrument(this.audioContext, 'gong'));
    this.instruments.set('tam_tam', new SynthInstrument(this.audioContext, 'tam_tam'));
    this.instruments.set('cymbal', new SynthInstrument(this.audioContext, 'cymbal'));
    
    // === ELECTRONIC/SYNTHESIZER ===
    this.instruments.set('synth', new SynthInstrument(this.audioContext, 'synth'));
    this.instruments.set('lead', new SynthInstrument(this.audioContext, 'lead'));
    this.instruments.set('pad', new SynthInstrument(this.audioContext, 'pad'));
    this.instruments.set('arp', new SynthInstrument(this.audioContext, 'arp'));
    this.instruments.set('pluck', new SynthInstrument(this.audioContext, 'pluck'));
    this.instruments.set('strings', new SynthInstrument(this.audioContext, 'strings'));
    this.instruments.set('warm_pad', new SynthInstrument(this.audioContext, 'warm_pad'));
    this.instruments.set('bright_pad', new SynthInstrument(this.audioContext, 'bright_pad'));
    this.instruments.set('polysynth', new SynthInstrument(this.audioContext, 'polysynth'));
    this.instruments.set('fm_synth', new SynthInstrument(this.audioContext, 'fm_synth'));
    
    // === EXOTIC/UNIQUE ===
    this.instruments.set('theremin', new SynthInstrument(this.audioContext, 'theremin'));
    this.instruments.set('glass_harmonica', new SynthInstrument(this.audioContext, 'glass_harmonica'));
    this.instruments.set('musical_saw', new SynthInstrument(this.audioContext, 'musical_saw'));
    this.instruments.set('kalimba', new SynthInstrument(this.audioContext, 'kalimba'));
    this.instruments.set('steel_drum', new SynthInstrument(this.audioContext, 'steel_drum'));
    this.instruments.set('hang_drum', new SynthInstrument(this.audioContext, 'hang_drum'));
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
    const duration = note.duration * secondsPerBeat;
    
    // Create multiple oscillators for choir effect
    for (let i = 0; i < 3; i++) {
      const oscillator = this.context.createOscillator();
      const gainNode = this.context.createGain();
      const filter = this.context.createBiquadFilter();
      
      // Set oscillator type and filter based on instrument
      this.configureInstrument(oscillator, filter, gainNode, note, time);

      // Calculate frequency from note information
      const frequency = this.noteToFrequency(note);
      
      // Sine waves with slight detuning for chorus effect
      oscillator.type = 'sine';
      const detune = (i - 1) * 5; // Slight detuning
      oscillator.frequency.value = frequency;
      oscillator.detune.value = detune;
      
      // Formant-like filtering for voice characteristics
      filter.type = 'bandpass';
      filter.frequency.value = frequency * (2 + i * 0.5);
      filter.Q.value = 2;
      
      // Configure envelope based on instrument type
      this.configureEnvelope(gainNode, note, time, secondsPerBeat);

      // Connect nodes with optional filter
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.context.destination);
      
      // Play the note
      oscillator.start(time);
      oscillator.stop(time + duration + 0.1);
    }
  }
  
  private configureInstrument(oscillator: OscillatorNode, filter: BiquadFilterNode, gain: GainNode, note: Note, time: number): void {
    const noteFreq = this.noteToFrequency(note);
    
    switch(this.type) {
      // === KEYBOARD INSTRUMENTS ===
      case 'piano':
        oscillator.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(2000, noteFreq * 4);
        filter.Q.value = 0.5;
        break;
      
      case 'electric_piano':
        oscillator.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(3000, noteFreq * 6);
        filter.Q.value = 2;
        break;
        
      case 'harpsichord':
        oscillator.type = 'sawtooth';
        filter.type = 'highpass';
        filter.frequency.value = 300;
        filter.Q.value = 3;
        break;
        
      case 'organ':
        oscillator.type = 'square';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(2500, noteFreq * 3);
        filter.Q.value = 1;
        break;
        
      case 'accordion':
        oscillator.type = 'sawtooth';
        filter.type = 'bandpass';
        filter.frequency.value = Math.min(2000, noteFreq * 2);
        filter.Q.value = 4;
        break;

      // === STRING INSTRUMENTS ===
      case 'violin':
      case 'viola':
        oscillator.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(4000, noteFreq * 8);
        filter.Q.value = 2;
        break;
        
      case 'cello':
        oscillator.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(2500, noteFreq * 4);
        filter.Q.value = 1.5;
        break;
        
      case 'double_bass':
      case 'bass':
        oscillator.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(500, noteFreq * 2);
        filter.Q.value = 0.8;
        break;
        
      case 'guitar':
      case 'acoustic_guitar':
        oscillator.type = 'triangle';
        filter.type = 'bandpass';
        filter.frequency.value = Math.min(2000, noteFreq * 3);
        filter.Q.value = 3;
        break;
        
      case 'electric_guitar':
        oscillator.type = 'square';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(3000, noteFreq * 4);
        filter.Q.value = 8;
        break;
        
      case 'banjo':
        oscillator.type = 'triangle';
        filter.type = 'highpass';
        filter.frequency.value = 400;
        filter.Q.value = 4;
        break;
        
      case 'mandolin':
        oscillator.type = 'triangle';
        filter.type = 'bandpass';
        filter.frequency.value = Math.min(3000, noteFreq * 4);
        filter.Q.value = 6;
        break;
        
      case 'harp':
        oscillator.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(4000, noteFreq * 8);
        filter.Q.value = 0.5;
        break;
        
      case 'sitar':
        oscillator.type = 'sawtooth';
        filter.type = 'bandpass';
        filter.frequency.value = Math.min(1500, noteFreq * 2);
        filter.Q.value = 10;
        break;
        
      case 'oud':
        oscillator.type = 'triangle';
        filter.type = 'bandpass';
        filter.frequency.value = Math.min(1800, noteFreq * 2.5);
        filter.Q.value = 4;
        break;
        
      case 'panduri':
        oscillator.type = 'triangle';
        filter.type = 'bandpass';
        filter.frequency.value = Math.min(800, noteFreq * 1.5);
        filter.Q.value = 5;
        break;

      // === BRASS INSTRUMENTS ===
      case 'trumpet':
      case 'cornet':
        oscillator.type = 'square';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(2500, noteFreq * 3);
        filter.Q.value = 3;
        break;
        
      case 'trombone':
        oscillator.type = 'square';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(1800, noteFreq * 2.5);
        filter.Q.value = 2;
        break;
        
      case 'french_horn':
        oscillator.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(2000, noteFreq * 2.8);
        filter.Q.value = 2;
        break;
        
      case 'tuba':
      case 'euphonium':
        oscillator.type = 'square';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(800, noteFreq * 1.5);
        filter.Q.value = 1.5;
        break;
        
      case 'brass':
        oscillator.type = 'square';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(1500, noteFreq * 2);
        filter.Q.value = 2;
        break;

      // === WOODWIND INSTRUMENTS ===
      case 'flute':
      case 'piccolo':
        oscillator.type = 'sine';
        filter.type = 'highpass';
        filter.frequency.value = 200;
        filter.Q.value = 0.8;
        break;
        
      case 'recorder':
        oscillator.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(3000, noteFreq * 4);
        filter.Q.value = 1;
        break;
        
      case 'clarinet':
      case 'bass_clarinet':
        oscillator.type = 'square';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(2000, noteFreq * 3);
        filter.Q.value = 4;
        break;
        
      case 'saxophone':
      case 'alto_sax':
      case 'tenor_sax':
      case 'baritone_sax':
        oscillator.type = 'square';
        filter.type = 'bandpass';
        filter.frequency.value = Math.min(2500, noteFreq * 3);
        filter.Q.value = 6;
        break;
        
      case 'oboe':
      case 'english_horn':
        oscillator.type = 'square';
        filter.type = 'bandpass';
        filter.frequency.value = Math.min(2200, noteFreq * 3);
        filter.Q.value = 8;
        break;
        
      case 'bassoon':
        oscillator.type = 'square';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(1200, noteFreq * 2);
        filter.Q.value = 3;
        break;
        
      case 'duduk':
        oscillator.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(1000, noteFreq * 1.8);
        filter.Q.value = 6;
        break;

      // === VOICE ===
      case 'choir':
      case 'soprano':
      case 'alto':
      case 'tenor':
      case 'bass_voice':
        oscillator.type = 'sine';
        filter.type = 'bandpass';
        filter.frequency.value = Math.min(2000, noteFreq * 2.5);
        filter.Q.value = 4;
        break;

      // === MALLET PERCUSSION ===
      case 'xylophone':
        oscillator.type = 'square';
        filter.type = 'highpass';
        filter.frequency.value = 800;
        filter.Q.value = 2;
        break;
        
      case 'marimba':
        oscillator.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(2000, noteFreq * 3);
        filter.Q.value = 1;
        break;
        
      case 'vibraphone':
        oscillator.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(3000, noteFreq * 4);
        filter.Q.value = 2;
        // Add vibrato
        oscillator.frequency.setValueAtTime(noteFreq, time);
        const lfoFreq = 6; // 6 Hz vibrato
        oscillator.frequency.setValueAtTime(noteFreq * (1 + 0.02 * Math.sin(2 * Math.PI * lfoFreq * time)), time);
        break;
        
      case 'glockenspiel':
      case 'bells':
        oscillator.type = 'sine';
        filter.type = 'highpass';
        filter.frequency.value = 1000;
        filter.Q.value = 4;
        break;
        
      case 'celesta':
        oscillator.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(4000, noteFreq * 6);
        filter.Q.value = 2;
        break;

      // === ORCHESTRAL PERCUSSION ===
      case 'timpani':
        oscillator.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(400, noteFreq * 1.2);
        filter.Q.value = 0.8;
        break;
        
      case 'triangle':
        oscillator.type = 'sine';
        filter.type = 'highpass';
        filter.frequency.value = 3000;
        filter.Q.value = 8;
        break;
        
      case 'tambourine':
        oscillator.type = 'square';
        filter.type = 'highpass';
        filter.frequency.value = 2000;
        filter.Q.value = 4;
        break;
        
      case 'castanets':
      case 'wood_block':
      case 'temple_block':
        oscillator.type = 'square';
        filter.type = 'bandpass';
        filter.frequency.value = 1500;
        filter.Q.value = 6;
        break;
        
      case 'gong':
      case 'tam_tam':
      case 'cymbal':
        oscillator.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(3000, noteFreq * 4);
        filter.Q.value = 0.3;
        break;

      // === SYNTHESIZER ===
      case 'synth':
      case 'lead':
        oscillator.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.value = 1200;
        filter.Q.value = 8;
        // Add filter sweep for lead
        if (this.type === 'lead') {
          filter.frequency.setValueAtTime(1200, time);
          filter.frequency.linearRampToValueAtTime(2400, time + 0.1);
          filter.frequency.exponentialRampToValueAtTime(800, time + note.duration * (60/120));
        }
        break;
        
      case 'pad':
      case 'warm_pad':
        oscillator.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        filter.Q.value = 2;
        break;
        
      case 'bright_pad':
        oscillator.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.value = 1800;
        filter.Q.value = 4;
        break;
        
      case 'arp':
        oscillator.type = 'square';
        filter.type = 'bandpass';
        filter.frequency.value = Math.min(2000, noteFreq * 2);
        filter.Q.value = 10;
        break;
        
      case 'pluck':
        oscillator.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(2500, noteFreq * 4);
        filter.Q.value = 6;
        break;
        
      case 'strings':
        oscillator.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(2500, noteFreq * 3);
        filter.Q.value = 1;
        break;
        
      case 'polysynth':
        oscillator.type = 'square';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(1800, noteFreq * 2.5);
        filter.Q.value = 5;
        break;
        
      case 'fm_synth':
        oscillator.type = 'sine';
        filter.type = 'bandpass';
        filter.frequency.value = Math.min(2200, noteFreq * 2.8);
        filter.Q.value = 8;
        break;

      // === EXOTIC/UNIQUE ===
      case 'theremin':
        oscillator.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(1500, noteFreq * 2);
        filter.Q.value = 2;
        // Add subtle frequency wobble
        oscillator.frequency.setValueAtTime(noteFreq * (1 + 0.01 * Math.sin(time * 3)), time);
        break;
        
      case 'glass_harmonica':
        oscillator.type = 'sine';
        filter.type = 'highpass';
        filter.frequency.value = 400;
        filter.Q.value = 6;
        break;
        
      case 'musical_saw':
        oscillator.type = 'triangle';
        filter.type = 'bandpass';
        filter.frequency.value = Math.min(1800, noteFreq * 2.2);
        filter.Q.value = 12;
        break;
        
      case 'kalimba':
        oscillator.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.value = Math.min(2000, noteFreq * 3);
        filter.Q.value = 4;
        break;
        
      case 'steel_drum':
      case 'hang_drum':
        oscillator.type = 'triangle';
        filter.type = 'bandpass';
        filter.frequency.value = Math.min(2500, noteFreq * 3);
        filter.Q.value = 8;
        break;

      default:
        oscillator.type = 'sine';
        filter.type = 'allpass';
        filter.frequency.value = noteFreq;
        break;
    }
  }

  private configureEnvelope(gain: GainNode, note: Note, time: number, secondsPerBeat: number): void {
    const duration = note.duration * secondsPerBeat;
    const velocity = note.velocity * 0.3; // Reduce overall volume
    
    switch(this.type) {
      // === KEYBOARD INSTRUMENTS ===
      case 'piano':
      case 'electric_piano':
        // Sharp attack, moderate decay
        gain.gain.setValueAtTime(velocity, time);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.2, time + duration);
        break;
        
      case 'harpsichord':
        // Very sharp attack, quick decay
        gain.gain.setValueAtTime(velocity * 0.9, time);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.05, time + Math.min(duration, 1.0));
        break;
        
      case 'organ':
      case 'accordion':
        // Sustained envelope like wind instruments
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.8, time + 0.05);
        gain.gain.setValueAtTime(velocity * 0.7, time + duration * 0.8);
        gain.gain.linearRampToValueAtTime(0, time + duration);
        break;

      // === STRING INSTRUMENTS ===
      case 'violin':
      case 'viola':
      case 'cello':
      case 'double_bass':
        // Bowed strings: slow attack, sustained
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.8, time + 0.1);
        gain.gain.setValueAtTime(velocity * 0.7, time + duration * 0.9);
        gain.gain.linearRampToValueAtTime(0, time + duration);
        break;
        
      case 'guitar':
      case 'acoustic_guitar':
      case 'electric_guitar':
      case 'banjo':
      case 'mandolin':
      case 'panduri':
        // Plucked strings: sharp attack, gradual decay
        gain.gain.setValueAtTime(velocity, time);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.3, time + 0.1);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.05, time + duration);
        break;
        
      case 'harp':
        // Gentle attack, beautiful decay
        gain.gain.setValueAtTime(velocity * 0.9, time);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.1, time + duration);
        break;
        
      case 'sitar':
      case 'oud':
        // Ethnic plucked: sharp attack with resonance
        gain.gain.setValueAtTime(velocity * 1.1, time);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.4, time + 0.2);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.1, time + duration);
        break;
        
      case 'bass':
        // Sustained bass
        gain.gain.setValueAtTime(velocity * 0.8, time);
        gain.gain.setValueAtTime(velocity * 0.7, time + duration * 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        break;

      // === BRASS INSTRUMENTS ===
      case 'trumpet':
      case 'cornet':
        // Brass: medium attack, bright sustain
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.9, time + 0.05);
        gain.gain.setValueAtTime(velocity * 0.8, time + duration * 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        break;
        
      case 'trombone':
      case 'french_horn':
      case 'euphonium':
        // Softer brass attack
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.8, time + 0.08);
        gain.gain.setValueAtTime(velocity * 0.7, time + duration * 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        break;
        
      case 'tuba':
        // Deep brass: slower attack
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.7, time + 0.12);
        gain.gain.setValueAtTime(velocity * 0.6, time + duration * 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        break;
        
      case 'brass':
        // Generic brass
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.9, time + 0.05);
        gain.gain.setValueAtTime(velocity * 0.8, time + duration * 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        break;

      // === WOODWIND INSTRUMENTS ===
      case 'flute':
      case 'piccolo':
        // Airy attack, sustained
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.7, time + 0.06);
        gain.gain.setValueAtTime(velocity * 0.6, time + duration * 0.9);
        gain.gain.linearRampToValueAtTime(0, time + duration);
        break;
        
      case 'recorder':
        // Simple breath instrument
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.6, time + 0.04);
        gain.gain.setValueAtTime(velocity * 0.5, time + duration * 0.9);
        gain.gain.linearRampToValueAtTime(0, time + duration);
        break;
        
      case 'clarinet':
      case 'bass_clarinet':
      case 'saxophone':
      case 'alto_sax':
      case 'tenor_sax':
      case 'baritone_sax':
        // Reed instruments: quick attack, sustained
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.8, time + 0.03);
        gain.gain.setValueAtTime(velocity * 0.7, time + duration * 0.9);
        gain.gain.linearRampToValueAtTime(0, time + duration);
        break;
        
      case 'oboe':
      case 'english_horn':
      case 'bassoon':
        // Double reed: distinctive attack
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.9, time + 0.04);
        gain.gain.setValueAtTime(velocity * 0.7, time + duration * 0.9);
        gain.gain.linearRampToValueAtTime(0, time + duration);
        break;
        
      case 'duduk':
        // Ethnic wind: soulful envelope
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.6, time + 0.08);
        gain.gain.setValueAtTime(velocity * 0.5, time + duration * 0.9);
        gain.gain.linearRampToValueAtTime(0, time + duration);
        break;

      // === VOICE ===
      case 'choir':
      case 'soprano':
      case 'alto':
      case 'tenor':
      case 'bass_voice':
        // Vocal: slow attack for breath instruments
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.8, time + 0.1);
        gain.gain.setValueAtTime(velocity * 0.7, time + duration * 0.9);
        gain.gain.linearRampToValueAtTime(0, time + duration);
        break;

      // === MALLET PERCUSSION ===
      case 'xylophone':
      case 'marimba':
      case 'glockenspiel':
      case 'bells':
        // Mallet percussion: sharp attack, ringing decay
        gain.gain.setValueAtTime(velocity, time);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.1, time + Math.min(duration, 2.0));
        break;
        
      case 'vibraphone':
        // Vibraphone: sustained mallet with vibrato
        gain.gain.setValueAtTime(velocity * 0.8, time);
        gain.gain.setValueAtTime(velocity * 0.7, time + duration * 0.8);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.1, time + duration);
        break;
        
      case 'celesta':
        // Delicate mallet
        gain.gain.setValueAtTime(velocity * 0.7, time);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.05, time + duration);
        break;

      // === ORCHESTRAL PERCUSSION ===
      case 'timpani':
        // Timpani: sharp attack, long resonance
        gain.gain.setValueAtTime(velocity, time);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.1, time + Math.min(duration, 3.0));
        break;
        
      case 'triangle':
        // Triangle: sharp attack, very long ring
        gain.gain.setValueAtTime(velocity * 0.6, time);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.1, time + Math.min(duration, 4.0));
        break;
        
      case 'tambourine':
      case 'castanets':
      case 'wood_block':
      case 'temple_block':
        // Sharp percussion: very quick decay
        gain.gain.setValueAtTime(velocity * 0.8, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.1);
        break;
        
      case 'gong':
      case 'tam_tam':
      case 'cymbal':
        // Metallic percussion: long decay
        gain.gain.setValueAtTime(velocity, time);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.1, time + Math.min(duration, 5.0));
        break;

      // === SYNTHESIZER ===
      case 'synth':
      case 'lead':
        // Classic synth envelope with sustain
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity, time + 0.02); // Quick attack
        gain.gain.linearRampToValueAtTime(velocity * 0.7, time + 0.1); // Decay
        gain.gain.setValueAtTime(velocity * 0.7, time + duration * 0.7); // Sustain
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration); // Release
        break;
        
      case 'pad':
      case 'warm_pad':
      case 'bright_pad':
        // Pad: very slow attack, sustained
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.6, time + 0.2);
        gain.gain.setValueAtTime(velocity * 0.5, time + duration * 0.8);
        gain.gain.linearRampToValueAtTime(0, time + duration);
        break;
        
      case 'arp':
        // Arp: short, punchy
        gain.gain.setValueAtTime(velocity * 0.9, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + Math.min(duration, 0.5));
        break;
        
      case 'pluck':
        // Synth pluck: quick attack, fast decay
        gain.gain.setValueAtTime(velocity, time);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.1, time + Math.min(duration, 0.8));
        break;
        
      case 'strings':
        // Synth strings: string-like envelope
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.8, time + 0.1);
        gain.gain.setValueAtTime(velocity * 0.7, time + duration * 0.9);
        gain.gain.linearRampToValueAtTime(0, time + duration);
        break;
        
      case 'polysynth':
        // Poly synth: balanced envelope
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.8, time + 0.05);
        gain.gain.setValueAtTime(velocity * 0.6, time + duration * 0.7);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        break;
        
      case 'fm_synth':
        // FM synth: unique envelope
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.9, time + 0.01);
        gain.gain.linearRampToValueAtTime(velocity * 0.5, time + 0.08);
        gain.gain.setValueAtTime(velocity * 0.4, time + duration * 0.6);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        break;

      // === EXOTIC/UNIQUE ===
      case 'theremin':
        // Theremin: continuous, ethereal
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.6, time + 0.15);
        gain.gain.setValueAtTime(velocity * 0.5, time + duration * 0.8);
        gain.gain.linearRampToValueAtTime(0, time + duration);
        break;
        
      case 'glass_harmonica':
        // Glass harmonica: slow attack, sustained
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.5, time + 0.2);
        gain.gain.setValueAtTime(velocity * 0.4, time + duration * 0.9);
        gain.gain.linearRampToValueAtTime(0, time + duration);
        break;
        
      case 'musical_saw':
        // Musical saw: bowed, sustained
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(velocity * 0.6, time + 0.12);
        gain.gain.setValueAtTime(velocity * 0.5, time + duration * 0.9);
        gain.gain.linearRampToValueAtTime(0, time + duration);
        break;
        
      case 'kalimba':
        // Kalimba: thumb piano attack
        gain.gain.setValueAtTime(velocity * 0.8, time);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.15, time + duration);
        break;
        
      case 'steel_drum':
      case 'hang_drum':
        // Steel percussion: unique attack and sustain
        gain.gain.setValueAtTime(velocity * 0.9, time);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.3, time + 0.2);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.1, time + duration);
        break;

      default:
        gain.gain.setValueAtTime(velocity, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        break;
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
      const sound = note.pitch.toLowerCase();
      switch(sound) {
        // === BASIC DRUM KIT ===
        case 'k': case 'kick':
          this.playKick(time, note.duration);
          break;
        case 's': case 'snare':
          this.playSnare(time, note.duration);
          break;
        case 'h': case 'hihat':
          this.playHihat(time, note.duration);
          break;
        case 'o': case 'open_hihat':
          this.playOpenHihat(time, note.duration);
          break;
        case 'c': case 'crash':
          this.playCrash(time, note.duration);
          break;
        case 'r': case 'ride':
          this.playRide(time, note.duration);
          break;
        case 't': case 'tom':
          this.playTom(time, note.duration);
          break;
        case 'f': case 'floor_tom':
          this.playFloorTom(time, note.duration);
          break;
          
        // === EXTENDED PERCUSSION ===
        case 'sp': case 'splash':
          this.playSplash(time, note.duration);
          break;
        case 'ch': case 'china':
          this.playChina(time, note.duration);
          break;
        case 'rb': case 'ride_bell':
          this.playRideBell(time, note.duration);
          break;
        case 'cb': case 'cowbell':
          this.playCowbell(time, note.duration);
          break;
        case 'wb': case 'wood_block':
          this.playWoodBlock(time, note.duration);
          break;
        case 'cl': case 'clap':
          this.playHandClap(time, note.duration);
          break;
        case 'tam': case 'tambourine':
          this.playTambourine(time, note.duration);
          break;
        case 'sha': case 'shaker':
          this.playShaker(time, note.duration);
          break;
        case 'ca': case 'cabasa':
          this.playCabasa(time, note.duration);
          break;
        case 'ma': case 'maracas':
          this.playMaracas(time, note.duration);
          break;
          
        // === ETHNIC PERCUSSION ===
        case 'd': case 'doli': case 'frame_drum':
          this.playFrameDrum(time, note.duration);
          break;
        case 'ta': case 'tabla':
          this.playTabla(time, note.duration);
          break;
        case 'bongo':
          this.playBongo(time, note.duration);
          break;
        case 'conga':
          this.playConga(time, note.duration);
          break;
        case 'djembe':
          this.playDjembe(time, note.duration);
          break;
        case 'cai': case 'cajon':
          this.playCajon(time, note.duration);
          break;
        case 'ti': case 'timbale':
          this.playTimbale(time, note.duration);
          break;
        case 'uk': case 'udu':
          this.playUdu(time, note.duration);
          break;
          
        // === ORCHESTRAL PERCUSSION ===
        case 'tim': case 'timpani':
          this.playTimpani(time, note.duration);
          break;
        case 'gong':
          this.playGong(time, note.duration);
          break;
        case 'tri': case 'triangle':
          this.playTriangle(time, note.duration);
          break;
        case 'sus': case 'suspended_cymbal':
          this.playSuspendedCymbal(time, note.duration);
          break;
        case 'vib': case 'vibraslap':
          this.playVibraslap(time, note.duration);
          break;
        case 'ws': case 'wind_chimes':
          this.playWindChimes(time, note.duration);
          break;
        case 'ra': case 'ratchet':
          this.playRatchet(time, note.duration);
          break;
        case 'wh': case 'whip':
          this.playWhipCrack(time, note.duration);
          break;
          
        // === ELECTRONIC/SYNTHETIC ===
        case '808': case 'kick_808':
          this.play808Kick(time, note.duration);
          break;
        case 'elec': case 'electronic_snare':
          this.playElectronicSnare(time, note.duration);
          break;
        case 'rev': case 'reverse_cymbal':
          this.playReverseCymbal(time, note.duration);
          break;
        case 'gat': case 'gated_snare':
          this.playGatedSnare(time, note.duration);
          break;
          
        default:
          // Fallback to generic drum
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

  private playOpenHihat(time: number, duration: number): void {
    // Open hi-hat: longer noise decay
    const bufferSize = this.context.sampleRate * 0.15;
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
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.15);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 0.15);
  }

  private playRide(time: number, duration: number): void {
    // Ride cymbal: metallic with sustained ring
    const oscillator1 = this.context.createOscillator();
    const oscillator2 = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    oscillator1.type = 'triangle';
    oscillator1.frequency.value = 800;
    oscillator2.type = 'sine';
    oscillator2.frequency.value = 1200;
    
    filter.type = 'highpass';
    filter.frequency.value = 600;
    
    gainNode.gain.value = 0.3;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 1.0);
    
    oscillator1.connect(filter);
    oscillator2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator1.start(time);
    oscillator2.start(time);
    oscillator1.stop(time + 1.0);
    oscillator2.stop(time + 1.0);
  }

  private playFloorTom(time: number, duration: number): void {
    // Floor tom: lower pitched than regular tom
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 120;
    oscillator.frequency.exponentialRampToValueAtTime(30, time + 0.4);
    
    gainNode.gain.value = 0.9;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator.start(time);
    oscillator.stop(time + 0.5);
  }

  private playSplash(time: number, duration: number): void {
    // Splash cymbal: short, bright crash
    const bufferSize = this.context.sampleRate * 0.2;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 5000;
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.5;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 0.3);
  }

  private playChina(time: number, duration: number): void {
    // China cymbal: trashy, explosive sound
    const bufferSize = this.context.sampleRate * 0.8;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    filter.Q.value = 0.5;
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.7;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 1.0);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 1.0);
  }

  private playRideBell(time: number, duration: number): void {
    // Ride bell: metallic ping
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    oscillator.type = 'triangle';
    oscillator.frequency.value = 2000;
    
    filter.type = 'highpass';
    filter.frequency.value = 1500;
    filter.Q.value = 8;
    
    gainNode.gain.value = 0.6;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator.start(time);
    oscillator.stop(time + 0.3);
  }

  private playCowbell(time: number, duration: number): void {
    // Cowbell: metallic, pitched percussion
    const oscillator1 = this.context.createOscillator();
    const oscillator2 = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    oscillator1.type = 'square';
    oscillator1.frequency.value = 800;
    oscillator2.type = 'triangle';
    oscillator2.frequency.value = 540;
    
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 4;
    
    gainNode.gain.value = 0.5;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    
    oscillator1.connect(filter);
    oscillator2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator1.start(time);
    oscillator2.start(time);
    oscillator1.stop(time + 0.2);
    oscillator2.stop(time + 0.2);
  }

  private playWoodBlock(time: number, duration: number): void {
    // Wood block: dry, woody sound
    const bufferSize = this.context.sampleRate * 0.05;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 0.5 - 0.25;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2000;
    filter.Q.value = 8;
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.7;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 0.08);
  }

  private playHandClap(time: number, duration: number): void {
    // Hand clap: multiple quick bursts
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const bufferSize = this.context.sampleRate * 0.02;
        const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let j = 0; j < bufferSize; j++) {
          data[j] = Math.random() * 2 - 1;
        }
        
        const noise = this.context.createBufferSource();
        noise.buffer = buffer;
        
        const filter = this.context.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 2000;
        
        const gainNode = this.context.createGain();
        gainNode.gain.value = 0.4;
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.04);
        
        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        noise.start(time);
        noise.stop(time + 0.04);
      }, i * 10);
    }
  }

  private playTambourine(time: number, duration: number): void {
    // Tambourine: jingles with skin hit
    const oscillator = this.context.createOscillator();
    const bufferSize = this.context.sampleRate * 0.1;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    // High frequency jingles
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 0.8 - 0.4;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 4000;
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.5;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.15);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 0.15);
  }

  private playShaker(time: number, duration: number): void {
    // Shaker: sustained shake sound
    const bufferSize = this.context.sampleRate * 0.1;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 0.6 - 0.3;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 6000;
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.3;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.12);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 0.12);
  }

  private playCabasa(time: number, duration: number): void {
    // Cabasa: metallic shaker
    const bufferSize = this.context.sampleRate * 0.08;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 0.8 - 0.4;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 5000;
    filter.Q.value = 2;
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.4;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 0.1);
  }

  private playMaracas(time: number, duration: number): void {
    // Maracas: bright shaker
    const bufferSize = this.context.sampleRate * 0.06;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 1.0 - 0.5;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 8000;
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.4;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 0.08);
  }

  private playTabla(time: number, duration: number): void {
    // Tabla: pitched drum with resonance
    const oscillator1 = this.context.createOscillator();
    const oscillator2 = this.context.createOscillator();
    const gainNode = this.context.createGain();
    
    oscillator1.type = 'sine';
    oscillator1.frequency.value = 200;
    oscillator1.frequency.exponentialRampToValueAtTime(80, time + 0.15);
    
    oscillator2.type = 'triangle';
    oscillator2.frequency.value = 400;
    oscillator2.frequency.exponentialRampToValueAtTime(150, time + 0.1);
    
    gainNode.gain.value = 0.7;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.25);
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator1.start(time);
    oscillator2.start(time);
    oscillator1.stop(time + 0.25);
    oscillator2.stop(time + 0.25);
  }

  private playBongo(time: number, duration: number): void {
    // Bongo: small pitched drum
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    oscillator.type = 'triangle';
    oscillator.frequency.value = 300;
    oscillator.frequency.exponentialRampToValueAtTime(180, time + 0.12);
    
    filter.type = 'bandpass';
    filter.frequency.value = 400;
    filter.Q.value = 3;
    
    gainNode.gain.value = 0.6;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.18);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator.start(time);
    oscillator.stop(time + 0.18);
  }

  private playConga(time: number, duration: number): void {
    // Conga: medium pitched drum
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 220;
    oscillator.frequency.exponentialRampToValueAtTime(120, time + 0.2);
    
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    filter.Q.value = 2;
    
    gainNode.gain.value = 0.8;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator.start(time);
    oscillator.stop(time + 0.3);
  }

  private playDjembe(time: number, duration: number): void {
    // Djembe: African goblet drum
    const oscillator1 = this.context.createOscillator();
    const oscillator2 = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    oscillator1.type = 'sine';
    oscillator1.frequency.value = 180;
    oscillator1.frequency.exponentialRampToValueAtTime(60, time + 0.2);
    
    oscillator2.type = 'triangle';
    oscillator2.frequency.value = 400;
    oscillator2.frequency.exponentialRampToValueAtTime(200, time + 0.15);
    
    filter.type = 'lowpass';
    filter.frequency.value = 1200;
    filter.Q.value = 1;
    
    gainNode.gain.value = 0.8;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.35);
    
    oscillator1.connect(filter);
    oscillator2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator1.start(time);
    oscillator2.start(time);
    oscillator1.stop(time + 0.35);
    oscillator2.stop(time + 0.35);
  }

  private playCajon(time: number, duration: number): void {
    // Cajon: box drum with bass and snare qualities
    const oscillator = this.context.createOscillator();
    const bufferSize = this.context.sampleRate * 0.08;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Add some noise for snare-like quality
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 0.5 - 0.25;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    oscillator.type = 'triangle';
    oscillator.frequency.value = 120;
    oscillator.frequency.exponentialRampToValueAtTime(40, time + 0.15);
    
    const gainNode1 = this.context.createGain();
    const gainNode2 = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    
    gainNode1.gain.value = 0.7;
    gainNode1.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    
    gainNode2.gain.value = 0.3;
    gainNode2.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
    
    oscillator.connect(gainNode1);
    noise.connect(filter);
    filter.connect(gainNode2);
    gainNode1.connect(this.context.destination);
    gainNode2.connect(this.context.destination);
    
    oscillator.start(time);
    noise.start(time);
    oscillator.stop(time + 0.2);
    noise.stop(time + 0.1);
  }

  private playTimbale(time: number, duration: number): void {
    // Timbale: Latin metal drum
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    oscillator.type = 'triangle';
    oscillator.frequency.value = 350;
    oscillator.frequency.exponentialRampToValueAtTime(200, time + 0.15);
    
    filter.type = 'bandpass';
    filter.frequency.value = 600;
    filter.Q.value = 4;
    
    gainNode.gain.value = 0.7;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.25);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator.start(time);
    oscillator.stop(time + 0.25);
  }

  private playUdu(time: number, duration: number): void {
    // Udu: clay pot drum
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 160;
    oscillator.frequency.exponentialRampToValueAtTime(80, time + 0.3);
    
    filter.type = 'lowpass';
    filter.frequency.value = 600;
    filter.Q.value = 3;
    
    gainNode.gain.value = 0.8;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.4);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator.start(time);
    oscillator.stop(time + 0.4);
  }

  private playTimpani(time: number, duration: number): void {
    // Timpani: orchestral kettle drum
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 200;
    oscillator.frequency.exponentialRampToValueAtTime(180, time + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(160, time + 0.5);
    
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    filter.Q.value = 1;
    
    gainNode.gain.value = 1.0;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 2.0);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator.start(time);
    oscillator.stop(time + 2.0);
  }

  private playGong(time: number, duration: number): void {
    // Gong: large metallic percussion
    const oscillator1 = this.context.createOscillator();
    const oscillator2 = this.context.createOscillator();
    const oscillator3 = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    oscillator1.type = 'triangle';
    oscillator1.frequency.value = 100;
    oscillator2.type = 'sine';
    oscillator2.frequency.value = 200;
    oscillator3.type = 'triangle';
    oscillator3.frequency.value = 300;
    
    filter.type = 'lowpass';
    filter.frequency.value = 2000;
    filter.Q.value = 0.5;
    
    gainNode.gain.value = 0.8;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 3.0);
    
    oscillator1.connect(filter);
    oscillator2.connect(filter);
    oscillator3.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator1.start(time);
    oscillator2.start(time);
    oscillator3.start(time);
    oscillator1.stop(time + 3.0);
    oscillator2.stop(time + 3.0);
    oscillator3.stop(time + 3.0);
  }

  private playTriangle(time: number, duration: number): void {
    // Triangle: pure metallic ring
    const oscillator1 = this.context.createOscillator();
    const oscillator2 = this.context.createOscillator();
    const gainNode = this.context.createGain();
    
    oscillator1.type = 'sine';
    oscillator1.frequency.value = 2000;
    oscillator2.type = 'sine';
    oscillator2.frequency.value = 3000;
    
    gainNode.gain.value = 0.3;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 2.0);
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator1.start(time);
    oscillator2.start(time);
    oscillator1.stop(time + 2.0);
    oscillator2.stop(time + 2.0);
  }

  private playSuspendedCymbal(time: number, duration: number): void {
    // Suspended cymbal: orchestral crash
    const bufferSize = this.context.sampleRate * 2.0;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 3000;
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.6;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 2.5);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 2.5);
  }

  private playVibraslap(time: number, duration: number): void {
    // Vibraslap: rattle instrument
    const bufferSize = this.context.sampleRate * 0.2;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 0.8 - 0.4;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    filter.Q.value = 4;
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.5;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 0.3);
  }

  private playWindChimes(time: number, duration: number): void {
    // Wind chimes: multiple tuned metals
    const frequencies = [800, 1000, 1200, 1500, 1800];
    
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        
        gainNode.gain.value = 0.2;
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + 1.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.start(time);
        oscillator.stop(time + 1.5);
      }, i * 50);
    });
  }

  private playRatchet(time: number, duration: number): void {
    // Ratchet: clicking sound
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const bufferSize = this.context.sampleRate * 0.01;
        const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let j = 0; j < bufferSize; j++) {
          data[j] = Math.random() * 0.8 - 0.4;
        }
        
        const noise = this.context.createBufferSource();
        noise.buffer = buffer;
        
        const gainNode = this.context.createGain();
        gainNode.gain.value = 0.6;
        
        noise.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        noise.start(time);
        noise.stop(time + 0.02);
      }, i * 20);
    }
  }

  private playWhipCrack(time: number, duration: number): void {
    // Whip crack: sharp crack sound
    const bufferSize = this.context.sampleRate * 0.05;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2500;
    filter.Q.value = 10;
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.8;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 0.08);
  }

  private play808Kick(time: number, duration: number): void {
    // 808 kick: electronic sub kick
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 80;
    oscillator.frequency.exponentialRampToValueAtTime(20, time + 0.2);
    
    filter.type = 'lowpass';
    filter.frequency.value = 200;
    filter.Q.value = 2;
    
    gainNode.gain.value = 1.0;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator.start(time);
    oscillator.stop(time + 0.3);
  }

  private playElectronicSnare(time: number, duration: number): void {
    // Electronic snare: synthetic snare
    const oscillator = this.context.createOscillator();
    const bufferSize = this.context.sampleRate * 0.08;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    oscillator.type = 'triangle';
    oscillator.frequency.value = 200;
    
    const gainNode1 = this.context.createGain();
    const gainNode2 = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    filter.type = 'highpass';
    filter.frequency.value = 2000;
    filter.Q.value = 4;
    
    gainNode1.gain.value = 0.6;
    gainNode1.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
    
    gainNode2.gain.value = 0.8;
    gainNode2.gain.exponentialRampToValueAtTime(0.01, time + 0.12);
    
    oscillator.connect(gainNode1);
    noise.connect(filter);
    filter.connect(gainNode2);
    gainNode1.connect(this.context.destination);
    gainNode2.connect(this.context.destination);
    
    oscillator.start(time);
    noise.start(time);
    oscillator.stop(time + 0.1);
    noise.stop(time + 0.12);
  }

  private playReverseCymbal(time: number, duration: number): void {
    // Reverse cymbal: swell effect
    const bufferSize = this.context.sampleRate * 1.0;
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
    gainNode.gain.value = 0.01;
    gainNode.gain.exponentialRampToValueAtTime(0.8, time + 0.8);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 1.0);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 1.0);
  }

  private playGatedSnare(time: number, duration: number): void {
    // Gated snare: gated reverb effect
    const bufferSize = this.context.sampleRate * 0.5;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 4;
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0.8;
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
    gainNode.gain.setValueAtTime(0.01, time + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.6, time + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.6);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    noise.start(time);
    noise.stop(time + 0.6);
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