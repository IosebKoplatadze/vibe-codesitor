import React, { useState, useCallback, useRef } from 'react';
import MusicConverter from '../index';
import { MusicParser } from '../parser';
import Sidebar from './Sidebar';
import Header from './Header';
import EditorSection from './EditorSection';
import SyntaxGuide from './SyntaxGuide';
import ToastContainer from './ToastContainer';
import { SavedNotation, Toast } from '../types';

const MusicEditorApp: React.FC = () => {
  // State management
  const [notation, setNotation] = useState('');
  const [tempo, setTempo] = useState(120);
  const [isTextMode, setIsTextMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [savedNotations, setSavedNotations] = useState<SavedNotation[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // LangChain settings
  const [langchainSettings, setLangchainSettings] = useState({
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    openaiKey: '',
    geminiKey: '',
  });

  // Refs for business logic
  const musicConverterRef = useRef(new MusicConverter());

  // Initialize saved notations from localStorage
  React.useEffect(() => {
    const stored = localStorage.getItem('musicNotations');
    if (stored) {
      setSavedNotations(JSON.parse(stored));
    }
  }, []);

  // Toast management
  const showToast = useCallback((message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const toast: Toast = {
      id: Date.now(),
      message,
      type,
    };
    setToasts(prev => [...prev, toast]);

    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toast.id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Music playback handlers
  const handlePlay = useCallback(async () => {
    if (!notation.trim()) {
      showToast('Please enter some notation or text first', 'error');
      return;
    }

    setIsPlaying(true);
    try {
      const options = {
        useLangChain: true,
        langChainOptions: {
          apiKey: langchainSettings.provider === 'openai' ? langchainSettings.openaiKey : langchainSettings.geminiKey,
          model: langchainSettings.model,
          provider: langchainSettings.provider,
        }
      };

      await musicConverterRef.current.convertToMusic(notation, options);
      showToast('Music started playing', 'success');
    } catch (error) {
      console.error('Error playing music:', error);
      showToast('Error playing music. Please check your notation.', 'error');
    } finally {
      setIsPlaying(false);
    }
  }, [notation, langchainSettings, showToast]);

  const handleStop = useCallback(() => {
    if (musicConverterRef.current.audioEngine) {
      musicConverterRef.current.audioEngine.stop();
    }
    setIsPlaying(false);
    showToast('Music stopped', 'info');
  }, [showToast]);

  // Text to notation conversion
  const handleConvertText = useCallback(async () => {
    if (!notation.trim()) {
      showToast('Please enter some text to convert', 'error');
      return;
    }

    try {
      const options = {
        useLangChain: true,
        langChainOptions: {
          apiKey: langchainSettings.provider === 'openai' ? langchainSettings.openaiKey : langchainSettings.geminiKey,
          model: langchainSettings.model,
          provider: langchainSettings.provider,
        }
      };

      const convertedNotation = await musicConverterRef.current.convertTextToNotation(notation, options);
      setNotation(convertedNotation);
      setIsTextMode(false);
      showToast('Text converted to notation successfully', 'success');
    } catch (error) {
      console.error('Error converting text:', error);
      if ((error as Error).message?.includes('API key')) {
        showToast('API key is required for AI-powered generation. Please enter your API key in the settings.', 'error');
      } else {
        showToast('Error converting text to notation. Please try again.', 'error');
      }
    }
  }, [notation, langchainSettings, showToast]);

  // MIDI download
  const handleDownload = useCallback(async () => {
    if (!notation.trim()) {
      showToast('Please enter some notation first', 'error');
      return;
    }

    try {
      // Import the MidiWriter dynamically since it's a UMD module
      const MidiWriter = await import('midi-writer-js');
      const parser = new MusicParser();
      const musicData = parser.parse(notation);

      const track = new (MidiWriter as any).Track();
      
      musicData.tracks.forEach(trackData => {
        trackData.notes.forEach((note, index) => {
          track.addEvent(
            new (MidiWriter as any).NoteEvent({
              pitch: [`${note.pitch}${note.octave}`],
              duration: `${Math.round(note.duration * 4)}`, // Convert to MIDI ticks
            })
          );
        });
      });

      const write = new (MidiWriter as any).Writer(track);
      const dataUri = write.dataUri();
      
      const link = document.createElement('a');
      link.href = dataUri;
      link.download = 'music-notation.mid';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showToast('MIDI file downloaded successfully', 'success');
    } catch (error) {
      console.error('Error downloading MIDI:', error);
      showToast('Error downloading MIDI file', 'error');
    }
  }, [notation, showToast]);

  // Notation management
  const handleSaveNotation = useCallback((name: string) => {
    if (!notation.trim()) {
      showToast('Please enter some notation to save', 'error');
      return;
    }

    const newNotation: SavedNotation = {
      id: Date.now(),
      name,
      content: notation,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedNotations = [...savedNotations, newNotation];
    setSavedNotations(updatedNotations);
    localStorage.setItem('musicNotations', JSON.stringify(updatedNotations));
    
    showToast(`Notation "${name}" saved successfully`, 'success');
  }, [notation, savedNotations, showToast]);

  const handleLoadNotation = useCallback((savedNotation: SavedNotation) => {
    setNotation(savedNotation.content);
    setIsTextMode(false);
    setSidebarOpen(false);
    showToast(`Loaded "${savedNotation.name}"`, 'success');
  }, [showToast]);

  const handleDeleteNotation = useCallback((id: number) => {
    const updatedNotations = savedNotations.filter(n => n.id !== id);
    setSavedNotations(updatedNotations);
    localStorage.setItem('musicNotations', JSON.stringify(updatedNotations));
    showToast('Notation deleted', 'info');
  }, [savedNotations, showToast]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        savedNotations={savedNotations}
        onLoadNotation={handleLoadNotation}
        onDeleteNotation={handleDeleteNotation}
        onSaveNotation={handleSaveNotation}
        onLoadExample={(exampleNotation) => {
          setNotation(exampleNotation);
          setIsTextMode(false);
          setSidebarOpen(false);
        }}
        onLoadTextExample={(text, options) => {
          setNotation(text);
          setIsTextMode(true);
          setSidebarOpen(false);
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white min-w-0 overflow-y-auto">
        {/* Header */}
        <Header
          tempo={tempo}
          onTempoChange={setTempo}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Editor Section */}
        <EditorSection
          notation={notation}
          onNotationChange={setNotation}
          isTextMode={isTextMode}
          onToggleMode={setIsTextMode}
          langchainSettings={langchainSettings}
          onLangchainSettingsChange={setLangchainSettings}
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onStop={handleStop}
          onConvertText={handleConvertText}
          onDownload={handleDownload}
        />

        {/* Syntax Guide */}
        <SyntaxGuide />
      </div>

      {/* Toast Container */}
      <ToastContainer
        toasts={toasts}
        onRemoveToast={removeToast}
      />
    </div>
  );
};

export default MusicEditorApp;