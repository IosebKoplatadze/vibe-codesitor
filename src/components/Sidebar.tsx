import React, { useState } from 'react';
import { SidebarProps, ExampleData, TextExampleData } from '../types';

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  savedNotations,
  onLoadNotation,
  onDeleteNotation,
  onSaveNotation,
  onLoadExample,
  onLoadTextExample,
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'examples' | 'text-examples'>('saved');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveName, setSaveName] = useState('');

  // Example data
  const examples: ExampleData[] = [
    {
      title: "Georgian Folk Song",
      description: "Traditional Sakartvelo melody",
      pattern: `// Main Georgian-inspired melody (violin/duduk sound)
violin:,,D5.0.5,E5.0.5|F5.1.5,E5.0.5,D5.1,A4.1|C5.1.5,D5.0.5,C5.1,A4.1|
G4.1.5,A4.0.5,Bb4.1,C5.1|D5.2,A4.2|F5.1.5,E5.0.5,D5.1,E5.1|F5.1,G5.0.5,F5.0.5,E5.1,D5.1|
C5.1.5,D5.0.5,C5.1,A4.1|G4.1.5,A4.0.5,Bb4.1,G4.1|A4.3,A4.0.5,Bb4.0.5|
C5.1,D5.1,C5.1,A4.1|G4.1.5,A4.0.5,Bb4.1,C5.1|D5.2,F5.0.5,E5.0.5,D5.0.5,C5.0.5|
D5.1.5,C5.0.5,A4.1,G4.1|A4.3,,;

// Panduri/chonguri accompaniment (plucked string sound)
panduri:D4.0.25,A4.0.25,D5.0.25,A4.0.25,D4.0.25,A4.0.25,D5.0.25,A4.0.25|
D4.0.25,A4.0.25,D5.0.25,A4.0.25,D4.0.25,A4.0.25,D5.0.25,A4.0.25|
F4.0.25,A4.0.25,C5.0.25,A4.0.25,F4.0.25,A4.0.25,C5.0.25,A4.0.25|
G4.0.25,Bb4.0.25,D5.0.25,Bb4.0.25,G4.0.25,Bb4.0.25,D5.0.25,Bb4.0.25|
D4.0.25,A4.0.25,D5.0.25,A4.0.25,D4.0.25,A4.0.25,D5.0.25,A4.0.25;

// Bass drone (traditional bass sound)
bass:D3.4|D3.4|F3.2,F3.2|G3.2,G3.2|D3.4|D3.4|F3.2,F3.2|F3.2,F3.2|
G3.2,G3.2|A3.2,A3.2|F3.2,F3.2|G3.2,G3.2|D3.2,D3.2|G3.2,G3.2|A3.4;

// Percussion (frame drum/doli)
drums:,,d.0.5,d.0.5|d.1,d.0.5,d.0.5,d.1,d.0.5,d.0.5|d.1,d.0.5,d.0.5,d.1,d.0.5,d.0.5;`
    },
    {
      title: "Beethoven's 5th",
      description: "Classical symphony opening",
      pattern: `// Beethoven's Fifth Symphony opening motif
piano:G4.0.5,G4.0.5,G4.0.5,Eb4.2|F4.0.5,F4.0.5,F4.0.5,D4.2;
strings:G3.0.5,G3.0.5,G3.0.5,Eb3.2|F3.0.5,F3.0.5,F3.0.5,D3.2;`
    },
    {
      title: "Jazz Progression",
      description: "II-V-I chord progression",
      pattern: `// Classic jazz ii-V-I progression
piano:D4.1+F4.1+A4.1+C5.1|G3.1+B3.1+D4.1+F4.1|C4.1+E4.1+G4.1+B4.1;
bass:D2.1|G2.1|C3.1;
drums:k.0.5,h.0.5,s.0.5,h.0.5|k.0.5,h.0.5,s.0.5,h.0.5|k.0.5,h.0.5,s.0.5,h.0.5;`
    },
    {
      title: "Ambient Pad",
      description: "Atmospheric soundscape",
      pattern: `// Ambient atmospheric pad
synth:C3.4+E3.4+G3.4+B3.4|D3.4+F#3.4+A3.4+C4.4|E3.4+G#3.4+B3.4+D4.4;
choir:C4.8+E4.8+G4.8|D4.8+F#4.8+A4.8|E4.8+G#4.8+B4.8;`
    }
  ];

  const textExamples: TextExampleData[] = [
    {
      title: "Happy Birthday",
      description: "Simple celebratory melody",
      text: "Happy birthday to you!",
      style: "melodic",
      scale: "major"
    },
    {
      title: "Raindrops",
      description: "Gentle ambient piece",
      text: "Soft raindrops falling gently on the window",
      style: "ambient",
      scale: "pentatonic"
    },
    {
      title: "Thunder Storm",
      description: "Dramatic atmospheric piece",
      text: "Dark storm clouds with lightning and thunder",
      style: "ambient",
      scale: "minor"
    },
    {
      title: "Motivational",
      description: "Upbeat rhythmic major",
      text: "Dance like nobody's watching!",
      style: "rhythmic",
      scale: "major"
    },
    {
      title: "Epic Journey",
      description: "Cinematic orchestral composition",
      text: "Create a triumphant melody that builds to an epic crescendo, like a hero's journey reaching its victorious conclusion.",
      style: "harmonic",
      scale: "major"
    },
    {
      title: "Moonlit Lullaby",
      description: "Ethereal ambient soundscape",
      text: "Compose a gentle lullaby that flows like a peaceful river under moonlight, soft and dreamy.",
      style: "ambient",
      scale: "pentatonic"
    }
  ];

  const handleSave = () => {
    if (saveName.trim()) {
      onSaveNotation(saveName.trim());
      setSaveName('');
      setShowSaveDialog(false);
    }
  };

  return (
    <div className={`fixed lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 w-80 lg:w-80 bg-white border-r border-gray-200 shadow-sm flex flex-col h-full`}>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-blue-50">
        <h2 className="text-lg font-semibold text-gray-800">Library</h2>
        <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      {/* Save Button Section */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 hidden lg:block">Library</h2>
        <button 
          onClick={() => setShowSaveDialog(true)}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm cursor-pointer border-0 transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600 touch-manipulation"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Save Current Notation
        </button>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('saved')}
          className={`flex-1 min-w-0 py-3 px-2 border-0 bg-transparent font-medium text-sm cursor-pointer transition-all duration-200 border-b-2 border-transparent hover:bg-blue-50 hover:text-blue-500 touch-manipulation ${
            activeTab === 'saved' ? 'text-blue-500 border-b-blue-500 bg-white' : 'text-gray-500'
          }`}
        >
          Saved
        </button>
        <button 
          onClick={() => setActiveTab('examples')}
          className={`flex-1 min-w-0 py-3 px-2 border-0 bg-transparent font-medium text-sm cursor-pointer transition-all duration-200 border-b-2 border-transparent hover:bg-blue-50 hover:text-blue-500 touch-manipulation ${
            activeTab === 'examples' ? 'text-blue-500 border-b-blue-500 bg-white' : 'text-gray-500'
          }`}
        >
          Examples
        </button>
        <button 
          onClick={() => setActiveTab('text-examples')}
          className={`flex-1 min-w-0 py-3 px-1 border-0 bg-transparent font-medium text-xs lg:text-sm cursor-pointer transition-all duration-200 border-b-2 border-transparent hover:bg-blue-50 hover:text-blue-500 touch-manipulation ${
            activeTab === 'text-examples' ? 'text-blue-500 border-b-blue-500 bg-white' : 'text-gray-500'
          }`}
        >
          Text Examples
        </button>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Saved Notations Tab */}
        {activeTab === 'saved' && (
          <div>
            {savedNotations.length === 0 ? (
              <div className="text-gray-500 text-sm text-center py-8 px-4">No saved notations yet</div>
            ) : (
              <div className="flex flex-col gap-3">
                {savedNotations.map((notation) => (
                  <div key={notation.id} className="bg-gray-50 border border-gray-200 rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 text-sm truncate">{notation.name}</h4>
                      <button
                        onClick={() => onDeleteNotation(notation.id)}
                        className="text-red-500 hover:text-red-700 text-xs p-1"
                      >
                        ×
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      {new Date(notation.createdAt).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => onLoadNotation(notation)}
                      className="w-full text-left text-xs text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                    >
                      Load
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Examples Tab */}
        {activeTab === 'examples' && (
          <div className="flex flex-col gap-3">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => onLoadExample(example.pattern)}
                className="bg-gray-50 border border-gray-200 rounded-md p-4 cursor-pointer transition-all duration-200 text-left hover:bg-gray-100 hover:border-blue-500 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="font-semibold text-gray-800 text-sm mb-1">{example.title}</div>
                <div className="text-xs text-gray-500 leading-tight">{example.description}</div>
              </button>
            ))}
          </div>
        )}

        {/* Text Examples Tab */}
        {activeTab === 'text-examples' && (
          <div className="flex flex-col gap-3">
            {textExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => onLoadTextExample(example.text, { style: example.style, scale: example.scale })}
                className={`border rounded-md p-4 cursor-pointer transition-all duration-200 text-left hover:-translate-y-0.5 hover:shadow-md ${
                  index >= 4 // AI-optimized examples
                    ? 'bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-400'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-blue-500'
                }`}
              >
                <div className={`font-semibold text-sm mb-1 ${
                  index >= 4 ? 'text-blue-800' : 'text-gray-800'
                }`}>
                  {example.title}
                </div>
                <div className={`text-xs leading-tight ${
                  index >= 4 ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {example.description}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 mx-4">
            <h3 className="text-lg font-semibold mb-4">Save Notation</h3>
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Enter notation name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;