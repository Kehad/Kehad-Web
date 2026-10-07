"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, X, RefreshCw, Minimize2, CornerDownLeft, Sparkles, Command } from 'lucide-react';
import { sendChatMessage, ChatMessage } from '@/lib/llmService';

const TERMINAL_COMMANDS = [
  { label: "$ skills", prompt: "What are your top technical skills and tech stack?" },
  { label: "$ services", prompt: "What services do you offer as a developer?" },
  { label: "$ projects", prompt: "Tell me about your 3D web and fullstack projects" },
  { label: "$ contact", prompt: "How can I contact Kehinde Adigun?" }
];

interface AIChatWidgetProps {
  isLaptopView?: boolean;
}

export default function AIChatWidget({ isLaptopView = true }: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'system-init',
      sender: 'ai',
      text: "KEHAD AI-KERNEL v2.0 initialized.\nType your query or run one of the suggested shell commands below.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages]);

  const handleSend = async (customPrompt?: string) => {
    const promptToSend = customPrompt || input.trim();
    if (!promptToSend || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: promptToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const responseText = await sendChatMessage(promptToSend, messages);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMsg]);
      if (!isOpen) setUnread(true);
    } catch (err) {
      console.error('Failed to get AI terminal response:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: `sys-reset-${Date.now()}`,
        sender: 'ai',
        text: "Terminal buffer cleared. System ready.",
        timestamp: new Date()
      }
    ]);
  };

  // Render terminal text formatted with terminal aesthetics & links
  const renderTerminalText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Handle markdown links [Label](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        const label = match[1];
        const url = match[2];
        parts.push(
          <a
            key={`link-${match.index}`}
            href={url}
            target={url.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="text-cyan-400 font-bold underline hover:text-cyan-300 transition"
          >
            {label}
          </a>
        );
        lastIndex = linkRegex.lastIndex;
      }
      if (lastIndex < line.length && parts.length > 0) {
        parts.push(line.substring(lastIndex));
      }

      const contentToRender = parts.length > 0 ? parts : line;

      if (typeof contentToRender === 'string') {
        const boldParts = contentToRender.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={idx} className="my-0.5 leading-relaxed font-mono">
            {boldParts.map((part, pIdx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={pIdx} className="font-bold text-amber-300">{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        );
      }

      return (
        <p key={idx} className="my-0.5 leading-relaxed font-mono">
          {contentToRender}
        </p>
      );
    });
  };

  const positionClass = isLaptopView
    ? "absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-40"
    : "fixed bottom-6 right-6 z-50";

  const drawerClass = isLaptopView
    ? "absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 w-[calc(100%-1.5rem)] sm:w-[340px] max-h-[430px] h-[70%] bg-[#080c14]/95 backdrop-blur-xl border border-emerald-500/40 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(16,185,129,0.15)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-auto text-xs font-mono"
    : "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[580px] h-[80vh] bg-[#080c14]/95 backdrop-blur-xl border border-emerald-500/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.2)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto text-xs sm:text-sm font-mono";

  return (
    <>
      {/* Floating Terminal Trigger Button */}
      <div className={`${positionClass} pointer-events-auto`}>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="relative group flex items-center gap-2.5 bg-[#090e1a] hover:bg-[#0f172a] text-emerald-400 px-3.5 py-2.5 rounded-xl border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 cursor-pointer font-mono text-xs"
            aria-label="Open AI Terminal"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold tracking-wider text-emerald-300">ai_cli</span>
            <span className="w-2 h-4 bg-emerald-400/80 animate-pulse inline-block rounded-xs" />
            {unread && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-[#0B0F19] animate-ping" />
            )}
          </button>
        )}
      </div>

      {/* Expandable Terminal Window */}
      {isOpen && (
        <div className={drawerClass}>
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#05080f] border-b border-emerald-900/60 select-none">
            {/* Window Dots */}
            <div className="flex items-center gap-1.5">
              <span 
                onClick={() => setIsOpen(false)} 
                className="w-2.5 h-2.5 rounded-full bg-rose-500/90 hover:opacity-80 cursor-pointer inline-block" 
                title="Close"
              />
              <span 
                onClick={() => setIsOpen(false)} 
                className="w-2.5 h-2.5 rounded-full bg-amber-500/90 hover:opacity-80 cursor-pointer inline-block" 
                title="Minimize"
              />
              <span 
                onClick={handleClear} 
                className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 hover:opacity-80 cursor-pointer inline-block" 
                title="Clear Terminal"
              />
            </div>

            {/* Title */}
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-mono tracking-tight">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">kehad@dev-cli:</span>
              <span className="text-gray-400">~/ai-assistant</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                title="Clear Terminal Output"
                className="text-[10px] text-gray-400 hover:text-emerald-400 px-1.5 py-0.5 rounded hover:bg-emerald-950/40 transition cursor-pointer"
              >
                CLEAR
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Output Body */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 scrollbar-thin scrollbar-thumb-emerald-900/50 bg-[#080c14]/90 text-gray-300">
            {/* ASCII Banner */}
            <div className="text-[10px] sm:text-xs text-emerald-500/90 leading-none select-none font-mono font-bold pb-1 border-b border-emerald-900/30">
              {/* <pre className="overflow-x-auto">{`
 ██╗  ██╗███████╗██╗  ██╗██████╗ 
 ██║  ██║██╔════╝██║  ██║██╔══██╗
 ███████║█████╗  ███████║██████╔
 ██╔══██║██╔══╝  ██╔══██║██╔══██╗
 ██║  ██║███████╗██║  ██║██████╔╝
`}</pre> */}
              <p className="text-[10px] text-emerald-400/80 mt-1">
                [SYSTEM READY] - Type your prompt below or execute a command.
              </p>
            </div>

            {/* Terminal Log Stream */}
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-1">
                {msg.sender === 'user' ? (
                  <div className="flex items-start gap-2 text-emerald-400 font-semibold">
                    <span className="text-cyan-400 shrink-0">guest@kehad-web:~$</span>
                    <span className="text-white whitespace-pre-wrap">{msg.text}</span>
                  </div>
                ) : (
                  <div className="pl-2 border-l-2 border-emerald-500/50 text-emerald-200/90 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-cyan-400/90 font-bold uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>[AI-KERNEL]</span>
                    </div>
                    {renderTerminalText(msg.text)}
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs animate-pulse">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>[EXECUTING GEMINI QUERY...]</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Terminal Command Chips */}
          <div className="px-3 py-1.5 bg-[#05080f] border-t border-emerald-900/40 flex gap-2 overflow-x-auto no-scrollbar">
            {TERMINAL_COMMANDS.map((cmd, i) => (
              <button
                key={i}
                onClick={() => handleSend(cmd.prompt)}
                disabled={loading}
                className="whitespace-nowrap text-[10px] font-mono bg-[#0d1527] hover:bg-[#14203a] text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-md transition cursor-pointer shrink-0 disabled:opacity-50 flex items-center gap-1"
              >
                <span>{cmd.label}</span>
              </button>
            ))}
          </div>

          {/* Terminal Input Line */}
          <div className="p-2.5 bg-[#05080f] border-t border-emerald-900/60 flex items-center gap-2">
            <span className="text-emerald-400 font-bold text-xs shrink-0 select-none">
              kehad@ai:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type command or ask..."
              disabled={loading}
              className="flex-1 bg-transparent text-white text-xs font-mono outline-none placeholder-gray-600 py-1"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-black font-bold flex items-center gap-1 transition cursor-pointer shrink-0 text-xs"
            >
              <span>RUN</span>
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
