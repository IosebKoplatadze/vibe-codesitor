// Core types for the music editor application

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

export interface ToastContainerProps {
  toasts: Toast[];
  onRemoveToast: (id: number) => void;
}

// Re-export from textToMusic for backward compatibility
export type { TextToMusicOptions } from './textToMusic';

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

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  savedNotations: SavedNotation[];
  onLoadNotation: (notation: SavedNotation) => void;
  onDeleteNotation: (id: number) => void;
  onSaveNotation: (name: string) => void;
  onLoadExample: (example: ExampleData) => void;
  onLoadTextExample: (example: TextExampleData) => void;
}

export interface EditorSectionProps {
  notation: string;
  onNotationChange: (notation: string) => void;
  isTextMode: boolean;
  onToggleMode: (isTextMode: boolean) => void;
  textSettings: any;
  onTextSettingsChange: (settings: any) => void;
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