import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, RefreshCw } from 'lucide-react';
import { Message, AppMode, Treatise } from '../types';
import ChatBubble from './ChatBubble';
import { generateResponse } from '../services/geminiService';

interface ChatInterfaceProps {
  mode: AppMode;
  topic: Treatise | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ mode, topic }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      text: 'བཀྲ་ཤིས་བདེ་ལེགས། ང་ནི་གུང་རུ་བསྟན་འཛིན་རྡོ་རྗེ་ཡིན། ཁྱེད་ལ་རིགས་ལམ་དང་གཞུང་ཆེན་གྱི་ཐོག་ལ་དྲི་བ་གང་ཡོད་དམ།', // Tashidelek. I am Gungru Tenzin Dorjee. What questions do you have regarding logic and the great treatises?
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || loading) return;

    const userText = inputValue.trim();
    setInputValue('');

    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);

    // Add Placeholder for AI
    const loadingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: loadingId,
      role: 'model',
      text: '',
      timestamp: Date.now(),
      isLoading: true
    }]);
    setLoading(true);

    // Prepare history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    // Get Response
    // Determine context based on Topic and Mode
    let contextPrompt = userText;
    if (topic) {
      contextPrompt = `[Topic: ${topic}] ${userText}`;
    }

    const responseText = await generateResponse(history, contextPrompt, mode === AppMode.DEBATE);

    setMessages(prev => prev.map(msg => 
      msg.id === loadingId 
        ? { ...msg, text: responseText, isLoading: false } 
        : msg
    ));
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-stone-50 relative">
      
      {/* Header Info */}
      <div className="absolute top-0 w-full bg-white/80 backdrop-blur z-10 border-b border-stone-200 px-4 py-2 text-center">
        <span className="text-monk-red font-bold font-tibetan">
          {topic ? `${topic} - ` : ''} 
          {mode === AppMode.DEBATE ? 'རྩོད་པ།' : mode === AppMode.EXPLAIN ? 'འགྲེལ་བཤད།' : 'སྒོམ་ལམ།'}
        </span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 pt-12 pb-24 no-scrollbar">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 w-full bg-white border-t border-stone-200 p-4">
        <div className="max-w-4xl mx-auto flex items-end space-x-2">
          <div className="flex-1 bg-stone-100 rounded-2xl border border-stone-300 focus-within:border-monk-saffron focus-within:ring-1 focus-within:ring-monk-saffron transition-all">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="འདིར་འབྲི་རོགས། (Type in Tibetan...)"
              className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 max-h-32 resize-none font-tibetan text-lg"
              rows={1}
              style={{ minHeight: '50px' }}
            />
          </div>
          
          <button 
            className={`p-3 rounded-full transition-all transform active:scale-95 ${
              isRecording 
                ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-300' 
                : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
            }`}
            onClick={() => setIsRecording(!isRecording)}
            title="Voice Input (Simulated)"
          >
            <Mic size={24} />
          </button>

          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || loading}
            className={`p-3 rounded-full transition-all transform active:scale-95 shadow-md ${
              !inputValue.trim() || loading
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                : 'bg-monk-red text-white hover:bg-monk-darkRed'
            }`}
          >
            {loading ? <RefreshCw size={24} className="animate-spin" /> : <Send size={24} />}
          </button>
        </div>
        <div className="text-center mt-2">
           <span className="text-[10px] text-stone-400">AI ཡིས་ནོར་འཁྲུལ་ཤོར་སྲིད། (AI can make mistakes.)</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
