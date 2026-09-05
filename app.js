/**
 * Amal K Dev - Portfolio Interactive Engine
 * Canvas Digital Twin Animation, Interactive Modals, Skills Filter, Contact & Copy Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCanvas();
  initTypingEffect();
  initSkillsFilter();
  initProjectFilter();
  initProjectModals();
  initResumeModal();
  initContactUtils();
});

/* ==========================================================================
   NAVBAR & SCROLL BEHAVIOR
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link');
  const backdrop = document.getElementById('mobile-nav-backdrop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting based on section scroll
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  window.closeMobileNav = function() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    if (menuToggle) {
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('nav-open');
  };

  window.openMobileNav = function() {
    if (!navLinks) return;
    navLinks.classList.add('open');
    if (menuToggle) {
      menuToggle.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
    }
    if (backdrop) backdrop.classList.add('active');
    document.body.classList.add('nav-open');
  };

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navLinks.classList.contains('open')) {
        window.closeMobileNav();
      } else {
        window.openMobileNav();
      }
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        window.closeMobileNav();
      });
    });

    // Close when clicking mobile contact button
    const mobileContactBtn = document.querySelector('.mobile-contact-btn');
    if (mobileContactBtn) {
      mobileContactBtn.addEventListener('click', () => {
        window.closeMobileNav();
      });
    }

    // Close on backdrop tap
    if (backdrop) {
      backdrop.addEventListener('click', window.closeMobileNav);
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        window.closeMobileNav();
      }
    });

    // Close on window resize if crossing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
        window.closeMobileNav();
      }
    });
  }
}

/* ==========================================================================
   DIGITAL TWIN / NETWORK CANVAS ANIMATION
   ========================================================================== */
function initCanvas() {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Calculate particle count based on screen size
  const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 16000), 75);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.color = Math.random() > 0.4 ? '#06b6d4' : '#8b5cf6';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          let directionX = (dx / distance) * force * 3;
          let directionY = (dy / distance) * force * 3;
          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 130) {
          let opacity = 1 - distance / 130;
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.22})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   DYNAMIC ROLE TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('hero-typing');
  if (!typingElement) return;

  const phrases = [
    'Senior Software Engineer (Boxarr UK)',
    'Full-Stack System Architect (10+ Yrs)',
    'Enterprise Digital Twin Engineer',
    'High-Performance SPA Specialist (Angular & React)',
    'Scalable Microservices & Cloud Architect'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 65;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 30;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pause at full phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing next phrase
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   SKILLS MATRIX FILTER
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || (category && category.includes(filter))) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   PROJECTS CATEGORY FILTER
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   PROJECT DEEP-DIVE MODALS
   ========================================================================== */
