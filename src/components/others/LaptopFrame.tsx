"use client";

import React, { useState } from 'react';
import { Maximize2, Minimize2, Globe, ShieldCheck, Lock } from 'lucide-react';
import AIChatWidget from './AIChatWidget';

interface LaptopFrameProps {
  children: React.ReactNode;
}

export default function LaptopFrame({ children }: LaptopFrameProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (isFullscreen) {
    return (
      <div className="relative w-full h-[100dvh] overflow-hidden bg-[#0B0F19]">
        {/* Floating Toggle Back to Laptop Frame */}
        <button
          onClick={() => setIsFullscreen(false)}
          className="fixed top-4 right-4 z-[9999] flex items-center gap-2 bg-[#151c2e]/90 hover:bg-[#1f2942] text-cyan-300 border border-cyan-500/30 px-3.5 py-2 rounded-xl text-xs font-semibold backdrop-blur-md shadow-2xl transition-all duration-300 cursor-pointer"
          title="Return to Laptop Frame View"
        >
          <Minimize2 className="w-4 h-4 text-cyan-400" />
          <span>Laptop Frame View</span>
        </button>
        {children}
        <AIChatWidget isLaptopView={false} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#05070d] text-white flex flex-col items-center justify-center p-2 sm:p-6 lg:p-10 relative overflow-x-hidden select-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Frame Control Bar */}
      <div className="w-full max-w-[1450px] flex items-center justify-between mb-3 px-3 z-20">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-gray-300 font-bold">KEHAD PORTFOLIO</span>
          <span className="hidden sm:inline text-gray-500">• 3D & Web Interactive Workstation</span>
        </div>

        <button
          onClick={() => setIsFullscreen(true)}
          className="flex items-center gap-2 bg-[#121724] hover:bg-[#1a2235] text-gray-200 border border-gray-700/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-lg transition duration-200 cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Expand Fullscreen</span>
        </button>
      </div>

      {/* Outer Laptop Chassis Container */}
      <div className="w-full max-w-[1450px] flex flex-col items-center z-10">
        
        {/* LAPTOP DISPLAY / LID */}
        <div className="w-full bg-[#111622] p-2.5 sm:p-4 rounded-[28px] sm:rounded-[36px] border-[3px] border-[#2a344a] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(0,180,255,0.08)] relative overflow-hidden group">
          
          {/* Top Notch & Camera */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 sm:h-5 w-32 sm:w-40 bg-[#0d111a] rounded-b-xl border-x border-b border-[#222b3d] flex items-center justify-center gap-2 z-30">
            <div className="w-2 h-2 rounded-full bg-[#1a2436] border border-gray-600 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-500/80 animate-pulse" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
          </div>

          {/* Browser Top Navigation Header */}
          <div className="w-full bg-[#0d121e] border-b border-gray-800/80 px-3 py-2 flex items-center justify-between rounded-t-[20px] sm:rounded-t-[26px] z-20">
            {/* macOS Window Dots */}
            <div className="flex items-center gap-2 w-20">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] inline-block shadow-inner" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] inline-block shadow-inner" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block shadow-inner" />
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-xl mx-2 bg-[#171f30] border border-gray-700/60 rounded-xl px-3 py-1 flex items-center justify-center gap-2 text-xs text-gray-300 shadow-inner">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span className="text-gray-400 font-mono text-[11px] hidden sm:inline">https://</span>
              <span className="font-semibold text-white tracking-wide">kehad.dev</span>
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 ml-auto hidden sm:block" />
            </div>

            {/* Right Status */}
            <div className="flex items-center justify-end gap-2 w-20 text-[10px] text-gray-400 font-mono">
              <Globe className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
              <span className="hidden sm:inline text-cyan-400 font-bold">PORTFOLIO</span>
            </div>
          </div>

          {/* INNER DISPLAY SCREEN (Renders the scaled website + pinned AI chat) */}
          <div className="w-full h-[72dvh] min-h-[520px] max-h-[850px] bg-[#0B0F19] rounded-b-[20px] sm:rounded-b-[26px] overflow-hidden relative shadow-inner">
            {/* Scaled App Content Container */}
            <div className="w-full h-full overflow-y-auto overflow-x-hidden relative scrollbar-thin scrollbar-thumb-gray-800">
              <div className="w-[117.6%] origin-top-left transform scale-[0.85] min-h-[117.6%] flex flex-col">
                {children}
              </div>
            </div>

            {/* AI Chatbot Widget - Scoped and Pinned inside Laptop Screen */}
            <AIChatWidget isLaptopView={true} />
          </div>
        </div>

        {/* LAPTOP HINGE & BOTTOM BASE */}
        <div className="w-full flex flex-col items-center -mt-1 z-20">
          {/* Hinge Joint */}
          <div className="w-40 sm:w-60 h-2 sm:h-3 bg-gradient-to-r from-[#182030] via-[#2a364f] to-[#182030] rounded-b-md shadow-md" />
          
          {/* Bottom Aluminum Laptop Keyboard Base */}
          <div className="w-[102%] max-w-[1480px] h-4 sm:h-6 bg-gradient-to-b from-[#1b2333] via-[#141b29] to-[#0c101a] rounded-b-[20px] sm:rounded-b-[28px] border-t border-gray-700/50 shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex items-start justify-center relative px-8">
            {/* Trackpad Lip Notch */}
            <div className="w-24 sm:w-36 h-1.5 sm:h-2 bg-[#090c14] rounded-b-lg border-x border-b border-gray-700/60 shadow-inner" />
          </div>
        </div>

      </div>

      {/* Subtle Bottom Floor Shadow */}
      <div className="w-[85%] max-w-[1300px] h-6 bg-black/60 blur-xl rounded-full mt-1 pointer-events-none" />
    </div>
  );
}
