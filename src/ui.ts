// UI and Application Logic for Music Notation Converter
// Extracted from index.html to keep concerns separated

// Types and interfaces
interface SavedNotation {
  id: number;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface TextToMusicOptions {
  style: string;
  scale: string;
  tempo: number;
  baseOctave: number;
}

// LocalStorage management for saved notations
class NotationStorage {
  private readonly storageKey: string;

  constructor() {
    this.storageKey = 'musicNotations';
  }

  getNotations(): SavedNotation[] {
    const notations = localStorage.getItem(this.storageKey);
    return notations ? JSON.parse(notations) : [];
  }

  saveNotation(name: string, content: string): SavedNotation {
    const notations = this.getNotations();
    const existingIndex = notations.findIndex(n => n.name === name);
    
    const notation: SavedNotation = {
      id: existingIndex >= 0 ? notations[existingIndex].id : Date.now(),
      name: name,
      content: content,
      createdAt: existingIndex >= 0 ? notations[existingIndex].createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      notations[existingIndex] = notation;
    } else {
      notations.push(notation);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(notations));
    return notation;
  }

  deleteNotation(id: number): void {
    const notations = this.getNotations();
    const filteredNotations = notations.filter(n => n.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filteredNotations));
  }

  updateNotation(id: number, name: string, content: string): SavedNotation | null {
    const notations = this.getNotations();
    const index = notations.findIndex(n => n.id === id);
    if (index >= 0) {
      notations[index].name = name;
      notations[index].content = content;
      notations[index].updatedAt = new Date().toISOString();
      localStorage.setItem(this.storageKey, JSON.stringify(notations));
      return notations[index];
    }
    return null;
  }
}

// UI Management class
class NotationUI {
  private readonly storage: NotationStorage;
  private readonly currentEditingId: number | null;

  constructor(storage: NotationStorage) {
    this.storage = storage;
    this.currentEditingId = null;
  }

  init(): void {
    this.renderSavedNotations();
    this.bindEvents();
  }

  bindEvents(): void {
    const saveBtn = document.getElementById('save-notation-btn');
    saveBtn?.addEventListener('click', () => this.showSaveDialog());
  }

  renderSavedNotations(): void {
    const container = document.getElementById('saved-notations-list');
    if (!container) return;
    
    const notations = this.storage.getNotations();

    if (notations.length === 0) {
      container.innerHTML = '<div class="no-notations">No saved notations yet</div>';
      return;
    }

    container.innerHTML = notations.map((notation: SavedNotation) => `
      <div class="notation-item">
        <div class="notation-header">
          <h4 class="notation-title">${this.escapeHtml(notation.name)}</h4>
          <div class="notation-actions">
            <button onclick="notationUI.loadNotation(${notation.id})" class="btn-icon load" title="Load">
              <svg class="icon icon-sm" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </button>
            <button onclick="notationUI.editNotation(${notation.id})" class="btn-icon edit" title="Edit">
              <svg class="icon icon-sm" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
            </button>
            <button onclick="notationUI.deleteNotation(${notation.id})" class="btn-icon delete" title="Delete">
              <svg class="icon icon-sm" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
        <p class="notation-meta">Updated: ${new Date(notation.updatedAt).toLocaleDateString()}</p>
        <div class="notation-content">
          ${this.truncateContent(notation.content)}
        </div>
      </div>
    `).join('');
  }

  truncateContent(content: string, maxLength: number = 100): string {
    const cleanContent = content.replace(/\s+/g, ' ').trim();
    if (cleanContent.length <= maxLength) return this.escapeHtml(cleanContent);
    return this.escapeHtml(cleanContent.substring(0, maxLength)) + '...';
  }

  escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showSaveDialog(): void {
    const notationInput = document.getElementById('notation-input') as HTMLTextAreaElement;
    if (!notationInput) return;
    
    const content = notationInput.value.trim();
    
    if (!content) {
      alert('Please enter some notation content first!');
      return;
    }

    const name = prompt('Enter a name for this notation:', 'My Notation');
    if (name?.trim()) {
      this.storage.saveNotation(name.trim(), content);
      this.renderSavedNotations();
      this.showToast('Notation saved successfully!', 'success');
    }
  }

  loadNotation(id: number): void {
    const notations = this.storage.getNotations();
    const notation = notations.find((n: SavedNotation) => n.id === id);
    if (notation) {
      const notationInput = document.getElementById('notation-input') as HTMLTextAreaElement;
      if (notationInput) {
        notationInput.value = notation.content;
        this.showToast('Notation loaded!', 'info');
      }
    }
  }

