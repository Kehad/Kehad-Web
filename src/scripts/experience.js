// ==========================================================================
// 3D Experience Showcase Interactive Engine
// Cylindrical 3D Orbit Carousel with Momentum Physics & Touch/Wheel Control
// ==========================================================================

export const experiences = [
  {
    id: "quidrop",
    themeClass: "theme-quidrop",
    role: "Mobile Application Developer",
    company: "QUIDROP",
    duration: "Jan 2025 - Dec 2025",
    colorTheme: {
      gradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
      pillBg: "rgba(99, 102, 241, 0.12)",
      pillBorder: "rgba(99, 102, 241, 0.35)",
      pillText: "#a5b4fc"
    },
    description: [
      "Collaborated with backend developers to integrate APIs for dynamic data management.",
      "Developed the Quidrop interface, ensuring a seamless user experience.",
      "Implemented responsive design to ensure optimal performance across all devices.",
      "Worked closely with UI/UX designers to translate designs into functional, user-friendly interfaces.",
      "Optimized website performance, enhancing load times and interactivity.",
      "Ensured cross-browser compatibility for a consistent user experience."
    ],
    skills: [
      { name: "React Native", color: "61DAFB" },
      { name: "TypeScript", color: "3178C6" },
      { name: "Next.js", color: "ffffff" },
      { name: "Node.js", color: "339933" },
      { name: "Tailwind", color: "06B6D4" }
    ]
  },
  {
    id: "lokatalent",
    themeClass: "theme-lokatalent",
    role: "Junior Frontend Developer (Contract)",
    company: "LOKATALENT",
    duration: "Aug 2024 - Jan 2025",
    colorTheme: {
      gradient: "linear-gradient(135deg, #f97316, #f59e0b)",
      pillBg: "rgba(249, 115, 22, 0.12)",
      pillBorder: "rgba(249, 115, 22, 0.35)",
      pillText: "#fdba74"
    },
    description: [
      "Built the dashboard for both the user and the service provider.",
      "Collaborated with the backend developer to integrate the API.",
      "Worked with UX/UI designers to implement visually appealing and user-friendly interfaces.",
      "Ensured the website was mobile responsive.",
      "Integrated third-party APIs seamlessly into existing systems, expanding feature sets and capabilities."
    ],
    skills: [
      { name: "React", color: "61DAFB" },
      { name: "Next.js", color: "ffffff" },
      { name: "TypeScript", color: "3178C6" },
      { name: "Tailwind", color: "06B6D4" }
    ]
  },
  {
    id: "cr8iviti",
    themeClass: "theme-cr8iviti",
    role: "Web Developer Intern",
    company: "CR8IVITI",
    duration: "July 2023 - Aug 2024",
    colorTheme: {
      gradient: "linear-gradient(135deg, #34d399, #14b8a6)",
      pillBg: "rgba(20, 184, 166, 0.12)",
      pillBorder: "rgba(20, 184, 166, 0.35)",
      pillText: "#5eead4"
    },
    description: [
      "Created custom websites by harnessing HTML, CSS and JavaScript skills.",
      "Collaborated with web designers to match visual design intent.",
      "Designed web pages to enhance branding and navigation."
    ],
    skills: [
      { name: "HTML5", color: "E34F26" },
      { name: "CSS3", color: "1572B6" },
      { name: "JavaScript", color: "F7DF1E" },
      { name: "React", color: "61DAFB" }
    ]
  }
];

