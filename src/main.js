// ==========================================================================
// Awwwards SOTD Master Motion & Interaction Architecture
// Inspired by Junca Studio, Lenval, and Tarq Studio
// ==========================================================================

import './scss/main.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { creerReleve } from './scripts/releve.js';
import { seoGeoSteps } from './data/seoGeoSteps.js';
import { keyboardGrid } from './data/skillsData.js';
import { initSpotifyWidget } from './scripts/spotifyWidget.js';

gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// 1. Lenis Smooth Scroll Engine + GSAP ScrollTrigger Synchronization
// ==========================================================================
const initSmoothScroll = () => {
  const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.1,
    touchMultiplier: 1.8,
  });

  // Synchronize Lenis scroll position with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Expose for link anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          lenis.scrollTo(targetElement, { offset: -40, duration: 1.4 });
        }
      }
    });
  });

  return lenis;
};

// ==========================================================================
// 2. High-Performance Trailing Magnetic Accent Cursor (Zero-Lag, 60/120fps)
// ==========================================================================
const initMagneticCursor = () => {
  const cursor = document.getElementById('customCursor');
  const dot = document.getElementById('cursorDot');
  const follower = document.getElementById('cursorFollower');
  const label = document.getElementById('cursorLabel');

  if (!cursor || !dot || !follower || !label) return;

  // Real mouse coordinates
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  // Smoothed follower coordinates
  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  // GSAP quickSetters for high performance 120Hz throughput
  const setDotX = gsap.quickSetter(dot, 'x', 'px');
  const setDotY = gsap.quickSetter(dot, 'y', 'px');
  const setFollowerX = gsap.quickSetter(follower, 'x', 'px');
  const setFollowerY = gsap.quickSetter(follower, 'y', 'px');

  window.addEventListener(
    'mousemove',
    (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setDotX(mouse.x);
      setDotY(mouse.y);
    },
    { passive: true }
  );

  // Fast, responsive lerp ticker (snappy tracking: factor 0.38)
  const speed = 0.38;
  gsap.ticker.add(() => {
    pos.x += (mouse.x - pos.x) * speed;
    pos.y += (mouse.y - pos.y) * speed;
    setFollowerX(pos.x);
    setFollowerY(pos.y);
  });

  // Mouse down / up micro-physics
  window.addEventListener('mousedown', () => cursor.classList.add('custom-cursor--clicking'), { passive: true });
  window.addEventListener('mouseup', () => cursor.classList.remove('custom-cursor--clicking'), { passive: true });

  // Contextual cursor labels ([data-cursor="Text"])
  const contextElements = document.querySelectorAll('[data-cursor]');
  contextElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      const text = el.getAttribute('data-cursor') || 'View';
      label.textContent = text;
      cursor.classList.add('custom-cursor--badge');
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('custom-cursor--badge');
    });
  });

  // Standard hover state for links and buttons
  const hoverElements = document.querySelectorAll('a, button, .tag, .ctrl-pill, .keycap, [role="button"]');
  hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (!el.hasAttribute('data-cursor')) {
        cursor.classList.add('custom-cursor--hover');
      }
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('custom-cursor--hover');
    });
  });

  // Magnetic attraction physics ([data-magnetic]) with RAF throttling
  const magneticElements = document.querySelectorAll('[data-magnetic]');
  magneticElements.forEach((el) => {
    let ticking = false;
    el.addEventListener(
      'mousemove',
      (e) => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) * 0.35;
          const deltaY = (e.clientY - centerY) * 0.35;

          gsap.to(el, {
            x: deltaX,
            y: deltaY,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          ticking = false;
        });
      },
      { passive: true }
    );

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    });
  });
};

// ==========================================================================
// 3. Full-Page Morphing SVG Transition Curtain Entrance Timeline
// ==========================================================================
const initPageIntro = () => {
  const transitionEl = document.getElementById('pageTransition');
  const counter = document.getElementById('transitionCounter');
  const logoSpan = document.querySelector('.page-transition__logo span');

  if (!transitionEl) {
    initHeroEntrance();
    return;
  }

  const tl = gsap.timeline();

  // 1. Counter ticker 00% -> 100%
  const countObj = { val: 0 };
  if (logoSpan) {
    tl.to(logoSpan, {
      y: 0,
      duration: 0.4,
      ease: 'power3.out',
      delay: 0.05,
    });
  }

  if (counter) {
    tl.to(
      countObj,
      {
        val: 100,
        duration: 0.6,
        ease: 'power2.inOut',
        onUpdate: () => {
          const formatted = Math.floor(countObj.val).toString().padStart(2, '0');
          counter.textContent = `${formatted}%`;
        },
      },
      '-=0.2'
    ).to(counter, {
      opacity: 0,
      y: -10,
      duration: 0.25,
      ease: 'power2.in',
    });
  }

  // 2. Wipe up the curtain overlay with smooth exponential easing
  tl.to(
    transitionEl,
    {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
      onComplete: () => {
        transitionEl.style.display = 'none';
      },
    },
    '+=0.05'
  )
    // 3. Trigger Hero Entrance Choreography synchronously as curtain peels up
    .add(() => {
      initHeroEntrance();
    }, '-=0.5');

  // Safety fallback to guarantee curtain disappears smoothly even if frames lag
  setTimeout(() => {
    if (transitionEl && transitionEl.style.display !== 'none') {
      transitionEl.style.display = 'none';
      initHeroEntrance();
    }
  }, 1600);
};

