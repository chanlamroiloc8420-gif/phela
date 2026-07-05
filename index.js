/* ============================================
   PHÊ LA COFFEE — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Page Loader ----
  const loader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  });

  // ---- Header Scroll Effect ----
  const header = document.getElementById('header');
  let lastScrollY = 0;

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---- Mobile Navigation ----
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  const toggleNav = () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  };

  mobileToggle.addEventListener('click', toggleNav);
  navOverlay.addEventListener('click', toggleNav);

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        toggleNav();
      }
    });
  });

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a:not(.nav-cta)');

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ---- Scroll Reveal Animations ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Counter Animation ----
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const start = performance.now();

    const formatNumber = (num) => {
      if (num >= 10000) {
        return (num / 1000).toFixed(0) + 'K+';
      }
      return num + '+';
    };

    const update = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // ---- Menu Filter Tabs ----
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuCards = document.querySelectorAll('.menu-card');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      menuCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category.includes(filter);

        if (shouldShow) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';

          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 80);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ---- Favorite Button Toggle ----
  document.querySelectorAll('.menu-card-favorite').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isFav = btn.textContent === '♥';
      btn.textContent = isFav ? '♡' : '♥';
      btn.style.color = isFav ? '' : '#E74C3C';
      btn.style.transform = 'scale(1.3)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 200);
    });
  });

  // ---- Testimonials Slider ----
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  let currentSlide = 0;

  const getCardsPerView = () => {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  };

  const totalCards = track ? track.children.length : 0;

  const updateSlider = () => {
    if (!track) return;
    const cardsPerView = getCardsPerView();
    const maxSlide = Math.max(0, totalCards - cardsPerView);
    currentSlide = Math.min(currentSlide, maxSlide);

    const cardWidth = track.children[0].offsetWidth;
    const gap = 32; // var(--space-7)
    const offset = currentSlide * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
      }
    });

    nextBtn.addEventListener('click', () => {
      const cardsPerView = getCardsPerView();
      const maxSlide = Math.max(0, totalCards - cardsPerView);
      if (currentSlide < maxSlide) {
        currentSlide++;
        updateSlider();
      }
    });

    window.addEventListener('resize', updateSlider);
  }

  // Auto-slide testimonials
  let autoSlide = setInterval(() => {
    const cardsPerView = getCardsPerView();
    const maxSlide = Math.max(0, totalCards - cardsPerView);
    currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
    updateSlider();
  }, 5000);

  // Pause auto-slide on hover
  if (track) {
    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => {
        const cardsPerView = getCardsPerView();
        const maxSlide = Math.max(0, totalCards - cardsPerView);
        currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
        updateSlider();
      }, 5000);
    });
  }

  // ---- Back to Top ----
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Contact Form Submission ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Đang gửi...';
      submitBtn.style.opacity = '0.7';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = '✓ Đã gửi thành công!';
        submitBtn.style.background = '#27AE60';
        submitBtn.style.opacity = '1';

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }

  // ---- Newsletter Form ----
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = '✓';
      setTimeout(() => {
        btn.textContent = originalText;
        newsletterForm.reset();
      }, 2000);
    });
  }

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Parallax effect for hero ----
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `scale(${1 + scrollY * 0.0002}) translateY(${scrollY * 0.3}px)`;
      }
    }, { passive: true });
  }

});
