// Main app types
export interface SavedNotation {
  id: number;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Toast {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error';
}

// Text to music options
export interface TextToMusicOptions {
  style: string;
  scale: string;
  tempo: number;
  baseOctave: number;
  useLangChain?: boolean;
  mood?: string;
  complexity?: string;
  langChainOptions?: {
    apiKey?: string;
    model?: string;
    provider?: string;
  };
}

// Example data structures
export interface ExampleData {
  title: string;
  description: string;
  pattern: string;
}

export interface TextExampleData {
  title: string;
  description: string;
  text: string;
  style: string;
  scale: string;
}

// Component props types
export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  savedNotations: SavedNotation[];
  onLoadNotation: (notation: SavedNotation) => void;
  onDeleteNotation: (id: number) => void;
  onSaveNotation: (name: string) => void;
  onLoadExample: (pattern: string) => void;
  onLoadTextExample: (text: string, options: Partial<TextToMusicOptions>) => void;
}

export interface HeaderProps {
  tempo: number;
  onTempoChange: (tempo: number) => void;
  onToggleSidebar: () => void;
}

export interface EditorSectionProps {
  notation: string;
  onNotationChange: (notation: string) => void;
  isTextMode: boolean;
  onToggleMode: (isTextMode: boolean) => void;
  textSettings: Partial<TextToMusicOptions>;
  onTextSettingsChange: (settings: Partial<TextToMusicOptions>) => void;
  langchainSettings: {
    provider: string;
    model: string;
    openaiKey: string;
    geminiKey: string;
  };
  onLangchainSettingsChange: (settings: any) => void;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
  onConvertText: () => void;
  onDownload: () => void;
}

export interface ToastContainerProps {
  toasts: Toast[];
  onRemoveToast: (id: number) => void;
}