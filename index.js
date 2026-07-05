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

  // ============================================
  // CART & CHECKOUT LOGIC
  // ============================================

  // ---- Cart State ----
  let cart = JSON.parse(localStorage.getItem('phela_cart')) || [];

  // ---- DOM Selectors ----
  const cartToggle = document.getElementById('cartToggle');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');
  const cartBadge = document.getElementById('cartBadge');
  const cartCount = document.getElementById('cartCount');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartFooter = document.getElementById('cartFooter');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartTotal = document.getElementById('cartTotal');
  const btnCheckout = document.getElementById('btnCheckout');
  const btnContinue = document.getElementById('btnContinue');

  // Checkout Modal Selectors
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  const checkoutModal = document.getElementById('checkoutModal');
  const checkoutClose = document.getElementById('checkoutClose');
  const checkoutSteps = document.querySelectorAll('.checkout-step');
  const checkoutPanels = document.querySelectorAll('.checkout-panel');
  const checkoutForm1 = document.getElementById('checkoutForm1');
  const checkoutItemsContainer = document.getElementById('checkoutItems');
  const checkoutTotalEl = document.getElementById('checkoutTotal');
  const btnBackStep1 = document.getElementById('btnBackStep1');
  const btnConfirmOrder = document.getElementById('btnConfirmOrder');
  const btnBackHome = document.getElementById('btnBackHome');
  const orderCodeEl = document.getElementById('orderCode');
  const paymentOptions = document.querySelectorAll('.payment-option');

  // Toast Container
  const toastContainer = document.getElementById('toastContainer');

  // Customer Data Storage
  let customerInfo = {};

  // ---- Helper: Show Toast Notification ----
  const showToast = (message, icon = '🛒') => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;
    toastContainer.appendChild(toast);

    // Remove toast after animation finishes (3 seconds total)
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  // ---- Helper: Format Price ----
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  // ---- Helper: Parse Price String ----
  const parsePrice = (priceStr) => {
    // Extracts numeric part (e.g. "39K" -> 39 -> 39000)
    const num = parseInt(priceStr.replace(/[^0-9]/g, ''));
    if (priceStr.toUpperCase().includes('K')) {
      return num * 1000;
    }
    return num;
  };

  // ---- Cart Persistence & Render ----
  const saveCart = () => {
    localStorage.setItem('phela_cart', JSON.stringify(cart));
    updateCartUI();
  };

  const updateCartUI = () => {
    // 1. Update Cart Badge and Header Count
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadge.textContent = totalItems;
    cartBadge.setAttribute('data-count', totalItems);
    cartCount.textContent = `(${totalItems})`;

    // Add bump animation to badge if it changes
    cartBadge.classList.remove('bump');
    void cartBadge.offsetWidth; // Trigger reflow
    if (totalItems > 0) {
      cartBadge.classList.add('bump');
    }

    // 2. Render Cart Items or Empty State
    if (cart.length === 0) {
      cartEmpty.style.display = 'block';
      cartItemsContainer.innerHTML = '';
      cartFooter.style.display = 'none';
    } else {
      cartEmpty.style.display = 'none';
      cartFooter.style.display = 'block';

      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
            <div class="cart-item-controls">
              <button class="cart-qty-btn qty-minus" aria-label="Giảm số lượng">−</button>
              <span class="cart-qty">${item.qty}</span>
              <button class="cart-qty-btn qty-plus" aria-label="Tăng số lượng">+</button>
            </div>
          </div>
          <button class="cart-item-remove" aria-label="Xóa sản phẩm">✕</button>
        </div>
      `).join('');
    }

    // 3. Calculate Totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    cartSubtotal.textContent = formatPrice(subtotal);
    cartTotal.textContent = formatPrice(subtotal); // Shipping is free
  };

  // ---- Event Handlers for Sidebar Open/Close ----
  const openCart = () => {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeCart = () => {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
  };

  cartToggle.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  btnContinue.addEventListener('click', closeCart);

  // Close cart sidebar if user clicks menu items
  const cartShopBtn = document.getElementById('cartShopBtn');
  if (cartShopBtn) {
    cartShopBtn.addEventListener('click', closeCart);
  }

  // ---- "Add to Cart" Menu Buttons ----
  document.querySelectorAll('.menu-card').forEach((card, index) => {
    const btn = card.querySelector('.menu-card-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid triggering any other card clicks
      
      const name = card.querySelector('.menu-card-title').textContent;
      const priceStr = card.querySelector('.menu-card-price').textContent;
      const price = parsePrice(priceStr);
      const img = card.querySelector('.menu-card-image img').getAttribute('src');
      const id = 'prod_' + index; // Simple unique identifier

      // Check if already in cart
      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.push({ id, name, price, qty: 1, img });
      }

      saveCart();
      showToast(`Đã thêm "${name}" vào giỏ hàng!`, '☕');
    });
  });

  // ---- Cart Quantity & Remove Button Listeners ----
  cartItemsContainer.addEventListener('click', (e) => {
    const itemEl = e.target.closest('.cart-item');
    if (!itemEl) return;

    const id = itemEl.getAttribute('data-id');
    const item = cart.find(i => i.id === id);

    if (e.target.classList.contains('qty-plus')) {
      item.qty += 1;
      saveCart();
    } else if (e.target.classList.contains('qty-minus')) {
      if (item.qty > 1) {
        item.qty -= 1;
      } else {
        cart = cart.filter(i => i.id !== id);
      }
      saveCart();
    } else if (e.target.classList.contains('cart-item-remove')) {
      cart = cart.filter(i => i.id !== id);
      saveCart();
      showToast(`Đã xóa khỏi giỏ hàng!`, '🗑️');
    }
  });

  // ============================================
  // CHECKOUT MODAL FLOW
  // ============================================

  const openCheckout = () => {
    closeCart(); // Hide sidebar
    checkoutOverlay.classList.add('active');
    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    goToStep(1);
  };

  const closeCheckout = () => {
    checkoutOverlay.classList.remove('active');
    checkoutModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  btnCheckout.addEventListener('click', openCheckout);
  checkoutClose.addEventListener('click', closeCheckout);
  checkoutOverlay.addEventListener('click', closeCheckout);

  // ---- Navigation between steps ----
  const goToStep = (stepNum) => {
    // Update step bar visual indicator
    checkoutSteps.forEach(step => {
      const stepIdx = parseInt(step.getAttribute('data-step'));
      step.classList.remove('active', 'completed');
      if (stepIdx === stepNum) {
        step.classList.add('active');
      } else if (stepIdx < stepNum) {
        step.classList.add('completed');
      }
    });

    // Toggle panels
    checkoutPanels.forEach(panel => {
      panel.classList.remove('active');
    });
    document.getElementById(`checkoutStep${stepNum}`).classList.add('active');

    // Scroll to top of modal on transition
    checkoutModal.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---- STEP 1 Form Submission ----
  checkoutForm1.addEventListener('submit', (e) => {
    e.preventDefault();

    // Store customer information
    customerInfo = {
      name: document.getElementById('ckName').value,
      phone: document.getElementById('ckPhone').value,
      email: document.getElementById('ckEmail').value,
      address: document.getElementById('ckAddress').value,
      note: document.getElementById('ckNote').value
    };

    // Render Order details in Step 2 panel
    renderCheckoutSummary();

    // Go to step 2 (Payment method selection)
    goToStep(2);
  });

  // ---- Render step 2 order details summary ----
  const renderCheckoutSummary = () => {
    checkoutItemsContainer.innerHTML = cart.map(item => `
      <div class="checkout-item">
        <div class="checkout-item-name">
          <strong>${item.name}</strong> x ${item.qty}
        </div>
        <div>${formatPrice(item.price * item.qty)}</div>
      </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    checkoutTotalEl.textContent = formatPrice(subtotal);
  };

  // ---- Step 2: Payment Method Selectors ----
  paymentOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      paymentOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      opt.querySelector('input[type="radio"]').checked = true;
    });
  });

  // ---- STEP 2 Back button to Step 1 ----
  btnBackStep1.addEventListener('click', () => {
    goToStep(1);
  });

  // ---- STEP 2 Confirm Order button ----
  btnConfirmOrder.addEventListener('click', () => {
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Disable button to prevent double-click
    btnConfirmOrder.disabled = true;
    btnConfirmOrder.textContent = 'Đang xử lý...';

    // Simulate order placement API call
    setTimeout(() => {
      // Generate a random order ID
      const orderId = 'PL' + Math.floor(10000 + Math.random() * 90000);
      orderCodeEl.textContent = '#' + orderId;

      // Clear Cart
      cart = [];
      saveCart();

      // Enable button back
      btnConfirmOrder.disabled = false;
      btnConfirmOrder.textContent = 'Xác nhận đặt hàng';

      // Go to Success step
      goToStep(3);
      showToast('Đơn hàng đã được ghi nhận!', '🎉');
    }, 1200);
  });

  // ---- STEP 3 Done button ----
  btnBackHome.addEventListener('click', () => {
    closeCheckout();
  });

  // ---- Initialize Cart UI ----
  updateCartUI();

});
