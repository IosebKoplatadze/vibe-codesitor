import React from 'react';

interface TextSettingsProps {
  langchainSettings: {
    provider: string;
    model: string;
    openaiKey: string;
    geminiKey: string;
  };
  onLangchainSettingsChange: (settings: any) => void;
}

const TextSettings: React.FC<TextSettingsProps> = ({
  langchainSettings,
  onLangchainSettingsChange,
}) => {
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
      <h3 className="text-sm font-semibold text-gray-800 mb-3">AI Settings:</h3>
      
      {/* AI Settings Panel */}
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
    </div>
  );
};

export default TextSettings;