export const initExperienceShowcase = () => {
  const carousel = document.getElementById('experienceCarousel');
  const viewport = document.getElementById('experienceViewport');
  const sceneTilt = document.getElementById('experienceSceneTilt');
  const indexIndicator = document.getElementById('experienceIndexIndicator');
  const dotsContainer = document.getElementById('experienceDotsContainer');

  if (!carousel || !viewport) return;

  // Clear any existing cards if re-initialized
  carousel.innerHTML = '';
  if (dotsContainer) dotsContainer.innerHTML = '';

  experiences.forEach((exp, i) => {
    // Build Card Element
    const card = document.createElement('article');
    card.className = `card ${exp.themeClass}`;
    card.dataset.index = i;

    card.innerHTML = `
      <div class="card-content">
        <!-- Card Header -->
        <div>
          <div class="card-header">
            <div class="company-tag">
              <span class="company-indicator" style="background: ${exp.colorTheme.gradient}; box-shadow: 0 0 10px rgba(255,255,255,0.25)"></span>
              <span class="company-name">${exp.company}</span>
            </div>
            <span class="duration">${exp.duration}</span>
          </div>
          <h3 class="role-title">${exp.role}</h3>
        </div>

        <!-- Description Bullet Points -->
        <ul class="desc-scroll-list">
          ${exp.description
            .map(
              (item) => `
            <li>
              <span class="bullet">•</span>
              <span>${item}</span>
            </li>
          `
            )
            .join('')}
        </ul>

        <!-- Skill Badges -->
        <div class="skills-badges">
          ${exp.skills
            .map(
              (skill) => `
            <span class="skill-badge"
                  style="background: ${exp.colorTheme.pillBg}; border-color: ${exp.colorTheme.pillBorder}; color: ${exp.colorTheme.pillText}">
              #${skill.name}
            </span>
          `
            )
            .join('')}
        </div>
      </div>
    `;

    card.addEventListener('click', () => rotateToIndex(i));
    carousel.appendChild(card);

    // Create Navigation Dot
    if (dotsContainer) {
      const dot = document.createElement('button');
      dot.className = i === 0 ? 'active' : 'inactive';
      dot.setAttribute('aria-label', `Go to ${exp.company}`);
      dot.addEventListener('click', () => rotateToIndex(i));
      dotsContainer.appendChild(dot);
    }
  });

  const cards = carousel.querySelectorAll('.card');
  const dots = dotsContainer ? dotsContainer.children : [];
  const totalCards = experiences.length;
  const anglePerCard = 360 / totalCards; // 120deg

  function getRadius() {
    return window.innerWidth <= 768 ? 300 : 420;
  }

  function layoutCards() {
    const radius = getRadius();
    cards.forEach((card, i) => {
      const angle = anglePerCard * i;
      card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });
  }

  layoutCards();
  window.addEventListener('resize', layoutCards);

  // Interactive Dynamics
  let currentRotation = 0;
  let targetRotation = 0;
  let scrollVelocity = 0;
  let isDragging = false;
  let startX = 0;
  let previousRotation = 0;
  let activeIndex = -1;

  function updateActiveState() {
    const normalizedAngle = ((-currentRotation % 360) + 360) % 360;
    const index = Math.round(normalizedAngle / anglePerCard) % totalCards;

    if (index !== activeIndex) {
      activeIndex = index;
      if (indexIndicator) {
        indexIndicator.textContent = `0${activeIndex + 1} / 0${totalCards}`;
      }

      // Update Navigation Dots
      for (let d = 0; d < dots.length; d++) {
        if (d === activeIndex) {
          dots[d].className = 'active';
        } else {
          dots[d].className = 'inactive';
        }
      }

      // Highlight Active Card
      cards.forEach((card, idx) => {
        if (idx === activeIndex) {
          card.classList.add('card-active');
        } else {
          card.classList.remove('card-active');
        }
      });
    }
  }

  function rotateToIndex(index) {
    const currentNormalized = targetRotation % 360;
    const targetAngle = -index * anglePerCard;
    const diff = ((targetAngle - currentNormalized + 180) % 360) - 180;
    targetRotation = targetRotation + diff;
  }

  let animationFrameId = null;

  // Smooth Animation Frame
  function animate() {
    // Scroll momentum & damping
    if (Math.abs(scrollVelocity) > 0.001) {
      targetRotation += scrollVelocity;
      scrollVelocity *= 0.9; // friction decay
    } else {
      scrollVelocity = 0;
    }

    // Smooth Lerp towards target angle
    currentRotation += (targetRotation - currentRotation) * 0.085;
    carousel.style.transform = `rotateY(${currentRotation}deg)`;

    updateActiveState();
    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
  updateActiveState();

  // Mouse Wheel Scroll to Rotate inside the 3D viewport
  function handleWheel(e) {
    // Only intercept when user is over the 3D viewport
    e.preventDefault();
    e.stopPropagation();
    const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 120);
    scrollVelocity += delta * 0.045;
  }

  viewport.addEventListener('wheel', handleWheel, { passive: false });

  // Drag-to-spin controls (Mouse & Touch)
  function handleDragStart(clientX) {
    isDragging = true;
    startX = clientX;
    previousRotation = targetRotation;
    scrollVelocity = 0;
  }

  function handleDragMove(clientX) {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    targetRotation = previousRotation + deltaX * 0.35;
  }

  function handleDragEnd() {
    isDragging = false;
  }

  viewport.addEventListener('mousedown', (e) => handleDragStart(e.clientX));
  window.addEventListener('mousemove', (e) => handleDragMove(e.clientX));
  window.addEventListener('mouseup', handleDragEnd);

  viewport.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length > 0) handleDragStart(e.touches[0].clientX);
    },
    { passive: true }
  );

  window.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length > 0) handleDragMove(e.touches[0].clientX);
    },
    { passive: true }
  );

  window.addEventListener('touchend', handleDragEnd);

  // Subtle dynamic pitch tilting with cursor
  if (sceneTilt) {
    window.addEventListener('mousemove', (e) => {
      const normY = e.clientY / window.innerHeight - 0.5;
      const tiltAngle = 18 + normY * 7;
      sceneTilt.style.transform = `rotateX(${tiltAngle}deg)`;
    });
  }

  return () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    viewport.removeEventListener('wheel', handleWheel);
  };
};

// Auto-initialize if DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initExperienceShowcase());
  } else {
    initExperienceShowcase();
  }
}

