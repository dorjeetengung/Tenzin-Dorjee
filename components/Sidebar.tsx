import React from 'react';
import { BookOpen, MessageSquare, Mic, Sparkles, Menu, X, Search } from 'lucide-react';
import { AppMode, Treatise } from '../types';
import { TOPICS_LIST } from '../constants';

interface SidebarProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  currentTopic: Treatise | null;
  setTopic: (topic: Treatise) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentMode, setMode, currentTopic, setTopic, isOpen, setIsOpen }) => {
  
  const NavItem = ({ mode, icon: Icon, label }: { mode: AppMode, icon: any, label: string }) => (
    <button
      onClick={() => { setMode(mode); setIsOpen(false); }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
        currentMode === mode 
          ? 'bg-monk-saffron text-monk-darkRed font-bold' 
          : 'text-stone-200 hover:bg-monk-darkRed'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-monk-red text-stone-100 w-64 transform transition-transform duration-300 ease-in-out z-30 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static shadow-xl border-r border-monk-darkRed`}>
        
        <div className="p-6 flex items-center justify-between border-b border-monk-darkRed/50">
          <div>
            <h1 className="text-xl font-bold font-tibetan tracking-wide">རིགས་ལམ་སློབ་གྲྭ།</h1>
            <p className="text-xs text-monk-saffron mt-1">Riglam Lobdra</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-stone-300">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 space-y-2">
          <NavItem mode={AppMode.DEBATE} icon={MessageSquare} label="རྩོད་པ། (Debate)" />
          <NavItem mode={AppMode.EXPLAIN} icon={BookOpen} label="གཞུང་འགྲེལ། (Study)" />
          <NavItem mode={AppMode.MEDITATION} icon={Sparkles} label="སྒོམ་ལམ། (Practice)" />
          {/* <NavItem mode={AppMode.DICTIONARY} icon={Search} label="ཚིག་མཛོད། (Dictionary)" /> */}
        </div>

        <div className="p-4 mt-4 border-t border-monk-darkRed/50">
          <h3 className="text-sm font-semibold text-monk-saffron mb-3 px-2">གཞུང་ཆེན་ཁག (Topics)</h3>
          <div className="space-y-1">
            {TOPICS_LIST.map((topic) => (
              <button
                key={topic.id}
                onClick={() => { setTopic(topic.id); setMode(AppMode.DEBATE); setIsOpen(false); }}
                className={`w-full text-left px-4 py-2 rounded text-sm font-tibetan transition-colors ${
                  currentTopic === topic.id && currentMode === AppMode.DEBATE
                    ? 'bg-monk-darkRed text-white border-l-2 border-monk-saffron'
                    : 'text-stone-300 hover:text-white hover:bg-monk-darkRed/50'
                }`}
              >
                {topic.title}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t border-monk-darkRed/50">
           <div className="flex items-center space-x-2 text-monk-saffron">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-xs">གུང་རུ་བསྟན་འཛིན་རྡོ་རྗེ། (Active)</span>
           </div>
        </div>

      </div>
    </>
  );
};

export default Sidebar;
