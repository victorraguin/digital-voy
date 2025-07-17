import React from 'react';
import { Psychic } from '../types';

interface TypingIndicatorProps {
  psychic: Psychic;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ psychic }) => {
  return (
    <div className="flex justify-start animate-message-appear">
      <div className="flex items-end space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-[80%]">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs sm:text-sm font-semibold shadow-lg">
          {psychic.avatar}
        </div>
        
        <div className="px-3 py-2.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl rounded-bl-sm sm:rounded-bl-md bg-white/10 border border-white/20 shadow-lg backdrop-blur-sm">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-xs text-slate-400 mt-2 sm:mt-3">
            <span className="hidden sm:inline">{psychic.name} analyse votre situation...</span>
            <span className="sm:hidden">Analyse en cours...</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;