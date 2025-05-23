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
});

// Flip card functionality
window.addEventListener('DOMContentLoaded', () => {
  const flipCards = document.querySelectorAll('.flip-card');

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

  document.addEventListener('click', e => {
    if (!e.target.closest('.flip-card')) {
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

window.addEventListener('scroll', () => {
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
  }
});

document.addEventListener('click', e => {
  if (e.target.closest('.scroll-top')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
 window.addEventListener("load", () => {
    const loader = document.getElementById("loading-screen");
    loader.style.display = "none";
  });

 
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

      setTimeout(() => {
        spark.remove();
      }, 500);
    }
  }