// ==========================================================================
// ==========================================================================
// 4. Creative Midnight Purple Wireframe Hero Architecture
// 3D Sinuous Parametric Waves Canvas, Glowing Indicator, Retained CTAs
// ==========================================================================
let heroWavesInitialized = false;

const initHeroWavesCanvas = () => {
  if (heroWavesInitialized) return;
  const canvas = document.getElementById('heroWavesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  heroWavesInitialized = true;

  let width = 0;
  let height = 0;
  let time = 0;
  let isVisible = true;
  let mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = canvas.parentElement?.offsetWidth || window.innerWidth;
    height = canvas.parentElement?.offsetHeight || window.innerHeight;
    if (width < 320) width = window.innerWidth;
    if (height < 320) height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  };

  window.addEventListener('resize', resize, { passive: true });
  resize();

  window.addEventListener(
    'mousemove',
    (e) => {
      mouse.targetX = e.clientX / window.innerWidth;
      mouse.targetY = e.clientY / window.innerHeight;
    },
    { passive: true }
  );

  const render = () => {
    if (!isVisible) return;

    time += 0.005;
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    ctx.clearRect(0, 0, width, height);

    // Deep Midnight Obsidian Base
    ctx.fillStyle = '#05060f';
    ctx.fillRect(0, 0, width, height);

    // Soft Purple Ambient Radial Glow behind the right vortex
    const glowX = width * 0.88 + (mouse.x - 0.5) * 35;
    const glowY = height * 0.28 + (mouse.y - 0.5) * 25;
    const glow = ctx.createRadialGradient(glowX, glowY, 15, glowX, glowY, width < 768 ? 320 : 620);
    glow.addColorStop(0, 'rgba(139, 92, 246, 0.20)');
    glow.addColorStop(0.35, 'rgba(109, 40, 217, 0.08)');
    glow.addColorStop(1, 'rgba(5, 6, 15, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    // 1. RIGHT SIDE: 3D Torus Vortex / Folded Wireframe Aperture (Optimized vector density)
    const cx = width * 0.89 + (mouse.x - 0.5) * 35;
    const cy = height * 0.27 + (mouse.y - 0.5) * 25;
    const numVortex = width < 768 ? 32 : 46;

    for (let i = 0; i < numVortex; i++) {
      const k = i / numVortex; // 0 (inner eye) to 1 (outer flare)
      ctx.beginPath();

      const points = width < 768 ? 64 : 96;
      for (let j = 0; j <= points; j++) {
        const theta = (j / points) * Math.PI * 2;
        
        const baseR = (width < 768 ? 30 : 45) + Math.pow(k, 0.82) * (width < 768 ? 260 : 460);

        const pinch = Math.sin(theta + 0.25 + time * 0.4) * 0.36;
        const fold = Math.cos(theta * 2 - 0.15 + time * 0.2) * (0.26 + k * 0.36);
        const ripple = Math.sin(theta * 3 + 0.7 + time * 0.5) * (0.07 + k * 0.05);

        const r = baseR * (1 + pinch + fold + ripple);

        const rot = -0.44;
        const xLocal = r * Math.cos(theta) * 1.08;
        const yLocal = r * Math.sin(theta) * 1.34;

        const px = cx + xLocal * Math.cos(rot) - yLocal * Math.sin(rot);
        const py = cy + xLocal * Math.sin(rot) + yLocal * Math.cos(rot);

        if (j === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      const alpha = 0.04 + Math.sin(k * Math.PI) * 0.45;
      const rVal = Math.floor(145 + k * 45);
      const gVal = Math.floor(75 + k * 65);
      const bVal = 252;
      ctx.strokeStyle = `rgba(${rVal}, ${gVal}, ${bVal}, ${alpha.toFixed(3)})`;
      ctx.lineWidth = 1.0;
      ctx.stroke();
    }

    // 2. TOP-LEFT & LEFT: Smooth Topographic Wireframe Arcs
    const numContour = width < 768 ? 18 : 28;
    const leftOriginX = width * 0.44 + (mouse.x - 0.5) * 25;
    const leftOriginY = -height * 0.24 + (mouse.y - 0.5) * 20;

    for (let c = 0; c < numContour; c++) {
      const p = c / numContour;
      ctx.beginPath();

      const steps = width < 768 ? 45 : 70;
      for (let s = 0; s <= steps; s++) {
        const u = s / steps;
        
        const angle = 0.65 + u * 2.35;
        const rBase = (180 + p * (width < 768 ? 260 : 440)) * (0.65 + u * 1.05);

        const wave = Math.sin(u * 4.2 + p * 2.8 + time * 0.5) * (25 + p * 18)
                   + Math.cos(u * 2.2 - p * 1.5 - time * 0.3) * 22;

        const px = leftOriginX - Math.cos(angle) * (rBase + wave);
        const py = leftOriginY + Math.sin(angle) * (rBase + wave) * 1.35;

        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      const alpha = 0.025 + Math.sin(p * Math.PI) * 0.22;
      ctx.strokeStyle = `rgba(157, 122, 238, ${alpha.toFixed(3)})`;
      ctx.lineWidth = 0.95;
      ctx.stroke();
    }

    requestAnimationFrame(render);
  };

  // Zero-cost off-screen CPU consumption via IntersectionObserver
  const observer = new IntersectionObserver(
    ([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (isVisible && !wasVisible) {
        requestAnimationFrame(render);
      }
    },
    { threshold: 0.05 }
  );

  observer.observe(canvas);
  render();
};

const initHeroEntrance = () => {
  initHeroWavesCanvas();

  const indicatorDot = document.querySelector('.indicator-dot');
  const indicatorLine = document.querySelector('.indicator-line');
  const title = document.querySelector('.hero-creative__title');
  const subtitlesList = document.getElementById('heroSubtitlesList');
  const actions = document.querySelector('.hero-creative__actions');
  const scrollCue = document.querySelector('.hero-creative__scroll');

  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (indicatorDot && indicatorLine) {
    heroTl.fromTo(indicatorDot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 }, 0.1)
      .fromTo(indicatorLine, { scaleY: 0, transformOrigin: 'top center' }, { scaleY: 1, duration: 1.0 }, 0.25);
  }

  if (title) {
    heroTl.fromTo(title, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, 0.2);
  }

  if (subtitlesList) {
    heroTl.fromTo(subtitlesList, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.4);
  }

  if (actions) {
    heroTl.fromTo(actions, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.55);
  }

  if (scrollCue) {
    heroTl.fromTo(scrollCue, { opacity: 0, y: 15 }, { opacity: 0.85, y: 0, duration: 1.0 }, 0.75);
  }

  initHeroScrollSubtitles();
};

// ==========================================================================
// 4c. Scroll-Triggered Subtitles & Dynamic Indicator Line Extension
// Pure CSS Sticky scroll tracking: NO DOM MUTATIONS or PIN SPACERS
// Subtitles appear one by one and indication_line extends down smoothly.
// Completely isolated from SEO & GEO (.pf).
// ==========================================================================
const initHeroScrollSubtitles = () => {
  const heroSection = document.getElementById('hero');
  const line = document.getElementById('heroIndicatorLine');
  const dot = document.querySelector('.hero-creative__indicator .indicator-dot');
  const subtitles = [...document.querySelectorAll('.hero-section__subtitle')];
  const scrollCue = document.querySelector('.hero-creative__scroll');

  if (!heroSection || !line || !dot || subtitles.length === 0) return;

  let activeStep = 0;

  const updateSubtitlesAndLine = (stepIndex) => {
    activeStep = stepIndex;

    // Toggle active and current classes
    subtitles.forEach((s, idx) => {
      s.classList.toggle('is-active', idx <= stepIndex);
      s.classList.toggle('is-current', idx === stepIndex);
    });

    // Compute line height to reach the active subtitle's bottom
    requestAnimationFrame(() => {
      const targetSub = subtitles[stepIndex];
      if (targetSub) {
        const dotRect = dot.getBoundingClientRect();
        const subRect = targetSub.getBoundingClientRect();
        const targetHeight = Math.max(75, Math.round(subRect.bottom - dotRect.bottom));
        line.style.height = `${targetHeight}px`;
      }
    });
  };

  // Initial calculation after layout render
  setTimeout(() => {
    updateSubtitlesAndLine(0);
  }, 150);

  // Recalculate on subtitle transition end
  subtitles.forEach((s) => {
    s.addEventListener('transitionend', () => {
      const targetSub = subtitles[activeStep];
      if (targetSub) {
        const dotRect = dot.getBoundingClientRect();
        const subRect = targetSub.getBoundingClientRect();
        const targetHeight = Math.max(75, Math.round(subRect.bottom - dotRect.bottom));
        line.style.height = `${targetHeight}px`;
      }
    });
  });

  // Re-calculate on resize
  window.addEventListener('resize', () => {
    updateSubtitlesAndLine(activeStep);
  });

  // ScrollTrigger tracking scroll progress through #hero
  // CRITICAL: pin is false! Zero pin-spacers inserted!
  ScrollTrigger.create({
    trigger: heroSection,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.1,
    onUpdate: (self) => {
      const p = self.progress;
      let step = 0;
      if (p >= 0.66) {
        step = 2;
      } else if (p >= 0.33) {
        step = 1;
      } else {
        step = 0;
      }

      if (step !== activeStep) {
        updateSubtitlesAndLine(step);
      }

      if (scrollCue) {
        scrollCue.style.opacity = String(Math.max(0, 0.85 - p * 1.2));
      }
    }
  });
};

// ==========================================================================
// 4b. Hero Name: Static & Crisp to prevent layout shifts
// ==========================================================================
const initTypewriter = () => {
  const el = document.getElementById('typedName');
  if (!el) return;
  el.textContent = 'Kehad';
};
// ==========================================================================
// 5. Junca Studio Exact Projects Section & Row Transitions
// Replicating: row scroll reveal, line sweep, badge flip, and view toggle
// ==========================================================================
const initProjectsSection = () => {
  const projectList = document.getElementById('projectList');
  const viewListBtn = document.getElementById('viewList');
  const viewGridBtn = document.getElementById('viewGrid');
  const projectRows = document.querySelectorAll('.prow');

  if (!projectList || !projectRows.length) return;

  // 1. ScrollTrigger Sequential Row Reveal (translateY: 28px -> 0, opacity: 0 -> 1)
  ScrollTrigger.batch(projectRows, {
    start: 'top 88%',
    onEnter: (batch) => {
      gsap.fromTo(
        batch,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );
    },
    once: true,
  });

  // 2. View Toggle Handler (List View vs Grid View)
  if (viewListBtn && viewGridBtn) {
    viewListBtn.addEventListener('click', () => {
      if (viewListBtn.classList.contains('active')) return;
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');

      gsap.to(projectList, {
        opacity: 0.4,
        y: 8,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          projectList.setAttribute('data-view', 'list');
          ScrollTrigger.refresh();
          gsap.to(projectList, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power3.out',
          });
        },
      });
    });

    viewGridBtn.addEventListener('click', () => {
      if (viewGridBtn.classList.contains('active')) return;
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');

      gsap.to(projectList, {
        opacity: 0.4,
        y: 8,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          projectList.setAttribute('data-view', 'grid');
          ScrollTrigger.refresh();
          gsap.to(projectList, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power3.out',
          });
        },
      });
    });
  }

  // 3. Project Click Morphing Transition
  projectRows.forEach((row) => {
    row.addEventListener('click', (e) => {
      e.preventDefault();
      projectList.classList.add('is-morphing');
      const firstTile = row.querySelector('.prow__tile');

      if (firstTile) {
        gsap.timeline({
          onComplete: () => {
            setTimeout(() => projectList.classList.remove('is-morphing'), 600);
          },
        })
          .to(firstTile, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          })
          .to(firstTile, {
            scale: 1,
            duration: 0.35,
            ease: 'power2.inOut',
          });
      }
    });
  });
};

