import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import DailyPractice from './components/DailyPractice';
import { AppMode, Treatise } from './types';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mode, setMode] = useState<AppMode>(AppMode.DEBATE);
  const [topic, setTopic] = useState<Treatise | null>(null);
  
  // State to pass specific questions from DailyPractice to Chat
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

  // If a user selects a daily debate, switch mode and set question
  const handleStartDailyDebate = (question: string) => {
    setMode(AppMode.DEBATE);
    setPendingQuestion(question);
  };

  return (
    <div className="flex h-screen w-full bg-monk-bg overflow-hidden">
      
      {/* Navigation */}
      <Sidebar 
        currentMode={mode} 
        setMode={setMode} 
        currentTopic={topic}
        setTopic={setTopic}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative">
        
        {/* Mobile Header Trigger */}
        <div className="lg:hidden absolute top-4 left-4 z-20">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-monk-red text-white rounded-lg shadow-lg"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* View Routing */}
        <div className="h-full w-full">
          {mode === AppMode.MEDITATION ? (
            <DailyPractice onStartDebate={handleStartDailyDebate} />
          ) : (
            <ChatInterface mode={mode} topic={topic} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
