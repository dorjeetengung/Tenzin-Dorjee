import React, { useState } from 'react';
import { Copy, Play, Check } from 'lucide-react';
import { Message } from '../types';
import { generateSpeech, playAudioBuffer } from '../services/geminiService';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const buffer = await generateSpeech(message.text);
    if (buffer) {
      playAudioBuffer(buffer);
    }
    setIsPlaying(false);
  };

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        
        <div className={`px-5 py-3 rounded-2xl shadow-sm relative font-tibetan leading-relaxed text-lg ${
          isUser 
            ? 'bg-monk-red text-stone-50 rounded-br-none' 
            : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none'
        }`}>
          <div className="whitespace-pre-wrap">
            {message.isLoading ? (
              <div className="flex space-x-1 items-center h-6">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            ) : (
              message.text
            )}
          </div>
        </div>

        {/* Actions */}
        {!message.isLoading && !message.isError && (
          <div className={`flex mt-1 space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
            <button 
              onClick={handleCopy}
              className="p-1 text-stone-400 hover:text-monk-red transition-colors"
              title="Copy text"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
            <button 
              onClick={handleSpeak}
              className={`p-1 transition-colors ${isPlaying ? 'text-monk-saffron animate-pulse' : 'text-stone-400 hover:text-monk-red'}`}
              title="Read Aloud"
            >
              <Play size={14} />
            </button>
            <span className="text-[10px] text-stone-400 py-1">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