// ==========================================================================
// 6. Fullscreen Morphing Menu Overlay Animation
// ==========================================================================
const initMorphingMenu = () => {
  const toggleBtn = document.getElementById('menuToggle');
  const overlay = document.getElementById('navOverlay');
  const menuPath = document.getElementById('menuPath');
  const menuLinks = document.querySelectorAll('.nav-overlay__item a');
  const menuInner = document.querySelector('.nav-overlay__inner');

  if (!toggleBtn || !overlay || !menuPath || !menuInner) return;

  let isOpen = false;

  const openTimeline = gsap.timeline({ paused: true });

  openTimeline
    .set(overlay, { visibility: 'visible', pointerEvents: 'auto' })
    .to(menuPath, {
      attr: { d: 'M 0 0 L 100 0 L 100 100 C 50 100 50 100 0 100 Z' },
      duration: 0.7,
      ease: 'power4.in',
    })
    .to(menuPath, {
      attr: { d: 'M 0 0 L 100 0 L 100 100 C 50 100 50 100 0 100 Z' },
      duration: 0.3,
    })
    .to(menuInner, { opacity: 1, duration: 0.4 }, '-=0.2')
    .to(
      menuLinks,
      {
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      },
      '-=0.3'
    );

  const toggleMenu = () => {
    isOpen = !isOpen;
    if (isOpen) {
      openTimeline.play();
    } else {
      openTimeline.reverse();
    }
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Close menu on link click
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (isOpen) toggleMenu();
    });
  });
};

