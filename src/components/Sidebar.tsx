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
      title: "Symphonic Orchestra",
      description: "Full orchestral arrangement with winds, strings, brass, and timpani",
      pattern: `// Strings section
violin:C5.2+E5.2+G5.2|D5.2+F5.2+A5.2|E5.2+G5.2+B5.2|C5.4+E5.4+G5.4;
viola:G4.2+C5.2+E5.2|A4.2+D5.2+F5.2|B4.2+E5.2+G5.2|G4.4+C5.4+E5.4;
cello:C3.2+G3.2|D3.2+A3.2|E3.2+B3.2|C3.4+G3.4;
double_bass:C2.4|D2.4|E2.4|C2.4;

// Woodwinds section
flute:G5.1,A5.1,B5.1,C6.1|D6.2,C6.1,B5.1|A5.2,G5.2|E5.4;
clarinet:E4.2+G4.2|F4.2+A4.2|G4.2+B4.2|E4.4+G4.4;
bassoon:G2.4|A2.4|B2.4|G2.4;

// Brass section
trumpet:C5.2,D5.2|E5.2,F5.2|G5.2,A5.2|G5.4;
trombone:C4.4|D4.4|E4.4|C4.4;
french_horn:E4.2+G4.2|F4.2+A4.2|G4.2+B4.2|E4.4+G4.4;

// Percussion
timpani:C3.4|D3.4|E3.4|C3.4;`
    },
    {
      title: "Electronic Dance",
      description: "Modern EDM with synthesizers and comprehensive drum kit",
      pattern: `// Lead synth melody
lead:C5.0.5,D5.0.5,E5.0.5,F5.0.5|G5.1,F5.0.5,E5.0.5|D5.1,C5.1|C5.2;

// Pad harmony
pad:C4.4+E4.4+G4.4|F4.4+A4.4+C5.4|G4.4+B4.4+D5.4|C4.4+E4.4+G4.4;

// Bass line
bass:C2.1,C2.1,G2.1,C2.1|F2.1,F2.1,C3.1,F2.1|G2.1,G2.1,D3.1,G2.1|C2.2,G2.2;

// Comprehensive drum pattern
drums:k.0.5,h.0.25,h.0.25,s.0.5,h.0.25,h.0.25,k.0.25,k.0.25,h.0.25,h.0.25,s.0.5,h.0.25,h.0.25|
k.0.5,h.0.25,h.0.25,s.0.5,h.0.25,h.0.25,k.0.25,k.0.25,h.0.25,h.0.25,s.0.5,c.0.5|
k.0.5,h.0.25,h.0.25,s.0.5,h.0.25,h.0.25,k.0.25,k.0.25,h.0.25,h.0.25,s.0.5,h.0.25,h.0.25|
k.0.5,r.0.25,h.0.25,s.0.5,sp.0.5,k.0.5,ch.1;`
    },
    {
      title: "World Fusion",
      description: "Multi-cultural instruments from different traditions",
      pattern: `// Indian classical
sitar:C4.1~0.02,D4.0.5,E4.1~0.02,F4.0.5|G4.2~0.03,F4.1,E4.1|D4.1~0.02,C4.2;
tabla:ta.0.5,ta.0.25,ta.0.25,ta.0.5,ta.0.25,ta.0.25|ta.0.5,ta.0.25,ta.0.25,ta.1;

// Middle Eastern
oud:E4.1,F4.0.5,G4.1,A4.0.5|Bb4.2,A4.1,G4.1|F4.1,E4.2;
duduk:G4.2,A4.1,Bb4.1|A4.2,G4.2|F4.4;

// African
djembe:djembe.0.5,djembe.0.25,djembe.0.25,djembe.0.5,djembe.0.5|djembe.1,djembe.0.5,djembe.0.5;
kalimba:C5.1,E5.0.5,G5.1,C5.0.5|E5.1,G5.0.5,C6.1,G5.0.5;

// Asian
hang_drum:C4.2,E4.1,G4.1|C5.2,G4.2|E4.2,C4.2;`
    },
    {
      title: "Jazz Big Band",
      description: "Classic big band arrangement with brass, woodwinds, and rhythm section",
      pattern: `// Saxophone section
alto_sax:F4.1+A4.1+C5.1|Bb3.1+D4.1+F4.1|C4.1+E4.1+G4.1|F4.2+A4.2+C5.2;
tenor_sax:C4.1+F4.1+A4.1|F3.1+Bb3.1+D4.1|G3.1+C4.1+E4.1|C4.2+F4.2+A4.2;
baritone_sax:F3.2|Bb2.2|C3.2|F3.2;

// Trumpet section
trumpet:A4.1,Bb4.0.5,A4.0.5|G4.1,F4.1|E4.1,F4.1|A4.2;
cornet:F4.1,G4.0.5,F4.0.5|E4.1,D4.1|C4.1,D4.1|F4.2;

// Trombone section
trombone:F3.2|Bb2.2|C3.2|F3.2;
euphonium:C3.1+F3.1|Bb2.1+D3.1|C3.1+E3.1|C3.2+F3.2;

// Rhythm section
electric_guitar:F4.0.25+A4.0.25+C5.0.25,F4.0.25+A4.0.25+C5.0.25,F4.0.25+A4.0.25+C5.0.25,F4.0.25+A4.0.25+C5.0.25|
Bb3.0.25+D4.0.25+F4.0.25,Bb3.0.25+D4.0.25+F4.0.25,Bb3.0.25+D4.0.25+F4.0.25,Bb3.0.25+D4.0.25+F4.0.25;
electric_piano:F4.1+A4.1+C5.1|Bb3.1+D4.1+F4.1|C4.1+E4.1+G4.1|F4.2+A4.2+C5.2;
bass:F2.1,A2.0.5,C3.0.5|Bb2.1,D3.0.5,F3.0.5|C3.1,E3.0.5,G3.0.5|F2.2;

// Swing drums
drums:k.1,h.0.33,h.0.33,h.0.33,s.1|k.0.5,h.0.5,s.1,h.0.5,h.0.5;`
    },
    {
      title: "Ambient Soundscape",
      description: "Ethereal atmosphere with unique instruments",
      pattern: `// Atmospheric layers
warm_pad:C3.8+E3.8+G3.8+B3.8|D3.8+F#3.8+A3.8+C4.8|E3.8+G#3.8+B3.8+D4.8;
bright_pad:E4.8+G4.8+B4.8|F#4.8+A4.8+C5.8|G#4.8+B4.8+D5.8;

// Unique textures
theremin:G4.4~0.1,A4.2~0.15,B4.2~0.1|C5.4~0.2,B4.4~0.15;
glass_harmonica:E5.2,G5.2,B5.2,D6.2|C6.4,B5.4|A5.8;

// Celestial percussion
vibraphone:C5.2,E5.2,G5.2,B5.2|D5.4,F#5.4|E5.8;
triangle:tri.4|tri.4|tri.8;
wind_chimes:ws.8;

// Vocal textures
choir:C4.8+E4.8+G4.8|D4.8+F#4.8+A4.8|E4.8+G#4.8+B4.8;`
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
      title: "Percussion Showcase",
      description: "Comprehensive demonstration of percussion instruments",
      pattern: `// World percussion ensemble
drums:k.1,s.0.5,h.0.25,h.0.25|t.0.5,f.0.5,r.1|cb.0.5,wb.0.25,wb.0.25,cl.1|
ta.0.5,ta.0.25,ta.0.25,bongo.0.5,conga.0.5|djembe.1,cai.0.5,ti.0.5|
uk.2|tim.1,gong.3|tri.2,tam.1,vib.1|sha.0.25,sha.0.25,ma.0.25,ma.0.25,ca.1|
ws.4|ra.2,wh.0.5,808.0.5,elec.1|rev.2,gat.2;

// Mallet percussion
xylophone:C5.0.5,D5.0.5,E5.0.5,F5.0.5,G5.0.5,A5.0.5,B5.0.5,C6.0.5|
G5.1,E5.1,C5.2;
marimba:C4.1,E4.1,G4.1,C5.1|G4.2,E4.2|C4.4;
vibraphone:E4.2,G4.2,B4.2,D5.2|C5.4,A4.4;
glockenspiel:C6.1,E6.0.5,G6.0.5,C7.2;`
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
    },
    {
      title: "Arabian Nights",
      description: "Middle Eastern fusion with exotic instruments",
      text: "Create a mystical composition that evokes the magic of ancient Arabian tales with oud, duduk, and tabla rhythms.",
      style: "harmonic",
      scale: "minor"
    },
    {
      title: "Digital Future",
      description: "Electronic cyberpunk atmosphere",
      text: "Compose a futuristic electronic piece with synthesizers, pads, and electronic drums that sounds like flying through a neon city.",
      style: "rhythmic",
      scale: "chromatic"
    },
    {
      title: "Forest Awakening",
      description: "Nature-inspired orchestral piece",
      text: "Create a piece that captures the morning awakening in an ancient forest, with birds singing, wind through trees, and flowing streams.",
      style: "ambient",
      scale: "major"
    },
    {
      title: "Jazz Café Evening",
      description: "Sophisticated jazz arrangement",
      text: "Compose a smooth jazz piece perfect for a dimly lit café, featuring saxophone, trumpet, piano, and brushed drums.",
      style: "harmonic",
      scale: "minor"
    },
    {
      title: "Viking Battle",
      description: "Epic orchestral battle music",
      text: "Create a powerful orchestral piece with thunderous timpani, bold brass, and driving strings that captures the fury of ancient Viking warriors in battle.",
      style: "harmonic",
      scale: "minor"
    },
    {
      title: "Zen Garden",
      description: "Meditative Asian-inspired piece",
      text: "Compose a peaceful meditation piece with hang drums, kalimba, flute, and subtle percussion that evokes tranquil Japanese gardens.",
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