"use client"
import React from 'react';

import Typed from 'typed.js';

function AutoType(props: { strings: string[], className?: string, loop?: boolean }) {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef<HTMLSpanElement>(null);
  const audioCtxRef = React.useRef<AudioContext | null>(null);

  React.useEffect(() => {
    if (!el.current) return;

    const playKeystroke = () => {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (!AudioContextClass) return;
          audioCtxRef.current = new AudioContextClass();
        }
        
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          // Attempt to resume. Browsers block audio until user interaction.
          ctx.resume().catch(() => {});
        }
        if (ctx.state !== 'running') return;

        // Create a short burst of noise for a "thud" or "click" sound
        const bufferSize = ctx.sampleRate * 0.015; // 15ms
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        // Bandpass filter to make it sound like a plastic keycap
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800 + Math.random() * 400; // Slightly randomize pitch
        filter.Q.value = 0.7;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        noise.start();
      } catch (e) {
        // Ignore audio errors
      }
    };

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        // Only trigger on actual text content additions/removals
        if (mutation.type === 'characterData' || mutation.type === 'childList') {
           playKeystroke();
           break;
        }
      }
    });

    observer.observe(el.current, { 
      characterData: true, 
      childList: true, 
      subtree: true 
    });

    const typed = new Typed(el.current, {
      strings: props.strings,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: props.loop !== undefined ? props.loop : true,
      showCursor: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
      observer.disconnect();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [props.strings, props.loop]);

  return (
    <span className={props.className} ref={el} />
  );
}

export default AutoType;