// ==========================================================================
// 7. Interactive Services Showcase & 3D Fanned Deck
// Faithfully modeled after the uploaded editorial reference
// ==========================================================================
const initServicesShowcase = () => {
  const stage = document.getElementById('deckStage');
  const deck = document.getElementById('fannedDeck');
  const cards = Array.from(document.querySelectorAll('.fanned-deck__card'));
  const currentNumEl = document.getElementById('currentServiceNum');
  const titleEl = document.getElementById('serviceTitle');
  const descEl = document.getElementById('serviceDesc');
  const btnTextEl = document.getElementById('serviceBtnText');
  const serviceNavBtns = document.querySelectorAll('.service-nav__item');

  if (!stage || !deck || !cards.length) return;

  // 3D Parallax Tilt & Dynamic Card Expansion on Hover (RAF throttled)
  let stageTicking = false;
  stage.addEventListener(
    'mousemove',
    (e) => {
      if (stageTicking) return;
      stageTicking = true;
      requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        // Subtle 3D tilt on the entire stage and deck
        gsap.to(deck, {
          rotateX: -normY * 7,
          rotateY: normX * 8,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto',
          transformPerspective: 1800,
        });

        // Individual card depth shifts (fanning physics)
        cards.forEach((card, i) => {
          const depthMultiplier = (i + 1) * 3.5;
          gsap.to(card, {
            x: normX * depthMultiplier,
            y: normY * depthMultiplier * 0.5,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
        stageTicking = false;
      });
    },
    { passive: true }
  );

  stage.addEventListener('mouseleave', () => {
    stageTicking = false;
    gsap.to(deck, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    });
    cards.forEach((card) => {
      gsap.to(card, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    });
  });

  // Clicking any card brings it forward with spring physics
  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();

      gsap.timeline()
        .to(card, {
          y: -25,
          scale: 1.04,
          duration: 0.25,
          ease: 'power2.out',
        })
        .to(card, {
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)',
        });
    });
  });

  // Service Data Switcher
  const serviceData = {
    1: {
      num: '01',
      title: 'Brand Direction',
      desc: 'Crafting radical typographic identities, bespoke iconography, and editorial design systems for market leaders.',
      btn: 'Explore Strategy',
    },
    2: {
      num: '02',
      title: 'Interface Systems',
      desc: 'Bespoke design engines with ultra-refined ergonomics, micro-interactions, and high-conversion UX flows.',
      btn: 'Explore Interfaces',
    },
    3: {
      num: '03',
      title: 'Kinetic Engineering',
      desc: 'Award-winning WebGL shaders, physics-based UI pipelines, and 60FPS fluid canvas architectures.',
      btn: 'Explore Engineering',
    },
    4: {
      num: '04',
      title: 'Fundraising',
      desc: 'The round opens in three months. The deck was made the night before the last one.',
      btn: 'Explore Fundraising',
    },
    5: {
      num: '05',
      title: 'Spatial Prototyping',
      desc: 'Pioneering volumetric interfaces, multi-touch gestures, and futuristic interactive hardware viewports.',
      btn: 'Explore Spatial',
    },
  };

  serviceNavBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-service');
      const data = serviceData[sId];
      if (!data) return;

      serviceNavBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Animate text transition
      gsap.timeline()
        .to([titleEl, descEl, btnTextEl], {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            currentNumEl.textContent = data.num;
            titleEl.textContent = data.title;
            descEl.textContent = data.desc;
            btnTextEl.textContent = data.btn;
          },
        })
        .to([titleEl, descEl, btnTextEl], {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: 'power2.out',
        });

      // Quick shuffle ripple on cards
      gsap.fromTo(
        cards,
        { scale: 0.96 },
        {
          scale: 1,
          stagger: 0.05,
          duration: 0.45,
          ease: 'back.out(2)',
        }
      );
    });
  });

  // ScrollTrigger Entrance Choreography for Services Section
  ScrollTrigger.create({
    trigger: '#services',
    start: 'top 75%',
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        stage,
        { scale: 0.94, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.1 },
        0
      )
        .fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.08,
            ease: 'back.out(1.4)',
          },
          0.2
        )
        .fromTo(
          '#serviceContent > *',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
          0.3
        );
    },
    once: true,
  });
};

