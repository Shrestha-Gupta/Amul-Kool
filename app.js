const TOTAL = 229;
const FOLDER = 'ezgif-57cfb9d7d07eb584-jpg';

// DOM Elements - Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const loader = document.getElementById('loader');
const loaderFill = document.querySelector('.loader-progress-fill');
const loaderText = document.querySelector('.loader-progress-text');
const pinContainer = document.getElementById('pin-container');

// DOM Elements - Mobile Menu
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

// DOM Elements - Buy Drawer
const buyNowBtn = document.getElementById('buy-now-btn');
const buyNowMobileBtn = document.getElementById('buy-now-mobile-btn');
const drawerClose = document.getElementById('drawer-close');
const buyDrawer = document.getElementById('buy-drawer');
const drawerBackdrop = document.getElementById('drawer-backdrop');
const checkoutForm = document.getElementById('checkout-form');
const checkoutSuccess = document.getElementById('checkout-success');
const closeSuccessBtn = document.getElementById('close-success-btn');

// Cart State
const cart = {
  saffron: 0,
  koko: 0,
  badam: 0,
  rose: 0
};
const PRICE_PER_BOTTLE = 25;

// DOM Elements - Nutrition Slider
const bottleSlider = document.getElementById('bottle-slider');
const bottleSliderVal = document.getElementById('bottle-slider-val');
const valEnergy = document.getElementById('val-energy');
const valProtein = document.getElementById('val-protein');
const valCalcium = document.getElementById('val-calcium');
const fillEnergy = document.getElementById('gauge-fill-energy');
const fillProtein = document.getElementById('gauge-fill-protein');
const fillCalcium = document.getElementById('gauge-fill-calcium');

// DOM Elements - FAQ Accordions
const faqAccordions = document.querySelectorAll('.faq-accordion');

// Video State
const frames = new Array(TOTAL).fill(null);
let loaded = 0;
let isReady = false;

let targetFrame = 0;
let currentFrame = 0;

// Set canvas internal resolution to match the video frame dimensions (1280x720)
canvas.width = 1280;
canvas.height = 720;

// ── 1. PRELOAD ALL IMAGES ────────────────────────────────────
function pad(n) {
  return String(n).padStart(3, '0');
}

function preloadAllFrames() {
  for (let i = 0; i < TOTAL; i++) {
    const img = new Image();
    const idx = i;
    
    img.onload = () => {
      frames[idx] = img;
      loaded++;
      
      const pct = Math.round((loaded / TOTAL) * 100);
      loaderFill.style.width = pct + '%';
      loaderText.textContent = `Loading frames… ${pct}%`;
      
      if (idx === 0) {
        render(0);
      }
      
      if (loaded === TOTAL) {
        setTimeout(() => {
          loader.style.transition = 'opacity 0.5s ease';
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.style.display = 'none';
          }, 500);
          isReady = true;
          syncScrollToFrame();
        }, 300);
      }
    };
    
    img.onerror = () => {
      loaded++;
      if (loaded === TOTAL) {
        isReady = true;
      }
    };
    
    img.src = `${FOLDER}/ezgif-frame-${pad(i + 1)}.jpg`;
  }
}

// ── 2. RENDER FRAME ──────────────────────────────────────────
function render(frameIdx) {
  const roundedIdx = Math.max(0, Math.min(TOTAL - 1, Math.round(frameIdx)));
  const img = frames[roundedIdx];
  if (!img) return;

  // Clear and draw 1-to-1 pixel-perfect frame
  ctx.clearRect(0, 0, 1280, 720);
  ctx.drawImage(img, 0, 0, 1280, 720);
}

// ── 3. TICK (LINEAR INTERPOLATION) ───────────────────────────
const titleOverlay = document.getElementById('title-overlay');

function tick() {
  const diff = targetFrame - currentFrame;
  
  // Smooth scroll lerping decay
  if (Math.abs(diff) < 0.01) {
    currentFrame = targetFrame;
  } else {
    currentFrame += diff * 0.15; // Responsive scroll feel
  }
  
  render(currentFrame);
  
  // Fade out title overlay at 25% scroll progress
  if (titleOverlay) {
    const progress = currentFrame / (TOTAL - 1);
    let opacity = 1 - (progress / 0.25);
    opacity = Math.max(0, Math.min(1, opacity));
    titleOverlay.style.opacity = opacity;
    
    if (opacity === 0) {
      titleOverlay.style.visibility = 'hidden';
    } else {
      titleOverlay.style.visibility = 'visible';
    }
  }
  
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

// ── 4. SCROLL SYNC ───────────────────────────────────────────
const navbar = document.querySelector('.navbar');

function syncScrollToFrame() {
  if (!isReady) return;

  const rect = pinContainer.getBoundingClientRect();
  const scrolled = -rect.top;
  const totalScroll = pinContainer.offsetHeight;
  
  if (totalScroll <= 0) return;

  const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
  targetFrame = progress * (TOTAL - 1);

  // Toggle navbar scrolled class for glassmorphic transition
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}

window.addEventListener('scroll', syncScrollToFrame, { passive: true });

// ── 5. INTERACTIVE BUY DRAWER & CART SYSTEM ───────────────────
function toggleDrawer(open) {
  if (open) {
    buyDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // stop page scrolling
  } else {
    buyDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = ''; // restore scrolling
  }
}

buyNowBtn.addEventListener('click', (e) => {
  e.preventDefault();
  toggleDrawer(true);
});

if (buyNowMobileBtn) {
  buyNowMobileBtn.addEventListener('click', (e) => {
    e.preventDefault();
    mobileMenu.classList.remove('active');
    toggleDrawer(true);
  });
}

drawerClose.addEventListener('click', () => toggleDrawer(false));
drawerBackdrop.addEventListener('click', () => toggleDrawer(false));

// Quantity Increment / Decrement
const incButtons = document.querySelectorAll('.btn-inc');
const decButtons = document.querySelectorAll('.btn-dec');

incButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const flavor = btn.dataset.flavor;
    cart[flavor]++;
    updateCartUI();
    playChime(600 + cart[flavor] * 50, 0.1);
  });
});

decButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const flavor = btn.dataset.flavor;
    if (cart[flavor] > 0) {
      cart[flavor]--;
      updateCartUI();
      playChime(400 + cart[flavor] * 50, 0.1);
    }
  });
});

function updateCartUI() {
  let totalQty = 0;
  
  for (const flavor in cart) {
    document.getElementById(`qty-${flavor}`).textContent = cart[flavor];
    totalQty += cart[flavor];
  }
  
  const totalPrice = totalQty * PRICE_PER_BOTTLE;
  
  document.getElementById('cart-total-qty').textContent = `${totalQty} bottle${totalQty !== 1 ? 's' : ''}`;
  document.getElementById('cart-total-price').textContent = `₹${totalPrice}`;
}

// Checkout Submit
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Validate total items
  const totalQty = Object.values(cart).reduce((a, b) => a + b, 0);
  if (totalQty === 0) {
    alert("Please add at least 1 bottle to your order cart!");
    return;
  }
  
  // Validate Form Fields
  const name = document.getElementById('check-name').value.trim();
  const email = document.getElementById('check-email').value.trim();
  const address = document.getElementById('check-address').value.trim();
  
  if (!name || !email || !address) {
    alert("Please fill in all checkout delivery fields!");
    return;
  }

  // Play pre-order success sound
  playSuccessArpeggio();

  // Show checkout success screen
  checkoutSuccess.classList.add('active');
});

// Close Success Panel
closeSuccessBtn.addEventListener('click', () => {
  checkoutSuccess.classList.remove('active');
  // Reset Form
  checkoutForm.reset();
  // Reset Cart state
  for (const flavor in cart) {
    cart[flavor] = 0;
  }
  updateCartUI();
  toggleDrawer(false);
});

// ── 6. NUTRITION CALCULATOR ── ──────────────────────────────
function updateNutrition(bottles) {
  bottleSliderVal.textContent = bottles;
  
  // Base values per bottle
  const cEnergy = bottles * 140;   // 140 kcal
  const cProtein = (bottles * 4.2).toFixed(1); // 4.2g
  const cCalcium = bottles * 150;  // 150mg

  // Display texts
  valEnergy.textContent = cEnergy;
  valProtein.textContent = cProtein;
  valCalcium.textContent = cCalcium;

  // Dash offsets (max reference for 5 bottles: energy=700, protein=21, calcium=750)
  // dasharray length is 251.3 (2 * PI * r)
  const offsetEnergy = 251 - (251 * (cEnergy / 700));
  const offsetProtein = 251 - (251 * (cProtein / 21));
  const offsetCalcium = 251 - (251 * (cCalcium / 750));

  fillEnergy.style.strokeDashoffset = offsetEnergy;
  fillProtein.style.strokeDashoffset = offsetProtein;
  fillCalcium.style.strokeDashoffset = offsetCalcium;
}

bottleSlider.addEventListener('input', (e) => {
  updateNutrition(parseInt(e.target.value, 10));
});

// Initialize nutrition values
updateNutrition(1);

// ── 7. FAQ ACCORDIONS ── ────────────────────────────────────
faqAccordions.forEach(accordion => {
  const btn = accordion.querySelector('.faq-header-btn');
  btn.addEventListener('click', () => {
    // Collapse others
    faqAccordions.forEach(other => {
      if (other !== accordion) {
        other.classList.remove('expanded');
      }
    });
    // Toggle active accordion
    accordion.classList.toggle('expanded');
  });
});

// ── 8. MOBILE NAVIGATION TOGGLES ───────────────────────────
mobileMenuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('active');
});

mobileMenuClose.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});

mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});

// ── 9. WEB AUDIO API PRE-ORDER CHIMES ────────────────────────
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playChime(freq, duration) {
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch(e) {}
}

function playSuccessArpeggio() {
  try {
    initAudio();
    const now = audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      
      gainNode.gain.setValueAtTime(0.08, now + idx * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 0.4);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.4);
    });
  } catch(e) {}
}

// ── 10. NEWSLETTER FORM SUBMIT ──────────────────────────────
const newsletterForm = document.getElementById('newsletter-form');
const newsToast = document.getElementById('news-toast');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('news-email');
    if (emailInput.value.trim() === '') return;
    
    // Play sound feedback
    playChime(880, 0.15);
    setTimeout(() => playChime(1320, 0.25), 80);
    
    // Display confirmation toast
    newsToast.style.display = 'block';
    emailInput.value = '';
    
    setTimeout(() => {
      newsToast.style.display = 'none';
    }, 3000);
  });
}

// Start preloading
preloadAllFrames();
