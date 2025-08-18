import React from 'react';
import { TextToMusicOptions } from '../types';

interface TextSettingsProps {
  textSettings: Partial<TextToMusicOptions>;
  onTextSettingsChange: (settings: Partial<TextToMusicOptions>) => void;
  langchainSettings: {
    provider: string;
    model: string;
    openaiKey: string;
    geminiKey: string;
  };
  onLangchainSettingsChange: (settings: any) => void;
}

const TextSettings: React.FC<TextSettingsProps> = ({
  textSettings,
  onTextSettingsChange,
  langchainSettings,
  onLangchainSettingsChange,
}) => {
  const handleLangChainToggle = (enabled: boolean) => {
    onTextSettingsChange({ ...textSettings, useLangChain: enabled });
  };

  const updateLangchainSetting = (key: string, value: string) => {
    const newSettings = { ...langchainSettings, [key]: value };
    onLangchainSettingsChange(newSettings);
    
    // Store in localStorage for persistence
    localStorage.setItem('selectedProvider', newSettings.provider);
    localStorage.setItem('selectedModel', newSettings.model);
    
    if (key === 'openaiKey') {
      localStorage.setItem('openai_api_key', value);
    } else if (key === 'geminiKey') {
      localStorage.setItem('gemini_api_key', value);
    }
  };

  const filterModelsByProvider = (provider: string) => {
    const models = {
      openai: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4o', 'gpt-4o-mini'],
      gemini: ['gemini-pro', 'gemini-1.5-pro', 'gemini-1.5-flash'],
    };
    return models[provider as keyof typeof models] || [];
  };

  React.useEffect(() => {
    // Load saved preferences
    const savedProvider = localStorage.getItem('selectedProvider') || 'openai';
    const savedModel = localStorage.getItem('selectedModel') || 'gpt-3.5-turbo';
    const savedOpenaiKey = localStorage.getItem('openai_api_key') || '';
    const savedGeminiKey = localStorage.getItem('gemini_api_key') || '';
    
    onLangchainSettingsChange({
      provider: savedProvider,
      model: savedModel,
      openaiKey: savedOpenaiKey,
      geminiKey: savedGeminiKey,
    });
  }, [onLangchainSettingsChange]);

  return (
    <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Text-to-Music Settings:</h3>
      
      {/* AI Toggle */}
      <div className="mb-4 p-3 bg-white border border-blue-200 rounded-md">
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={textSettings.useLangChain || false}
              onChange={(e) => handleLangChainToggle(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-800">🤖 AI-Powered Generation</span>
          </label>
          <span className="text-xs text-gray-500">
            {textSettings.useLangChain ? 'AI-powered' : 'Rule-based'}
          </span>
        </div>
        <div className="text-xs text-gray-600">Use AI to create more sophisticated music from your text prompts</div>
      </div>

      {/* AI Settings Panel */}
      {textSettings.useLangChain && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">AI Provider:</label>
              <select 
                value={langchainSettings.provider}
                onChange={(e) => updateLangchainSetting('provider', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              >
                <option value="openai">OpenAI</option>
                <option value="gemini">Google Gemini</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Model:</label>
              <select 
                value={langchainSettings.model}
                onChange={(e) => updateLangchainSetting('model', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              >
                {filterModelsByProvider(langchainSettings.provider).map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* API Key Inputs */}
          {langchainSettings.provider === 'openai' && (
            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">OpenAI API Key:</label>
              <input
                type="password"
                value={langchainSettings.openaiKey}
                onChange={(e) => updateLangchainSetting('openaiKey', e.target.value)}
                placeholder="Enter your OpenAI API key"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
          )}
          
          {langchainSettings.provider === 'gemini' && (
            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Gemini API Key:</label>
              <input
                type="password"
                value={langchainSettings.geminiKey}
                onChange={(e) => updateLangchainSetting('geminiKey', e.target.value)}
                placeholder="Enter your Gemini API key"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
          )}
        </div>
      )}

      {/* Basic Settings */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Mood:</label>
          <select 
            value={textSettings.mood || 'balanced'}
            onChange={(e) => onTextSettingsChange({ ...textSettings, mood: e.target.value })}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
          >
            <option value="upbeat">Upbeat</option>
            <option value="calm">Calm</option>
            <option value="energetic">Energetic</option>
            <option value="melancholic">Melancholic</option>
            <option value="balanced">Balanced</option>
            <option value="dramatic">Dramatic</option>
            <option value="romantic">Romantic</option>
            <option value="mysterious">Mysterious</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Complexity:</label>
          <select 
            value={textSettings.complexity || 'moderate'}
            onChange={(e) => onTextSettingsChange({ ...textSettings, complexity: e.target.value })}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
          >
            <option value="simple">Simple</option>
            <option value="moderate">Moderate</option>
            <option value="complex">Complex</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Style:</label>
          <select 
            value={textSettings.style || 'melodic'}
            onChange={(e) => onTextSettingsChange({ ...textSettings, style: e.target.value })}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
          >
            <option value="melodic">Melodic</option>
            <option value="rhythmic">Rhythmic</option>
            <option value="harmonic">Harmonic</option>
            <option value="ambient">Ambient</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Scale:</label>
          <select 
            value={textSettings.scale || 'major'}
            onChange={(e) => onTextSettingsChange({ ...textSettings, scale: e.target.value })}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
          >
            <option value="major">Major</option>
            <option value="minor">Minor</option>
            <option value="pentatonic">Pentatonic</option>
            <option value="chromatic">Chromatic</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Tempo:</label>
          <input 
            type="number" 
            value={textSettings.tempo || 120}
            onChange={(e) => onTextSettingsChange({ ...textSettings, tempo: parseInt(e.target.value, 10) })}
            min="60" 
            max="200"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Base Octave:</label>
          <input 
            type="number" 
            value={textSettings.baseOctave || 4}
            onChange={(e) => onTextSettingsChange({ ...textSettings, baseOctave: parseInt(e.target.value, 10) })}
            min="2" 
            max="6"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
          />
        </div>
      </div>
    </div>
  );
};

export default TextSettings;