// ==========================================================================
// 8. Generative Topographic Particle Wave Canvas
// Renders the delicate dotted terrain contour lines from the reference
// ==========================================================================
const initTopographicCanvas = () => {
  const canvas = document.getElementById('topoCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);
  let isVisible = false;

  const resize = () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  };
  window.addEventListener('resize', resize, { passive: true });

  let time = 0;
  const lineCount = 12;
  const dotsPerLine = 70;

  const render = () => {
    if (!isVisible) return;
    ctx.clearRect(0, 0, width, height);
    time += 0.007;

    for (let l = 0; l < lineCount; l++) {
      const progress = l / lineCount;
      const baseY = height * 0.15 + progress * (height * 0.75);
      const alpha = Math.sin(progress * Math.PI) * 0.35 + 0.05;

      ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;

      for (let d = 0; d < dotsPerLine; d++) {
        const xProgress = d / dotsPerLine;
        const x = xProgress * width;

        // Multi-frequency wave calculation for terrain effect
        const wave1 = Math.sin(xProgress * 4.5 + time + l * 0.35) * 28;
        const wave2 = Math.cos(xProgress * 8.0 - time * 0.8 + l * 0.2) * 16;
        const wave3 = Math.sin(xProgress * 2.0 + time * 0.5) * 40;

        const y = baseY + wave1 + wave2 + wave3;
        const dotRadius = (Math.sin(xProgress * Math.PI) * 1.2 + 0.6);

        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(render);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (isVisible && !wasVisible) {
        requestAnimationFrame(render);
      }
    },
    { threshold: 0.05 }
  );

  observer.observe(canvas);
};

// ==========================================================================
// 8a. Dynamic Step Rendering via JS Loop
// ==========================================================================
const renderSeoGeoSteps = (pf) => {
  if (!pf) return;

  const total = seoGeoSteps.length;
  pf.style.setProperty('--n', String(total));

  // 1. Dynamic Digits loop
  const digitsEl = pf.querySelector('[data-pf-digits]');
  if (digitsEl) {
    digitsEl.innerHTML = seoGeoSteps
      .map((_, i) => `<span>${String(i + 1).padStart(2, '0')}</span>`)
      .join('');
  }

  // 2. Dynamic Total counter
  const totalEl = pf.querySelector('[data-pf-total]');
  if (totalEl) {
    totalEl.textContent = `/ ${String(total).padStart(2, '0')}`;
  }

  // 3. Dynamic Steps loop
  const stepsContainer = pf.querySelector('.pf__steps');
  if (stepsContainer) {
    stepsContainer.innerHTML = seoGeoSteps
      .map(
        (step, idx) => `
        <li class="pf__step ${idx === 0 ? 'is-active' : ''}" data-pf-step="${idx}">
          <figure class="pf__fig ${idx === 0 ? 'is-on' : ''}" data-pf-fig="" style="--i:${idx}">
            <img
              src="${step.image}"
              alt="${step.alt}"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div class="pf__info">
            <p class="pf__n">Project ${step.stepNum}</p>
            <h3 class="pf__title">${step.title || step.name}</h3>
            <p class="pf__text">${step.text || step.description}</p>
            <p class="pf__tags">
              ${(Array.isArray(step.tags) ? step.tags : [step.Tag]).filter(Boolean).map((tag) => `<span>${tag}</span>`).join('')}
            </p>
            ${step.website ? `<div class="pf__cta"><a href="${step.website}" target="_blank" rel="noopener noreferrer" class="pf__link-btn" data-cursor="Demo">Live Demo ↗</a></div>` : ''}
            <div class="pf__controller">
              ${seoGeoSteps
                .map(
                  (_, btnIdx) => `
                <button class="ctrl-pill ${btnIdx === idx ? 'is-active' : ''}" data-jump="${btnIdx}">
                  ${String(btnIdx + 1).padStart(2, '0')}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        </li>
      `
      )
      .join('');
  }
};
// ==========================================================================
// 8. Junca Studio Exact SEO & GEO Process Section Architecture (.pf)
// Pinned Sticky Track, WebGL 2 Particle Wave Canvas, Upward Curtain Chamfer
// ==========================================================================
const initSeoGeoProcess = (lenis) => {
  const pf = document.querySelector('[data-pf]');
  if (!pf) return;

  // Render steps dynamically from JavaScript data via loop
  renderSeoGeoSteps(pf);

  const track = pf.querySelector('[data-pf-track]');
  const steps = [...pf.querySelectorAll('[data-pf-step]')];
  const figs = [...pf.querySelectorAll('[data-pf-fig]')];
  const digits = pf.querySelector('[data-pf-digits]');
  const bgCanvas = pf.querySelector('[data-pf-bg]');
  const totalSteps = steps.length;
  if (!track || totalSteps === 0) return;

  let currentStep = 0;
  let releve = null;

  // Initialize WebGL 2 Particle Terrain Wave Canvas
  if (bgCanvas) {
    try {
      releve = creerReleve(bgCanvas, {
        seed: Number(pf.dataset.seed) || 3.1,
        reduce: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        vague: true,
        souris: true,
      });
      releve?.setStep(0, totalSteps);
    } catch (e) {
      console.warn('WebGL 2 Releve canvas initialization skipped:', e);
    }
  }

  // Update text holes so particles don't collide with readability
  const updateHoles = () => {
    if (!releve || !bgCanvas) return;
    const canvasRect = bgCanvas.getBoundingClientRect();
    const activeInfo = steps[currentStep]?.querySelector('.pf__info');
    const numEl = pf.querySelector('.pf__num');
    const targets = [numEl, activeInfo].filter(Boolean);

    releve.setHoles(
      targets.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          left: r.left - canvasRect.left,
          top: r.top - canvasRect.top,
          right: r.right - canvasRect.left,
          bottom: r.bottom - canvasRect.top,
        };
      })
    );
  };

  // Step Switcher Function
  const goToStep = (targetIdx) => {
    if (targetIdx === currentStep) return;
    currentStep = targetIdx;

    // Toggle step classes (.is-active and .is-before)
    steps.forEach((step, idx) => {
      step.classList.toggle('is-active', idx === currentStep);
      step.classList.toggle('is-before', idx < currentStep);
    });

    // Toggle central card figures (.is-on) with upward curtain clip-path unveil
    figs.forEach((fig, idx) => {
      fig.classList.toggle('is-on', idx <= currentStep);
    });

    // Translate step roller digits
    digits?.style.setProperty('--a', String(currentStep));

    // Update interactive controller pills
    pf.querySelectorAll('.ctrl-pill').forEach((pill) => {
      const j = parseInt(pill.getAttribute('data-jump'), 10);
      pill.classList.toggle('is-active', j === currentStep);
    });

    // Update WebGL terrain elevation & scan wave
    releve?.setStep(currentStep, totalSteps);
    updateHoles();
  };

  // Pointer movement disturbance on the terrain
  pf.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse' || !releve || !bgCanvas) return;
      const rect = bgCanvas.getBoundingClientRect();
      releve.setMouse(e.clientX - rect.left, e.clientY - rect.top);
    },
    { passive: true }
  );

  pf.addEventListener('pointerleave', () => {
    releve?.setMouse(null);
  }, { passive: true });

  // Step jumping on pill clicks
  pf.querySelectorAll('.ctrl-pill').forEach((pill) => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const jumpIdx = parseInt(pill.getAttribute('data-jump'), 10);
      if (isNaN(jumpIdx)) return;

      const trackRect = track.getBoundingClientRect();
      const trackTop = window.scrollY + trackRect.top;
      const stepScrollDistance = (trackRect.height - window.innerHeight) / (totalSteps - 1);
      const targetScroll = trackTop + jumpIdx * stepScrollDistance + 20;

      if (lenis) {
        lenis.scrollTo(targetScroll, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    });
  });

  // Scroll Synchronization via GSAP ScrollTrigger
  ScrollTrigger.create({
    trigger: track,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.1,
    onUpdate: (self) => {
      const p = self.progress;
      const step = Math.min(totalSteps - 1, Math.max(0, Math.floor(p * totalSteps)));
      goToStep(step);
    },
  });

  // IntersectionObserver to save GPU cycles when section is offscreen
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        releve?.start();
        updateHoles();
      } else {
        releve?.stop();
      }
    },
    { threshold: 0.05 }
  );

  observer.observe(track);
  window.addEventListener('resize', () => updateHoles());
};

// ==========================================================================
// 9. Reusable Sinuous Parametric Wave Background Canvas System
// Reuses the Hero's mathematical wave patterns across Skills and Footer
// Equipped with IntersectionObserver for zero off-screen GPU consumption
// ==========================================================================
const initSectionWaveCanvas = (canvasId, options = {}) => {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let time = 0;
  let isVisible = false;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.offsetWidth || canvas.parentElement?.offsetWidth || window.innerWidth;
    height = canvas.offsetHeight || canvas.parentElement?.offsetHeight || 600;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  };

  window.addEventListener('resize', resize);
  resize();

  const render = () => {
    if (!isVisible) return;
    time += 0.007;
    ctx.clearRect(0, 0, width, height);

    const numLines = options.numLines || 32;
    const baseOffset = options.baseYOffset !== undefined ? options.baseYOffset : 0.5;

    for (let i = 0; i < numLines; i++) {
      const p = i / numLines;
      ctx.beginPath();
      const steps = 50;

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const x = t * width * 1.15 - width * 0.07;
        const wave1 = Math.sin(t * 3.4 + time + p * 2.2) * (45 + p * 35);
        const wave2 = Math.cos(t * 1.9 - time * 0.75 + p * 1.6) * 30;
        const baseY = height * baseOffset + (p - 0.5) * (height * 0.55);
        const y = baseY + wave1 + wave2;

        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const alpha = 0.025 + Math.sin(p * Math.PI) * 0.18;
      ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    requestAnimationFrame(render);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (isVisible && !wasVisible) {
        requestAnimationFrame(render);
      }
    },
    { threshold: 0.05 }
  );

  observer.observe(canvas);
};

// ==========================================================================
// 10. Interactive 3D Mechanical Keyboard Toolchain Architecture
// Exact implementation matching user Keyboard3d component:
// Web Audio mechanical switch audio, drop-shadow glows, tinted SimpleIcons,
// and realistic spring-damped key depression.
// ==========================================================================
const playKeySound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Soft mechanical click sound profile
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    // Audio context may be restricted before first gesture; safely ignore
  }
};

const initKeyboard3d = () => {
  const container = document.getElementById('keyboardGrid');
  const screenText = document.getElementById('keyboardScreenText');
  const chassis = document.getElementById('keyboard3d');

  if (!container || !screenText) return;

  // Render Keyboard Rows & Keycaps from user data
  container.innerHTML = keyboardGrid
    .map((row) => {
      const keysHtml = row
        .map((k) => {
          const colClass = k.colSpan === 2 ? 'keycap--col-2' : '';
          const emptyClass = k.empty ? 'keycap--empty' : '';
          const accentClass = k.accent ? 'keycap--accent' : 'keycap--default';

          const shadowColor = k.accent ? '#4c0519' : '#06070a';
          const innerShadow = k.accent
            ? 'inset 0px 2px 2px rgba(255,255,255,0.4), inset 0px -4px 8px rgba(0,0,0,0.3)'
            : 'inset 0px 2px 2px rgba(255,255,255,0.08), inset 0px -4px 8px rgba(0,0,0,0.6)';

          const glowHtml = !k.empty
            ? `<div class="keycap__glow" style="box-shadow: 0 0 20px #${k.color}30, inset 0 0 15px #${k.color}20;"></div>`
            : '';

          const contentHtml = k.icon
            ? `<img 
                 src="https://cdn.simpleicons.org/${k.icon}/${k.color}" 
                 alt="${k.label}" 
                 loading="lazy" 
                 class="keycap__icon" 
                 style="filter: drop-shadow(0 0 10px #${k.color}80);"
                 onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='inline';" 
               />
               <span class="keycap__label" style="display:none; color: #${k.color}; text-shadow: 0 0 10px #${k.color}80;">${k.label}</span>`
            : `<span 
                 class="keycap__label" 
                 style="color: ${k.accent ? '#fff' : `#${k.color}`}; text-shadow: ${k.accent ? '0 0 10px rgba(255,255,255,0.6)' : `0 0 10px #${k.color}80`};"
               >
                 ${k.label}
               </span>`;

          return `
            <div
              class="keycap ${colClass} ${emptyClass} ${accentClass}"
              data-id="${k.id}"
              data-label="${k.label}"
              style="--shadow-color: ${shadowColor}; --inner-shadow: ${innerShadow};"
            >
              ${glowHtml}
              ${contentHtml}
            </div>
          `;
        })
        .join('');

      return `<div class="keyboard-row keyboard-grid__row">${keysHtml}</div>`;
    })
    .join('');

  // Interactive Switch Event Handlers matching user React code
  const keycaps = container.querySelectorAll('.keycap:not(.keycap--empty)');
  keycaps.forEach((keycap) => {
    const keyId = keycap.getAttribute('data-id');
    const label = keycap.getAttribute('data-label');

    keycap.addEventListener('mouseenter', () => {
      playKeySound();
      if (label) {
        screenText.textContent = keyId.toUpperCase();
      }
    });

    keycap.addEventListener('mouseleave', () => {
      screenText.textContent = 'WELCOME';
    });

    keycap.addEventListener('click', () => {
      playKeySound();
      if (keyId === 'enter') {
        const projEl = document.getElementById('seo-geo');
        if (projEl) {
          projEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Desktop Hover Transitions matching user React code:
  // onMouseEnter: rotateX(50deg) rotateZ(-30deg) scale(1.03)
  // onMouseLeave: rotateX(55deg) rotateZ(-35deg) scale(1.0)
  if (chassis && window.matchMedia('(min-width: 1024px)').matches) {
    chassis.addEventListener('mouseenter', () => {
      chassis.style.transform = 'rotateX(50deg) rotateZ(-30deg) scale(1.03)';
    });

    chassis.addEventListener('mouseleave', () => {
      chassis.style.transform = 'rotateX(55deg) rotateZ(-35deg) scale(1.0)';
    });
  }
};

// ==========================================================================
// 11. Section Unique Animations: Skills Section (#skills)
// Animation: Scroll-Triggered 3D Subtle Zoom & Mechanical Switch Cascade Stagger
// ==========================================================================
const initSkillsScrollAnimation = () => {
  const section = document.getElementById('skills');
  if (!section) return;

  // Initialize matching purple wave canvas
  initSectionWaveCanvas('skillsWavesCanvas', { numLines: 36, baseYOffset: 0.45 });

  // 1. Header Elements Staggered Fade-and-Slide
  gsap.fromTo(
    '.skills-section__header > *',
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.skills-section__header',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  // 2. 3D Keyboard Chassis Subtle Zoom & Elevation Unfold
  const chassis = document.querySelector('.keyboard-chassis');
  if (chassis) {
    gsap.fromTo(
      chassis,
      { scale: 0.86, rotateX: 68, opacity: 0 },
      {
        scale: 0.95,
        rotateX: 55,
        opacity: 1,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.keyboard-stage',
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // 3. Switch Grid Ripple-In Stagger
  const keys = document.querySelectorAll('.keyboard-grid .keycap:not(.keycap--empty)');
  if (keys.length > 0) {
    gsap.fromTo(
      keys,
      { scale: 0.65, y: 16, opacity: 0 },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: {
          grid: [4, 6],
          from: 'center',
          amount: 0.45,
        },
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: '.keyboard-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
};

// ==========================================================================
// 12. Section Unique Animations: Footer Section (#footer)
// Animation: Alternating Slide-Ins & Ambient Purple Glow Expansion
// ==========================================================================
const initFooterSectionAnimation = (lenis) => {
  const footer = document.getElementById('footer');
  if (!footer) return;

  // Initialize matching purple horizon wave canvas
  initSectionWaveCanvas('footerWavesCanvas', { numLines: 28, baseYOffset: 0.65 });

  // 1. Left Brand Block Slide-In from Left
  const brandBlock = footer.querySelector('.footer__brand-block');
  if (brandBlock) {
    gsap.fromTo(
      brandBlock,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // 2. Right Nav Columns Slide-In from Right
  const navCols = footer.querySelectorAll('.footer__col');
  if (navCols.length > 0) {
    gsap.fromTo(
      navCols,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // 3. Bottom Copyright Bar Fade-Up
  const bottomBar = footer.querySelector('.footer__bottom');
  if (bottomBar) {
    gsap.fromTo(
      bottomBar,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // 4. Ambient Purple Glow Scale & Bloom Expansion
  const glow = footer.querySelector('.footer__glow');
  if (glow) {
    gsap.fromTo(
      glow,
      { scale: 0.7, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // 5. Back to Top Magnetic Link with Lenis Smooth Scroll
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
};

// ==========================================================================
// Bootstrap Architecture on DOM Ready
// ==========================================================================
const init = () => {
  initHeroWavesCanvas();
  const lenis = initSmoothScroll();
  initMagneticCursor();
  initMorphingMenu();
  initTypewriter();
  initKeyboard3d();
  initSkillsScrollAnimation();
  initSeoGeoProcess(lenis);
  initFooterSectionAnimation(lenis);
  initPageIntro();
  initSpotifyWidget();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
