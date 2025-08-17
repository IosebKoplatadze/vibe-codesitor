import { MusicParser } from './parser';
import { AudioEngine } from './audio';

// Main entry point for the application
class MusicConverter {
  private parser: MusicParser;
  public audioEngine: AudioEngine; // Make it public for stop functionality

  constructor() {
    this.parser = new MusicParser();
    this.audioEngine = new AudioEngine();
  }

  public async convertToMusic(notation: string): Promise<void> {
    const musicData = this.parser.parse(notation);
    await this.audioEngine.play(musicData);
  }
}

// Example usage
async function demo() {
  const converter = new MusicConverter();
  
  // A simple example with multiple instruments:
  // piano: C major chord followed by F major chord, each for 1 beat
  // bass: C2 note for 2 beats
  // drums: kick and snare pattern
  const notation = `
    piano:C4.1+E4.1+G4.1|F4.1+A4.1+C5.1;
    bass:C2.2|G2.2;
    drums:k.0.5,s.0.5,k.0.5,s.0.5|k.0.5,s.0.5,k.0.5,s.0.5;
  `;
  
  await converter.convertToMusic(notation);
}

// Run the demo when page loads
window.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('beethoven-button');
  if (startButton) {
    startButton.addEventListener('click', demo);
  }
});

export default MusicConverter;
export { MusicConverter };