  editNotation(id: number): void {
    const notations = this.storage.getNotations();
    const notation = notations.find((n: SavedNotation) => n.id === id);
    if (notation) {
      const newName = prompt('Enter new name:', notation.name);
      if (newName?.trim()) {
        const newContent = prompt('Enter new content:', notation.content);
        if (newContent !== null) {
          this.storage.updateNotation(id, newName.trim(), newContent);
          this.renderSavedNotations();
          this.showToast('Notation updated!', 'success');
        }
      }
    }
  }

  deleteNotation(id: number): void {
    if (confirm('Are you sure you want to delete this notation?')) {
      this.storage.deleteNotation(id);
      this.renderSavedNotations();
      this.showToast('Notation deleted!', 'info');
    }
  }

  showToast(message: string, type: 'info' | 'success' | 'error' = 'info'): void {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Fade out and remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}

//Add type declarations for global objects
declare const MusicConverter: any;

// Music Application Controller
class MusicAppController {
  private converter: any;
  private isTextMode: boolean;
  private readonly notationUI: NotationUI;

  constructor() {
    this.converter = null;
    this.isTextMode = false;
    
    // Initialize storage and UI
    const storage = new NotationStorage();
    this.notationUI = new NotationUI(storage);
  }

  async init(): Promise<void> {
    (window as any).notationUI = this.notationUI; // Make it globally accessible for onclick handlers
    this.notationUI.init();

    // Wait for MusicConverter to load
    await this.waitForMusicConverter();
    
    this.converter = new (window as any).MusicConverter();
    this.bindEventHandlers();
  }

