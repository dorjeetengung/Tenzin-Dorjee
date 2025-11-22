import React, { useState } from 'react';
import { Play, Pause, ChevronRight } from 'lucide-react';
import { DAILY_DEBATES } from '../constants';

interface DailyPracticeProps {
  onStartDebate: (question: string) => void;
}

const DailyPractice: React.FC<DailyPracticeProps> = ({ onStartDebate }) => {
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Simple timer logic (for display purpose in this component)
  React.useEffect(() => {
    let interval: any;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-stone-50 font-tibetan">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-monk-darkRed mb-2">ཉིན་རེའི་ཉམས་ལེན།</h2>
          <p className="text-stone-500">Daily Practice & Reflection</p>
        </div>

        {/* Meditation Timer */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-stone-200 text-center">
          <h3 className="text-lg font-bold text-monk-red mb-4">སེམས་རྩེ་གཅིག (Single-pointed Meditation)</h3>
          <div className="text-4xl font-mono text-stone-800 mb-6">{formatTime(timeLeft)}</div>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setTimerActive(!timerActive)}
              className="flex items-center px-6 py-2 bg-monk-saffron text-monk-darkRed rounded-full font-bold hover:bg-yellow-500 transition-colors"
            >
              {timerActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
              {timerActive ? 'མཚམས་འཇོག' : 'འགོ་འཛུགས།'}
            </button>
            <button 
              onClick={() => { setTimerActive(false); setTimeLeft(300); }}
              className="px-6 py-2 bg-stone-200 text-stone-600 rounded-full hover:bg-stone-300 transition-colors"
            >
              བསྐྱར་སྒྲིག (Reset)
            </button>
          </div>
        </div>

        {/* Daily Debates */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="bg-monk-red p-4 text-white">
            <h3 className="font-bold">ཉིན་རེའི་རྩོད་གཞི། (Daily Debate Topics)</h3>
          </div>
          <div className="divide-y divide-stone-100">
            {DAILY_DEBATES.map((debate) => (
              <div key={debate.id} className="p-4 hover:bg-stone-50 transition-colors flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-monk-saffron bg-monk-darkRed px-2 py-0.5 rounded mb-1 inline-block">
                    {debate.topic}
                  </span>
                  <p className="text-lg text-stone-800">{debate.question}</p>
                </div>
                <button 
                  onClick={() => onStartDebate(debate.question)}
                  className="p-2 text-stone-400 hover:text-monk-red hover:bg-stone-100 rounded-full"
                >
                  <ChevronRight />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Card */}
        <div className="bg-stone-200 rounded-xl p-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-monk-saffron rounded-full opacity-20"></div>
           <blockquote className="relative z-10">
             <p className="text-xl text-stone-800 leading-relaxed italic">
               "ཆོས་རྣམས་ཐམས་ཅད་རྒྱུ་ལས་བྱུང་། །དེ་རྒྱུ་དེ་བཞིན་གཤེགས་པས་གསུངས། །"
             </p>
             <footer className="mt-3 text-stone-600 text-sm text-right">- རྟེན་འབྲེལ་སྙིང་པོ།</footer>
           </blockquote>
        </div>

      </div>
    </div>
  );
};

export default DailyPractice;
