// Scroll animations
window.addEventListener('scroll', () => {
  const video = document.querySelector('.hero video');
  let offset = window.pageYOffset;
  if (video) {
    video.style.transform = 'translateY(' + offset * 0.4 + 'px)';
  }

  document.querySelectorAll('.fade-up').forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });

  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
  }
});

// Flip card functionality
window.addEventListener('DOMContentLoaded', () => {
  const flipCards = document.querySelectorAll('.flip-card');

  VanillaTilt.init(flipCards, {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    gyroscope: true,
  });

  flipCards.forEach(card => {
    card.addEventListener('click', function () {
      flipCards.forEach(otherCard => {
        if (otherCard !== this) {
          otherCard.classList.remove('flipped');
        }
      });
      this.classList.toggle('flipped');
    });
  });

  // FIX: Only close flipped cards when clicking outside the inner card
  document.addEventListener('click', e => {
    if (!e.target.closest('.flip-card-inner')) {
      flipCards.forEach(card => card.classList.remove('flipped'));
    }
  });

  document.querySelectorAll('[data-description]').forEach(item => {
    item.setAttribute('title', item.getAttribute('data-description'));
  });

  new bootstrap.Tooltip(document.body, {
    selector: '[data-description]'
  });
});

// Popup logic
window.addEventListener('click', function (e) {
  const listItem = e.target.closest('.flip-card-back li');
  const popup = document.getElementById('floating-popup');
  if (listItem) {
    const title = listItem.textContent;
    const desc = listItem.getAttribute('data-description');
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-desc').textContent = desc;
    popup.classList.remove('hidden');
    popup.classList.add('show');
  }

  if (e.target.classList.contains('close-btn') || e.target.id === 'floating-popup') {
    popup.classList.remove('show');
    popup.classList.add('hidden');
  }
});

// Scroll-to-top
document.addEventListener('click', e => {
  if (e.target.closest('.scroll-top')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Loading screen
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  loader.style.display = "none";
});

// Nav link spark animation
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    createSparks(link);
  });
});

function createSparks(link) {
  const sparkCount = 6;
  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('span');
    spark.classList.add('spark');
    const size = Math.random() * 4 + 2;
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.top = `${Math.random() * 100}%`;
    spark.style.left = `${Math.random() * 100}%`;
    spark.style.animationDuration = `${0.3 + Math.random() * 0.3}s`;
    link.appendChild(spark);
    setTimeout(() => spark.remove(), 500);
  }
}

function applyTheme(theme) {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const body = document.body;
  const icon = document.getElementById('themeIcon');

  if (theme === 'auto') {
    body.classList.toggle('dark-mode', isDark);
    icon.className = 'bi bi-circle-half';
  } else if (theme === 'dark') {
    body.classList.add('dark-mode');
    icon.className = 'bi bi-moon';
  } else {
    body.classList.remove('dark-mode');
    icon.className = 'bi bi-sun';
  }

  // Update selected class
  document.querySelectorAll('.theme-option').forEach(el => {
    el.classList.remove('active');
    if (el.getAttribute('data-theme') === theme) {
      el.classList.add('active');
    }
  });
}

function setupTheme() {
  let savedTheme = localStorage.getItem('theme-mode') || 'auto';
  applyTheme(savedTheme);

  document.querySelectorAll('.theme-option').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const selected = btn.dataset.theme;
      localStorage.setItem('theme-mode', selected);
      applyTheme(selected);
    });
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme-mode') === 'auto') {
      applyTheme('auto');
    }
  });
}

document.addEventListener('DOMContentLoaded', setupTheme);

  // Re-apply theme if user changes system theme
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme-mode') === 'auto') {
      applyTheme('auto');
    }
  });


document.addEventListener('DOMContentLoaded', initTheme);


// tsParticles background setup
tsParticles.load("tsparticles", {
  fullScreen: { enable: false },
  background: { color: "#090364" },
  particles: {
    number: { value: 75 },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.3 },
    size: { value: { min: 1, max: 3 } },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      outModes: { default: "bounce" },
    },
    links: {
      enable: true,
      distance: 120,
      color: "#ffffff",
      opacity: 0.2,
      width: 1
    }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 100 },
      push: { quantity: 4 }
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const chatbotContainer = document.getElementById('chatContainer');
  const openChat = document.getElementById('openChat');
  const closeChat = document.getElementById('closeChat');
  const chatBody = document.getElementById('chatBody');

  openChat.addEventListener('click', () => {
    chatbotContainer.classList.add('show');
  });

  closeChat.addEventListener('click', () => {
    chatbotContainer.classList.remove('show');
  });

  document.querySelectorAll('.chat-option').forEach(button => {
    button.addEventListener('click', () => {
      const userMessage = button.textContent;
      const reply = document.createElement('div');
      reply.classList.add('chat-message', 'bot');

      if (userMessage === 'Our Products') {
        reply.textContent = 'We offer controllers, stabilizers, LED lighting, PSUs, and more!';
      } else if (userMessage === 'Career Openings') {
        reply.textContent = 'Visit the Careers section or submit your resume directly on our site!';
      } else if (userMessage === 'Contact Info') {
        reply.textContent = '📍 Hyderabad, ☎ 7032948938, ✉ careers@sktechnologies.co.in';
      } else {
        reply.textContent = 'I’m not sure how to help with that yet.';
      }

      chatBody.appendChild(reply);
      chatBody.scrollTop = chatBody.scrollHeight;
    });
  });

  // Scroll to top
  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
