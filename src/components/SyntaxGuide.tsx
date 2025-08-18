import React from 'react';

const SyntaxGuide: React.FC = () => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 m-4 sm:m-6 mt-0">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Notation Syntax Guide:</h2>
      <div className="bg-white border border-gray-200 rounded-md p-3 sm:p-4 overflow-x-auto">
        <pre className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-mono">
{`instrument:note1.duration,note2.duration|nextMeasure;
nextInstrument:note1.duration;

Format:
- Instruments separated by semicolons (;)
- Measures separated by pipes (|)
- Notes separated by commas (,)
- Chords created by joining notes with plus (+)
- Note format: pitchOctave.duration (e.g., C4.1)
- Drum sounds: k (kick), s (snare), h (hi-hat), c (crash), t (tom), d (generic)
- Instruments: piano, bass, drums, synth, lead, brass, strings, violin, choir, etc.

Examples:
piano:C4.1+E4.1+G4.1|F4.1+A4.1+C5.1;  // C chord then F chord
bass:C2.2|G2.2;                        // Bass line
drums:k.0.5,s.0.5,k.0.5,s.0.5;         // Basic drum pattern`}
        </pre>
      </div>
    </div>
  );
};

export default SyntaxGuide;