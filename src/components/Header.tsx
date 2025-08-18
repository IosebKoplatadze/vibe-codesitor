import React from 'react';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ tempo, onTempoChange, onToggleSidebar }) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Menu */}
          <button 
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 touch-manipulation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Vibe Codesitor</h1>
            <p className="text-sm text-gray-500">Create music with simple notation</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="tempo" className="text-sm font-medium text-gray-700">Tempo:</label>
          <input 
            type="number" 
            id="tempo"
            value={tempo} 
            min="60" 
            max="200" 
            onChange={(e) => onTempoChange(parseInt(e.target.value, 10))}
            className="w-16 sm:w-20 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 touch-manipulation"
          />
          <span className="text-sm text-gray-500">BPM</span>
        </div>
      </div>
    </div>
  );
};

export default Header;