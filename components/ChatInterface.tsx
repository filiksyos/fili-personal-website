'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m here to tell you about Fili. Ask me anything!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.message },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { 
            role: 'assistant', 
            content: 'Sorry, I encountered an error. Please try again.' 
          },
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Sorry, I couldn\'t connect to the server. Please try again.' 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-black relative overflow-hidden py-12 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-black pointer-events-none" />
      
      <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col" style={{ height: 'calc(100vh - 6rem)', minHeight: '600px' }}>
        {/* Header */}
        <div className="mb-6 text-center flex-shrink-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Chat About Fili
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Ask me anything about Fili and I'll be happy to answer!
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col flex-1 min-h-0 max-h-full">
          {/* Messages Container */}
          <div 
            ref={messagesContainerRef} 
            className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scroll-smooth"
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(147, 51, 234, 0.5) transparent'
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex w-full ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-700/70 text-gray-100'
                  }`}
                  style={{ 
                    wordWrap: 'break-word', 
                    overflowWrap: 'break-word',
                    maxWidth: 'min(85%, 75vw)',
                    width: 'fit-content',
                    boxSizing: 'border-box',
                    overflow: 'hidden'
                  }}
                >
                  <p className="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed overflow-wrap-anywhere m-0">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start w-full">
                <div className="bg-gray-700/70 rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form 
            onSubmit={handleSubmit} 
            className="border-t border-gray-700 p-4 md:p-6 flex-shrink-0 bg-gray-800/30"
          >
            <div className="flex gap-2 md:gap-3 items-end">
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Fili..."
                  disabled={isLoading}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-600 disabled:hover:to-pink-600 text-sm md:text-base whitespace-nowrap flex-shrink-0"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
