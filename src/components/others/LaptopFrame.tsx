import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Maximize2, 
  Minimize2, 
  Globe, 
  ShieldCheck, 
  Lock, 
  RefreshCw, 
  ChevronDown, 
  Laptop, 
  MousePointer, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import AIChatWidget from './AIChatWidget';

interface LaptopFrameProps {
  children: React.ReactNode;
}

export default function LaptopFrame({ children }: LaptopFrameProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [inputUrl, setInputUrl] = useState<string>('');

  // 3D Laptop folding state
  // Default state: 0 = completely closed
  const [targetProgress, setTargetProgress] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [isAutoAnimating, setIsAutoAnimating] = useState(false);

  const innerScrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync current URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setInputUrl(window.location.href);
    }
  }, [location]);

  // Smooth 60fps lerp interpolation for folding physics
  useEffect(() => {
    let animId: number;
    const updateProgress = () => {
      setProgress((prev) => {
        const diff = targetProgress - prev;
        if (Math.abs(diff) < 0.001) {
          return targetProgress;
        }
        return prev + diff * 0.14;
      });
      animId = requestAnimationFrame(updateProgress);
    };

    animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, [targetProgress]);

  // Sync isUnfolded state based on progress
  useEffect(() => {
    if (progress >= 0.95 && !isUnfolded) {
      setIsUnfolded(true);
      setIsAutoAnimating(false);
    } else if (progress < 0.95 && isUnfolded) {
      setIsUnfolded(false);
    }
  }, [progress, isUnfolded]);

  // Scroll / Wheel handler to unfold the laptop
  useEffect(() => {
    if (isFullscreen) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      // If already fully unfolded and user is scrolling inside the page, don't hijack unless at top
      if (isUnfolded && innerScrollRef.current) {
        if (innerScrollRef.current.scrollTop === 0 && e.deltaY < -25) {
          // User is scrolling up at the very top of the website -> optionally allow fold
          // We keep it open unless they deliberately click "Fold Laptop" or scroll hard up
        }
        return;
      }

      // If not fully open, scroll unfolds or folds the laptop
      e.preventDefault();
      const sensitivity = 0.0016;
      setTargetProgress((prev) => Math.min(1, Math.max(0, prev + e.deltaY * sensitivity)));
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isUnfolded) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      touchStartY = currentY;

      e.preventDefault();
      const sensitivity = 0.0035;
      setTargetProgress((prev) => Math.min(1, Math.max(0, prev + deltaY * sensitivity)));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [isUnfolded, isFullscreen]);

  // Open laptop automatically with smooth transition
  const handleOpenLaptop = useCallback(() => {
    setIsAutoAnimating(true);
    setTargetProgress(1);
  }, []);

  // Close laptop back to folded state
  const handleFoldLaptop = useCallback(() => {
    setIsUnfolded(false);
    setIsAutoAnimating(true);
    setTargetProgress(0);
    if (innerScrollRef.current) {
      innerScrollRef.current.scrollTop = 0;
    }
  }, []);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl) return;

    try {
      if (inputUrl.startsWith('http://') || inputUrl.startsWith('https://')) {
        const urlObj = new URL(inputUrl);
        if (urlObj.origin === window.location.origin) {
          navigate(urlObj.pathname + urlObj.search + urlObj.hash);
        } else {
          window.location.href = inputUrl;
        }
      } else {
        const path = inputUrl.startsWith('/') ? inputUrl : `/${inputUrl}`;
        navigate(path);
      }
    } catch {
      const path = inputUrl.startsWith('/') ? inputUrl : `/${inputUrl}`;
      navigate(path);
    }
  };

  // Fullscreen bypass
  if (isFullscreen) {
    return (
      <div className="relative w-full h-[100dvh] overflow-hidden bg-[#0B0F19]">
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

  // 3D Angle Calculations
  // When progress = 0: lid is folded flat / forward by 74 degrees
  // When progress = 1: lid is upright at 0 degrees
  const lidRotateX = (1 - progress) * 74;
  const lidTranslateZ = (1 - progress) * -20;
  const lidScale = 0.96 + progress * 0.04;

  // Closed lid overlay fades out swiftly once unfolding begins so the full screen is shown
  const closedLidOpacity = Math.max(0, 1 - progress * 5.0);

  return (
    <div
      ref={containerRef}
      className="h-screen h-[100dvh] max-h-[100dvh] w-full bg-[#05070d] text-white flex flex-col justify-between items-center p-2 sm:p-3 relative overflow-hidden select-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.12),rgba(15,23,42,0))]"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[280px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Frame Control Bar (Fixed compact height, no Y overflow) */}
      <div className="w-full max-w-[1400px] h-9 sm:h-10 flex items-center justify-between px-3 shrink-0 z-30">
        <div className="flex items-center gap-2.5 text-xs text-gray-400 font-medium">
          <span className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${isUnfolded ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-cyan-400 animate-pulse'}`} />
          <span className="text-gray-200 font-bold tracking-wider">KEHAD WORKSTATION</span>
          <span className="hidden sm:inline text-gray-500">• {isUnfolded ? 'System Online (Open)' : 'Folded / Scroll to Unfold'}</span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Fold / Unfold Toggle Button */}
          {isUnfolded ? (
            <button
              onClick={handleFoldLaptop}
              className="flex items-center gap-2 bg-[#121724]/90 hover:bg-[#1a2235] text-cyan-300 border border-cyan-500/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-lg transition duration-200 cursor-pointer backdrop-blur-sm"
              title="Fold laptop screen down"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Fold Laptop</span>
            </button>
          ) : (
            <button
              onClick={handleOpenLaptop}
              className="flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/50 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-[0_0_20px_rgba(6,182,212,0.25)] transition duration-200 cursor-pointer animate-pulse"
              title="Click to unfold laptop immediately"
            >
              <Laptop className="w-3.5 h-3.5 text-cyan-300" />
              <span>Open Laptop</span>
            </button>
          )}

          <button
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 bg-[#121724] hover:bg-[#1a2235] text-gray-200 border border-gray-700/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-lg transition duration-200 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Expand Fullscreen</span>
          </button>
        </div>
      </div>

      {/* 3D LAPTOP STAGE CONTAINER (Flex-1 min-h-0 fits strictly inside viewport) */}
      <div 
        className="w-full max-w-[1360px] flex-1 min-h-0 flex flex-col items-center justify-center relative z-20 overflow-visible"
        style={{ perspective: '2200px' }}
      >
        {/* FLOATING INTERACTION PROMPT (Only visible when laptop is closed) */}
        {!isUnfolded && progress < 0.2 && (
          <div 
            className="absolute top-2 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-auto transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - progress * 5) }}
          >
            <button
              onClick={handleOpenLaptop}
              className="px-5 py-2 rounded-xl bg-[#0e1424]/90 border border-cyan-500/40 shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.25)] backdrop-blur-xl flex items-center gap-2.5 group cursor-pointer hover:scale-105 transition-all"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-black tracking-widest text-cyan-300 uppercase flex items-center gap-1.5">
                Scroll or Click to Unfold
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </span>
              <ChevronDown className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform animate-bounce" />
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3D LAPTOP LID GROUP (Hinged at bottom, rotates forward/backward) */}
        {/* ============================================================== */}
        <div
          className="w-full relative origin-bottom transition-transform will-change-transform z-20"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'bottom center',
            transform: `rotateX(${lidRotateX}deg) translateZ(${lidTranslateZ}px) scale(${lidScale})`,
            transition: isAutoAnimating ? 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          }}
        >
          {/* THE UNIFIED LAPTOP LID BOX (Height dynamically scales, NO stacking overflow) */}
          <div className="w-full h-[58vh] sm:h-[62vh] lg:h-[66vh] max-h-[680px] min-h-[360px] bg-[#111622] p-2 sm:p-3 rounded-[24px] sm:rounded-[30px] border-[3px] border-[#2a344a] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(0,180,255,0.08)] relative overflow-hidden flex flex-col">
            
            {/* A. CLOSED LID EXTERIOR OVERLAY (Matches reference image, absolute inset-0) */}
            <div
              onClick={!isUnfolded ? handleOpenLaptop : undefined}
              className={`absolute inset-0 z-40 bg-gradient-to-b from-[#161a26] via-[#10141f] to-[#0b0e16] rounded-[22px] sm:rounded-[28px] border-t border-x border-[#2c374d]/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)] p-6 sm:p-12 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-150 ${
                !isUnfolded ? 'cursor-pointer hover:border-cyan-500/40 group' : 'pointer-events-none'
              }`}
              style={{
                opacity: closedLidOpacity,
                display: progress > 0.3 ? 'none' : 'flex',
                pointerEvents: progress > 0.1 ? 'none' : 'auto',
              }}
            >
              {/* Ambient Radial Glow Behind Logo on Metallic Lid */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(6,182,212,0.18)_0%,transparent_75%)] pointer-events-none" />

              {/* Subtle Metallic Specular Reflection Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />

              {/* Centered Glowing Logo Emblem (Apple-style squircle matching reference image) */}
              <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#082f49] border border-cyan-400/60 shadow-[0_0_35px_rgba(6,182,212,0.5),inset_0_1px_2px_rgba(255,255,255,0.5)] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20" />
                  <span className="font-black text-3xl sm:text-4xl text-white tracking-tighter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] select-none">
                    K
                  </span>
                </div>
              </div>

              {/* Bottom Front Seam & Recessed Notch on Closed Lid */}
              <div className="absolute bottom-0 inset-x-0 h-3 flex justify-center items-end border-b border-black/80">
                <div className="w-32 sm:w-44 h-2 sm:h-2.5 rounded-b-md bg-[#07090e] border-x border-b border-[#252f44] shadow-inner" />
              </div>
            </div>

            {/* B. THE LAPTOP SCREEN (SHOWN CONTINUOUSLY DURING ENTIRE UNFOLDING) */}
            <div className="w-full h-full flex flex-col relative z-10">
              {/* Top Notch & Camera */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3.5 sm:h-4 w-28 sm:w-36 bg-[#0d111a] rounded-b-lg border-x border-b border-[#222b3d] flex items-center justify-center gap-1.5 z-30">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1a2436] border border-gray-600 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-blue-500/80 animate-pulse" />
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-800" />
              </div>

              {/* Browser Top Navigation Header */}
              <div className="w-full bg-[#0d121e] border-b border-gray-800/80 px-3 py-1.5 flex items-center justify-between rounded-t-[18px] sm:rounded-t-[22px] shrink-0 z-20">
                {/* macOS Window Dots */}
                <div className="flex items-center gap-1.5 w-16">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e] inline-block shadow-inner" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123] inline-block shadow-inner" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block shadow-inner" />
                </div>

                {/* System Dynamic Address Bar */}
                <form onSubmit={handleUrlSubmit} className="flex-1 max-w-lg mx-2 bg-[#171f30] border border-gray-700/60 rounded-lg px-2.5 py-0.5 flex items-center justify-between gap-2 text-xs text-gray-300 shadow-inner">
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                    <input
                      type="text"
                      value={inputUrl}
                      className="w-full bg-transparent font-mono text-[11px] text-gray-200 focus:outline-none tracking-wide truncate"
                      placeholder="https://..."
                      readOnly
                    />
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                      title="Reload Page"
                      className="p-0.5 hover:bg-gray-700/60 rounded transition text-gray-400 hover:text-white cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </button>
                    <ShieldCheck className="w-3 h-3 text-cyan-400 hidden sm:block" />
                  </div>
                </form>

                {/* Right Status */}
                <div className="flex items-center justify-end gap-1.5 w-16 text-[10px] text-gray-400 font-mono">
                  <Globe className="w-3 h-3 text-gray-400 hidden sm:block" />
                  <span className="hidden sm:inline text-cyan-400 font-bold">PORTFOLIO</span>
                </div>
              </div>

              {/* INNER DISPLAY SCREEN (Renders the scaled website + pinned AI chat) */}
              <div className="flex-1 min-h-0 w-full bg-[#0B0F19] rounded-b-[18px] sm:rounded-b-[22px] overflow-hidden relative shadow-inner">
                {/* Scaled App Content Container */}
                <div 
                  ref={innerScrollRef}
                  className="w-full h-full overflow-y-auto overflow-x-hidden relative scrollbar-thin scrollbar-thumb-gray-800"
                >
                  <div className="w-[117.6%] origin-top-left transform scale-[0.85] min-h-[117.6%] flex flex-col">
                    {children}
                  </div>
                </div>

                {/* AI Chatbot Widget */}
                <AIChatWidget isLaptopView={true} />
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* LAPTOP HINGE & BOTTOM BASE CHASSIS */}
        {/* ============================================================== */}
        <div className="w-full flex flex-col items-center -mt-1 shrink-0 z-20">
          {/* Hinge Joint */}
          <div className="w-48 sm:w-72 h-2 sm:h-2.5 bg-gradient-to-r from-[#182030] via-[#33425e] to-[#182030] rounded-b-md shadow-md" />

          {/* Bottom Aluminum Laptop Base Chassis */}
          <div 
            className="w-[101.5%] max-w-[1380px] bg-gradient-to-b from-[#161a26] via-[#10141d] to-[#080a10] rounded-b-[18px] sm:rounded-b-[24px] border-t border-black/80 shadow-[0_25px_50px_rgba(0,0,0,0.95)] flex flex-col items-center justify-start relative px-6 transition-all duration-300"
            style={{
              height: isUnfolded ? '22px' : '30px',
            }}
          >
            {/* Front Lip Recessed Notch */}
            <div className="w-32 sm:w-44 h-1.5 sm:h-2 bg-[#07090e] rounded-b-md border-x border-b border-[#232c40] shadow-inner" />

            {/* Subtle Cyan Center Accent LED (Matching reference image) */}
            {!isUnfolded && (
              <div className="w-5 h-[2px] bg-cyan-400/80 rounded-full mt-1 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            )}
          </div>
        </div>

        {/* Polished Floor Mirror Reflection (Matching reference image) */}
        <div 
          className="w-[90%] max-w-[1300px] h-8 bg-gradient-to-b from-black/80 to-transparent blur-md rounded-full -mt-1.5 shrink-0 pointer-events-none transition-all duration-300"
          style={{
            transform: `scale(${0.92 + progress * 0.08})`,
            opacity: 0.7 + progress * 0.2,
          }}
        />
      </div>
    </div>
  );
}