  private async waitForMusicConverter(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkInterval = setInterval(() => {
        if (typeof (window as any).MusicConverter !== 'undefined') {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }

  private bindEventHandlers(): void {
    // Get DOM elements
    const notationInput = document.getElementById('notation-input') as HTMLTextAreaElement;
    const playButton = document.getElementById('play-button');
    const stopButton = document.getElementById('stop-button');
    const exampleButtons = document.querySelectorAll('.example-button');
    const textExampleButtons = document.querySelectorAll('.text-example-button');
    
    // Text-to-music mode controls
    const notationModeBtn = document.getElementById('notation-mode-btn');
    const textModeBtn = document.getElementById('text-mode-btn');
    const textSettings = document.getElementById('text-settings');
    const convertTextBtn = document.getElementById('convert-text-btn');
    
    // Mode switching
    notationModeBtn?.addEventListener('click', () => this.switchToNotationMode(notationModeBtn, textModeBtn, textSettings, convertTextBtn, notationInput));
    textModeBtn?.addEventListener('click', () => this.switchToTextMode(notationModeBtn, textModeBtn, textSettings, convertTextBtn, notationInput));
    
    // Play button with mode awareness
    playButton?.addEventListener('click', () => this.handlePlayButton(notationInput));
    
    // Convert text to notation button
    convertTextBtn?.addEventListener('click', () => this.handleConvertTextButton(notationInput, notationModeBtn, textModeBtn, textSettings, convertTextBtn));
    
    // Stop button
    stopButton?.addEventListener('click', () => this.handleStopButton());
    
    // Example buttons
    exampleButtons.forEach(button => {
      button.addEventListener('click', () => this.handleExampleButton(button as HTMLElement, notationInput, notationModeBtn, textModeBtn, textSettings, convertTextBtn));
    });

    // Text example buttons
    textExampleButtons.forEach(button => {
      button.addEventListener('click', () => this.handleTextExampleButton(button as HTMLElement, notationInput, textModeBtn, notationModeBtn, textSettings, convertTextBtn));
    });
  }

  private switchToNotationMode(
    notationModeBtn: HTMLElement | null,
    textModeBtn: HTMLElement | null,
    textSettings: HTMLElement | null,
    convertTextBtn: HTMLElement | null,
    notationInput: HTMLTextAreaElement | null
  ): void {
    this.isTextMode = false;
    if (notationModeBtn) notationModeBtn.className = 'btn btn-primary';
    if (textModeBtn) textModeBtn.className = 'btn';
    if (textSettings) textSettings.style.display = 'none';
    if (convertTextBtn) convertTextBtn.style.display = 'none';
    if (notationInput) notationInput.placeholder = 'Enter music notation here...';
  }

  private switchToTextMode(
    notationModeBtn: HTMLElement | null,
    textModeBtn: HTMLElement | null,
    textSettings: HTMLElement | null,
    convertTextBtn: HTMLElement | null,
    notationInput: HTMLTextAreaElement | null
  ): void {
    this.isTextMode = true;
    if (textModeBtn) textModeBtn.className = 'btn btn-primary';
    if (notationModeBtn) notationModeBtn.className = 'btn';
    if (textSettings) textSettings.style.display = 'block';
    if (convertTextBtn) convertTextBtn.style.display = 'inline-flex';
    if (notationInput) notationInput.placeholder = 'Enter any text to convert to music...';
  }

  private async handlePlayButton(notationInput: HTMLTextAreaElement | null): Promise<void> {
    if (!notationInput?.value.trim()) return;
    
    try {
      if (this.isTextMode) {
        // Get text-to-music options from UI
        const options = this.getTextToMusicOptions();
        await this.converter.convertToMusic(notationInput.value, options);
      } else {
        await this.converter.convertToMusic(notationInput.value);
      }
    } catch (error) {
      console.error('Error playing music:', error);
      alert('Error playing music. Please check your input.');
    }
  }

  private handleConvertTextButton(
    notationInput: HTMLTextAreaElement | null,
    notationModeBtn: HTMLElement | null,
    textModeBtn: HTMLElement | null,
    textSettings: HTMLElement | null,
    convertTextBtn: HTMLElement | null
  ): void {
    if (!notationInput?.value.trim()) return;
    
    try {
      const options = this.getTextToMusicOptions();
      const notation = this.converter.convertTextToNotation(notationInput.value, options);
      
      // Show the generated notation in a modal or replace input
      if (confirm('Replace current input with generated notation?')) {
        notationInput.value = notation;
        // Switch to notation mode
        this.switchToNotationMode(notationModeBtn, textModeBtn, textSettings, convertTextBtn, notationInput);
      }
    } catch (error) {
      console.error('Error converting text:', error);
      alert('Error converting text to notation. Please try again.');
    }
  }

  private handleStopButton(): void {
    if (this.converter?.audioEngine && typeof this.converter.audioEngine.stop === 'function') {
      this.converter.audioEngine.stop();
    }
  }

  private handleExampleButton(
    button: HTMLElement,
    notationInput: HTMLTextAreaElement | null,
    notationModeBtn: HTMLElement | null,
    textModeBtn: HTMLElement | null,
    textSettings: HTMLElement | null,
    convertTextBtn: HTMLElement | null
  ): void {
    const pattern = button.getAttribute('data-pattern');
    if (pattern && notationInput) {
      notationInput.value = pattern;
      // Ensure we're in notation mode when loading examples
      if (this.isTextMode) {
        this.switchToNotationMode(notationModeBtn, textModeBtn, textSettings, convertTextBtn, notationInput);
      }
    }
  }

  private handleTextExampleButton(
    button: HTMLElement,
    notationInput: HTMLTextAreaElement | null,
    textModeBtn: HTMLElement | null,
    notationModeBtn: HTMLElement | null,
    textSettings: HTMLElement | null,
    convertTextBtn: HTMLElement | null
  ): void {
    const text = button.getAttribute('data-text');
    const style = button.getAttribute('data-style') || 'melodic';
    const scale = button.getAttribute('data-scale') || 'major';
    
    if (text && notationInput) {
      notationInput.value = text;
      
      // Switch to text mode and set appropriate settings
      this.switchToTextMode(notationModeBtn, textModeBtn, textSettings, convertTextBtn, notationInput);
      
      // Set the settings from the example
      const styleSelect = document.getElementById('style-select') as HTMLSelectElement;
      const scaleSelect = document.getElementById('scale-select') as HTMLSelectElement;
      if (styleSelect) styleSelect.value = style;
      if (scaleSelect) scaleSelect.value = scale;
    }
  }

  private getTextToMusicOptions(): TextToMusicOptions {
    const styleSelect = document.getElementById('style-select') as HTMLSelectElement;
    const scaleSelect = document.getElementById('scale-select') as HTMLSelectElement;
    const tempoInput = document.getElementById('tempo-input') as HTMLInputElement;
    const octaveInput = document.getElementById('octave-input') as HTMLInputElement;

    return {
      style: styleSelect ? styleSelect.value : 'melodic',
      scale: scaleSelect ? scaleSelect.value : 'major',
      tempo: tempoInput ? parseInt(tempoInput.value) : 120,
      baseOctave: octaveInput ? parseInt(octaveInput.value) : 4
    };
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const app = new MusicAppController();
  await app.init();
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    NotationStorage,
    NotationUI,
    MusicAppController
  };
}
