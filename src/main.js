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
// 2. Trailing Magnetic Cursor with Contextual States
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

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Instant dot movement
    gsap.set(dot, { x: mouse.x, y: mouse.y });
  });

  // Smooth lerp ticker for trailing ring
  const speed = 0.16; // Interpolation factor
  gsap.ticker.add(() => {
    pos.x += (mouse.x - pos.x) * speed;
    pos.y += (mouse.y - pos.y) * speed;
    gsap.set(follower, { x: pos.x, y: pos.y });
  });

  // Mouse down / up micro-physics
  window.addEventListener('mousedown', () => cursor.classList.add('custom-cursor--clicking'));
  window.addEventListener('mouseup', () => cursor.classList.remove('custom-cursor--clicking'));

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
  const hoverElements = document.querySelectorAll('a, button, .tag');
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

  // Magnetic attraction physics ([data-magnetic])
  const magneticElements = document.querySelectorAll('[data-magnetic]');
  magneticElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.35;
      const deltaY = (e.clientY - centerY) * 0.35;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
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
};

// ==========================================================================
// 4. Hero Section Choreography (Split-lines & SVG Vector reveals)
// ==========================================================================
const initHeroEntrance = () => {
  const pill = document.getElementById('heroPill');
  const lines = document.querySelectorAll('.hero-editorial__headline .line-inner');
  const lead = document.getElementById('heroLead');
  const actions = document.getElementById('heroActions');
  const ribbonPath = document.getElementById('heroRibbonPath');
  const artBadge = document.querySelector('.art-layer--badge-3d');
  const artGeo = document.querySelector('.art-layer--geometric');

  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  // A. Status Pill Entry
  if (pill) {
    heroTl.fromTo(pill, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0);
  }

  // B. Masked Headline Lines Entrance (staggered editorial slide & un-rotate)
  if (lines.length) {
    heroTl.fromTo(
      lines,
      { yPercent: 115, rotate: 2 },
      {
        yPercent: 0,
        rotate: 0,
        duration: 1.3,
        stagger: 0.12,
        ease: 'power4.out',
      },
      0.15
    );
  }

  // C. Subtitle Lead, Tech Chips & Actions
  if (lead) {
    heroTl.fromTo(lead, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.55);
  }
  const chips = document.querySelectorAll(".hero-tech-stack .tech-chip");
  if (chips.length) {
    heroTl.fromTo(chips, { y: 15, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.8, ease: "power2.out" }, 0.68);
  }
  if (actions) {
    heroTl.fromTo(actions, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.75);
  }

  // D. Staggered SVG Illustration reveals
  if (artBadge) {
    heroTl.fromTo(
      artBadge,
      { scale: 0, opacity: 0, rotate: -45 },
      { scale: 1, opacity: 1, rotate: 0, duration: 1.4, ease: 'back.out(1.7)' },
      0.4
    );
  }

  if (artGeo) {
    heroTl.fromTo(
      artGeo,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
      0.6
    );
  }

  if (ribbonPath) {
    const length = ribbonPath.getTotalLength ? ribbonPath.getTotalLength() : 400;
    gsap.set(ribbonPath, { strokeDasharray: length, strokeDashoffset: length });
    heroTl.to(
      ribbonPath,
      { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' },
      0.5
    );
  }

  // E. Mouse Parallax Layering on Hero Elements
  const heroSection = document.getElementById('hero');
  const parallaxLayers = document.querySelectorAll('[data-parallax]');

  if (heroSection && parallaxLayers.length) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;

      parallaxLayers.forEach((layer) => {
        const factor = parseFloat(layer.getAttribute('data-parallax') || '0.05');
        gsap.to(layer, {
          x: moveX * 60 * factor * 10,
          y: moveY * 60 * factor * 10,
          duration: 0.6,
          ease: 'power2.out',
        });
      });
    });
  }
};


// ==========================================================================
// 4b. Typewriter Effect cycling between 'Kehinde Adigun' and 'Kehad'
// ==========================================================================
const initTypewriter = () => {
  const el = document.getElementById('typedName');
  if (!el) return;

  const words = ['Kehinde Adigun', 'Kehad'];
  let wordIndex = 0;
  let charIndex = words[0].length;
  let isDeleting = false;

  const type = () => {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      charIndex--;
      el.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      el.textContent = currentWord.substring(0, charIndex);
    }

    let delay = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = 3000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  };

  setTimeout(type, 3500);
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

  // 3D Parallax Tilt & Dynamic Card Expansion on Hover
  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    // Subtle 3D tilt on the entire stage and deck
    gsap.to(deck, {
      rotateX: -normY * 7,
      rotateY: normX * 8,
      duration: 0.45,
      ease: 'power2.out',
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
      });
    });
  });

  stage.addEventListener('mouseleave', () => {
    gsap.to(deck, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)',
    });
    cards.forEach((card) => {
      gsap.to(card, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
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

  const resize = () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  };
  window.addEventListener('resize', resize);

  let time = 0;
  const lineCount = 14;
  const dotsPerLine = 90;

  const render = () => {
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

  render();
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
  pf.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || !releve || !bgCanvas) return;
    const rect = bgCanvas.getBoundingClientRect();
    releve.setMouse(e.clientX - rect.left, e.clientY - rect.top);
  });

  pf.addEventListener('pointerleave', () => {
    releve?.setMouse(null);
  });

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
// Bootstrap Architecture on DOM Ready
// ==========================================================================
const init = () => {
  const lenis = initSmoothScroll();
  initMagneticCursor();
  initMorphingMenu();
  initTypewriter();
  initProjectsSection();
  initServicesShowcase();
  initTopographicCanvas();
  initSeoGeoProcess(lenis);
  initPageIntro();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