const projectData = {
  mypocket: {
    title: "My Pocket: Offline-First Personal Operating System",
    client: "Independent Product (Google Play Store Release)",
    badge: "Google Play Store • Launching Soon",
    overview: "My Pocket is an offline-first, local-first personal operating system and financial intelligence application built with Flutter and Drift SQLite. Designed with zero-cloud dependency for absolute user privacy, it unifies Money Hub, Life Engine, Contextual Life Timeline, 30-Day Cash Flow forecasting, and Asset Vault into one connected context.",
    responsibilities: [
      "Engineered an offline-first, local SQLite ORM architecture using Drift (Schema V11) with atomic database transactions and encrypted local backups.",
      "Architected reactive state management across 15+ complex screens using Riverpod 2.0 (Notifier, AsyncNotifier, family providers).",
      "Built the Money Hub featuring real-time multi-account tracking, inter-account balance transfers, color-coded warning budget thresholds, and 30-day cash flow predictive forecasting.",
      "Developed Life Engine modules: Project workspaces with budget health states (On Track, At Risk, Over Budget), Asset Vault with warranty expiration tracking, and Document Vault.",
      "Integrated OCR Receipt Scanner and natural language text parser for intelligent expense capture with mandatory user confirmation previews.",
      "Engineered data export/import pipelines (JSON and CSV) and biometric security (Fingerprint / Face ID lock) to ensure total data sovereignty."
    ],
    techStack: ["Flutter 3.3+", "Dart", "Drift (SQLite ORM)", "Riverpod 2.0", "fl_chart", "GoRouter", "OCR Receipt Scanner", "Biometrics", "Android / Play Store"],
    architecture: "Local-first layered clean architecture where UI widgets listen to Riverpod state providers, delegating persistence to Drift SQLite DAOs running in a dedicated background isolate. Zero third-party cloud tracking, 100% on-device execution.",
    gallery: [
      "./assets/images/my_pocket/feature_graphic.jpg",
      "./assets/images/my_pocket/screenshot_home.jpg",
      "./assets/images/my_pocket/screenshot_analytics.jpg"
    ]
  },
  boxarr: {
    title: "BOXARR Digital Twin Platform & SPA Architecture",
    client: "Boxarr Ltd, United Kingdom (Sep 2022 – Present)",
    badge: "Enterprise Graph SPA",
    overview: "BOXARR is a world-class enterprise systems modeling platform that maps complex business operations—interconnecting processes, resources, supply chains, and roles into a single coherent Digital Twin of the organization.",
    responsibilities: [
      "Designed and developed highly responsive Single Page Applications (SPAs) leveraging modern Angular releases and React components.",
      "Engineered modular frontend architecture and reusable component libraries, significantly reducing technical debt and feature turnaround time.",
      "Optimized complex graph rendering, nodes-and-edges state synchronization, and DOM performance for large-scale enterprise models with tens of thousands of entities.",
      "Collaborated remotely within a 12-engineer distributed team, enforcing code quality, unit testing, and continuous integration."
    ],
    techStack: ["Angular 14-18+", "React", "TypeScript", "RxJS", "High-Performance SPAs", "Modular Architecture", "GitLab CI"],
    architecture: "Multi-layered micro-frontend & modular architecture utilizing reactive state management (RxJS) with custom virtualization layers to render massive connected node topologies with zero UI stutter."
  },
  expressbase: {
    title: "Expressbase RAD: Open Source Low-Code & API Engine",
    client: "Expressbase Systems, Kochi (Oct 2016 – Jan 2021)",
    badge: "Open Source (GPL v3) • GitHub",
    githubUrl: "https://github.com/expressbasesystems",
    overview: "Expressbase is an open-source rapid application development (RAD) platform engineered on .NET Core and PostgreSQL to build enterprise applications 10x faster. The entire platform is open source under GPL v3 with public repositories on GitHub (github.com/expressbasesystems), allowing full public code inspection of its dynamic query engine and reporting pipelines.",
    responsibilities: [
      "Architected and developed the Dynamic API Builder and execution engine on .NET Core, enabling non-technical users to build custom endpoints with dynamic parameter mapping and validation.",
      "Engineered a visual, data-driven Drag-and-Drop PDF Builder (modeled after SAP Crystal Reports) enabling live canvas design and high-throughput server-side PDF generation via iTextSharp.",
      "Built multi-database abstraction layer supporting PostgreSQL and MySQL with multi-tenant tenancy isolation.",
      "Authored extensive open-source C# service modules, ServiceStack plugins, and custom JavaScript frontend components."
    ],
    techStack: [".NET Core", "C#", "ServiceStack.NET", "PostgreSQL", "JavaScript", "Dynamic API Engine", "Open Source (GPL v3)", "GitHub"],
    architecture: "Open-source config-driven execution pipeline where JSON configuration trees parse runtime queries, enforce role-based security filters, and pipe streaming data into high-fidelity PDF renderers or REST endpoints. All code is publicly auditable on GitHub."
  },
  rmad: {
    title: "RMad: Cross-Platform Native Mobile App Generator",
    client: "Expressbase Systems (Cross-Platform Mobile Platform)",
    badge: "Cross-Platform Engine",
    overview: "RMad is a revolutionary cross-platform mobile application builder that empowers enterprises to generate full-fledged native mobile apps dynamically through visual drag-and-drop configurations.",
    responsibilities: [
      "Engineered the core RMad runtime engine using the Xamarin framework to dynamically compile page JSON configurations into native Android and iOS views.",
      "Built hybrid mobile applications using Cordova, Ionic, and Onsen-UI for clients requiring lightweight web-embedded runtimes.",
      "Implemented offline-first synchronization, secure local caching, and native device hardware API bridges (camera, geolocation, biometric auth).",
      "Assisted enterprise clients with app store deployments and production performance diagnostics."
    ],
    techStack: ["Xamarin (C#)", "Cordova", "Ionic", "Onsen-UI", "Android / iOS", "REST Services", "Dynamic View Generator"],
    architecture: "Declarative JSON schema parser running on top of Xamarin.Forms that renders native platform widgets dynamically while caching data schemas locally for seamless offline operation."
  },
  instio: {
    title: "Instio & Workhorse Hospitality Digital Ecosystem",
    client: "Sathwic Consulting, Kochi (Jan 2021 – Sep 2022)",
    badge: "Microservices & Telephony",
    overview: "Instio is a full-featured digital solution for the luxury hospitality industry, managing contactless mobile check-in, guest request routing, and automated service quality monitoring.",
    responsibilities: [
      "Re-architected monolithic legacy services into scalable, independent microservices containerized with Docker.",
      "Integrated third-party telecommunication services via Signalwire Relay API for real-time automated guest notifications, voice prompts, and SMS dispatching.",
      "Developed high-throughput reverse proxy layers using Node.js to load-balance traffic and enforce authentication tokens.",
      "Authored custom Django libraries and PostgreSQL query optimizations, slashing API response times by over 45%."
    ],
    techStack: ["Python", "Django", "FastAPI", "Node.js", "Docker", "Signalwire Relay", "Angular", "PostgreSQL"],
    architecture: "Event-driven microservice cluster running inside Docker containers, decoupled via message queues, with Node.js edge proxy routing and asynchronous Signalwire webhook listeners."
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const projectCards = document.querySelectorAll('.project-card[data-project-id]');

  if (!modalOverlay) return;

  projectCards.forEach(card => {
    const triggerBtn = card.querySelector('.view-project-btn');
    const projectId = card.getAttribute('data-project-id');

    const openModal = () => {
      const data = projectData[projectId];
      if (!data) return;

      document.getElementById('modal-project-title').textContent = data.title;
      document.getElementById('modal-project-client').textContent = data.client;
      document.getElementById('modal-project-badge').textContent = data.badge;
      document.getElementById('modal-project-overview').textContent = data.overview;
      document.getElementById('modal-project-arch').textContent = data.architecture;

      // Populate responsibilities
      const respList = document.getElementById('modal-project-resp');
      respList.innerHTML = '';
      data.responsibilities.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        respList.appendChild(li);
      });

      // Populate tech stack
      const techWrap = document.getElementById('modal-project-tech');
      techWrap.innerHTML = '';
      data.techStack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = tech;
        techWrap.appendChild(span);
      });

      // Check for gallery screenshots (e.g. My Pocket)
      let galleryWrap = document.getElementById('modal-project-gallery');
      if (data.gallery && data.gallery.length > 0) {
        if (!galleryWrap) {
          galleryWrap = document.createElement('div');
          galleryWrap.id = 'modal-project-gallery';
          galleryWrap.className = 'modal-gallery-grid';
          const archBlock = document.getElementById('modal-project-arch');
          archBlock.parentNode.insertBefore(galleryWrap, archBlock);
        }
        galleryWrap.innerHTML = `
          <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; color: var(--cyan); margin-bottom: 10px; width: 100%;">Application Visuals & Screens</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 20px;">
            ${data.gallery.map(img => `<img src="${img}" alt="App Preview" style="width: 100%; border-radius: 12px; border: 1px solid var(--border-medium); object-fit: cover; max-height: 320px; box-shadow: 0 8px 24px rgba(0,0,0,0.5);">`).join('')}
          </div>
        `;
        galleryWrap.style.display = 'block';
      } else if (galleryWrap) {
        galleryWrap.style.display = 'none';
      }

      // Check for action buttons (GitHub repo link)
      let actionsWrap = document.getElementById('modal-project-custom-actions');
      if (data.githubUrl) {
        if (!actionsWrap) {
          actionsWrap = document.createElement('div');
          actionsWrap.id = 'modal-project-custom-actions';
          actionsWrap.style.cssText = 'margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-subtle); display: flex; gap: 12px; flex-wrap: wrap;';
          document.querySelector('#project-modal .modal-content').appendChild(actionsWrap);
        }
        actionsWrap.innerHTML = `
          <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            View Open Source Repositories on GitHub ↗
          </a>
        `;
        actionsWrap.style.display = 'flex';
      } else if (actionsWrap) {
        actionsWrap.style.display = 'none';
      }

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    if (triggerBtn) {
      triggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    }
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   RESUME MODAL UTILITIES
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.getElementById('resume-modal-close');

  if (!resumeModal) return;

  const openResume = (e) => {
    if (e) e.preventDefault();
    if (window.closeMobileNav) window.closeMobileNav();
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeResume = () => {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', openResume));
  if (closeBtn) closeBtn.addEventListener('click', closeResume);
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });
}

/* ==========================================================================
   CONTACT UTILITIES & TOAST NOTIFICATIONS
   ========================================================================== */
function initContactUtils() {
  // Toast trigger function
  window.showToast = function (message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✓</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  };

  // Copy to clipboard handlers
  const copyBtns = document.querySelectorAll('[data-copy-text]');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-text');
      const label = btn.getAttribute('data-copy-label') || 'Copied to clipboard';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          window.showToast(`${label}: ${textToCopy}`);
        }).catch(() => {
          fallbackCopy(textToCopy, label);
        });
      } else {
        fallbackCopy(textToCopy, label);
      }
    });
  });

  function fallbackCopy(text, label) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    window.showToast(`${label}: ${text}`);
  }

  // Contact Form Submission (Mailto fallback)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim() || 'Portfolio Inquiry for Amal K Dev';
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        window.showToast('Please complete all required fields.');
        return;
      }

      const mailtoUrl = `mailto:amalkdevs1355@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;

      window.showToast('Opening your email client to send message...');
      contactForm.reset();
    });
  }
}
