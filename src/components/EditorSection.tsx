import React from 'react';
import { EditorSectionProps } from '../types';
import TextSettings from './TextSettings';

const EditorSection: React.FC<EditorSectionProps> = ({
  notation,
  onNotationChange,
  isTextMode,
  onToggleMode,
  textSettings,
  onTextSettingsChange,
  langchainSettings,
  onLangchainSettingsChange,
  isPlaying,
  onPlay,
  onStop,
  onConvertText,
  onDownload,
}) => {
  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto">
      {/* Input Mode Toggle */}
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => onToggleMode(false)}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-sm font-medium focus:ring-2 focus:ring-offset-2 touch-manipulation ${
            !isTextMode 
              ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500'
          }`}
        >
          Notation Mode
        </button>
        <button 
          onClick={() => onToggleMode(true)}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-sm font-medium focus:ring-2 focus:ring-offset-2 touch-manipulation ${
            isTextMode 
              ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500'
          }`}
        >
          Text Mode
        </button>
      </div>

      {/* Text Settings */}
      {isTextMode && (
        <TextSettings
          textSettings={textSettings}
          onTextSettingsChange={onTextSettingsChange}
          langchainSettings={langchainSettings}
          onLangchainSettingsChange={onLangchainSettingsChange}
        />
      )}

      {/* Textarea */}
      <div className="mb-4">
        <label htmlFor="notation-input" className="block text-sm font-medium text-gray-700 mb-2">
          Music Notation or Text Description:
        </label>
        <textarea 
          id="notation-input"
          value={notation}
          onChange={(e) => onNotationChange(e.target.value)}
          placeholder="Enter music notation (e.g., 'piano:C4.1,E4.1,G4.1;') or describe your music in plain text..."
          className="w-full h-32 sm:h-40 px-4 py-3 border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-mono text-sm leading-relaxed bg-gray-50 touch-manipulation"
        />
      </div>
      
      {/* Control Buttons */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 mb-6">
        <button 
          onClick={onPlay}
          disabled={isPlaying}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-md font-medium cursor-pointer border-0 transition-all duration-200 bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M8 5v10l8-5z"/>
          </svg>
          {isPlaying ? 'Playing...' : 'Play'}
        </button>
        
        <button 
          onClick={onStop}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-md font-medium cursor-pointer border-0 transition-all duration-200 bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 touch-manipulation"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <rect x="6" y="6" width="8" height="8"/>
          </svg>
          Stop
        </button>
        
        {isTextMode && (
          <button 
            onClick={onConvertText}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-md font-medium cursor-pointer border-0 transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-manipulation"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 11-8 0v3h8v-3z"/>
            </svg>
            <span className="hidden sm:inline">Convert Text to Music</span>
            <span className="sm:hidden">Convert</span>
          </button>
        )}
        
        <button 
          onClick={onDownload}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-md font-medium cursor-pointer border-0 transition-all duration-200 bg-purple-500 text-white hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 touch-manipulation"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/>
          </svg>
          <span className="hidden sm:inline">Download MIDI</span>
          <span className="sm:hidden">Download</span>
        </button>
      </div>
    </div>
  );
};

export default EditorSection;