import React, { useState } from 'react';
import PsychicList from './components/PsychicList';
import ChatInterface from './components/ChatInterface';
import { Psychic } from './types';

function App() {
  const [selectedPsychic, setSelectedPsychic] = useState<Psychic | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="min-h-screen">
        {!selectedPsychic ? (
          <PsychicList onSelectPsychic={setSelectedPsychic} />
        ) : (
          <ChatInterface 
            psychic={selectedPsychic} 
            onBack={() => setSelectedPsychic(null)} 
          />
        )}
      </div>
    </div>
  );
}

export default App;