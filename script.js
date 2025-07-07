// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
  }, 2000);
});

// Floating Hearts
function createFloatingHearts() {
  const container = document.getElementById('contentHearts');
  const hearts = ['💜', '💕', '💖', '💗', '💓', '💝'];

  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    heart.style.position = 'absolute';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 6000);
  }, 120);
}

// Music Player
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.textContent = '🎵';
    isPlaying = false;
  } else {
    bgMusic.play();
    musicBtn.textContent = '⏸️';
    isPlaying = true;
  }
});

// Interactive Title
const mainTitle = document.getElementById('mainTitle');
const variations = [
  "You Are the Best Thing That's Ever Been Mine 💜",
  "You Make My Heart Skip a Beat 💕",
  "Every Day With You is Magic ✨",
  "You're My Favorite Person 💖",
  "I Love You More Than Code 💻"
];

let titleIndex = 0;
setInterval(() => {
  mainTitle.textContent = variations[titleIndex];
  titleIndex = (titleIndex + 1) % variations.length;
}, 3000);

// Secret Modal
const secretBtn = document.getElementById('secretBtn');
const secretModal = document.getElementById('secretModal');
const closeBtn = document.querySelector('.close');

secretBtn.addEventListener('click', () => {
  secretModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  secretModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === secretModal) {
    secretModal.style.display = 'none';
  }
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'm' || e.key === 'M') {
    musicBtn.click();
  }
  if (e.key === 'Escape') {
    secretModal.style.display = 'none';
  }
});

// Mouse Trail Effect
document.addEventListener('mousemove', (e) => {
  const heart = document.createElement('div');
  heart.textContent = '💜';
  heart.style.position = 'fixed';
  heart.style.left = e.clientX + 'px';
  heart.style.top = e.clientY + 'px';
  heart.style.pointerEvents = 'none';
  heart.style.fontSize = '20px';
  heart.style.zIndex = '9999';
  heart.style.animation = 'fadeOut 1s forwards';

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1000);
});

// Initialize everything
createFloatingHearts();

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.keyCode);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.join(',') === konamiSequence.join(',')) {
    alert('🎉 You found the secret! You really are amazing! 💜');
    document.body.style.background = 'linear-gradient(45deg, #ff69b4, #4b2e83, #ffd700)';
    setTimeout(() => {
      document.body.style.background = '';
    }, 3000);
    konamiCode = [];
  }
});

// Showcase Carousel
(function() {
  const items = document.querySelectorAll('.showcase-item');
  let current = 0;
  function show(index) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }
  setInterval(() => {
    current = (current + 1) % items.length;
    show(current);
  }, 5000);
})();

// Particle Background
(function() {
  const canvas = document.getElementById('particles-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let mouse = { x: width/2, y: height/2 };
  let particles = [];
  const PARTICLE_COUNT = 60;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  function randomColor() {
    const colors = ['#d3bfff', '#e8dbf7', '#ff69b4', '#ffd700', '#fff', '#b39ddb'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function createParticle() {
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 2 + 1.5;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * (Math.random() * 0.7 + 0.3),
      vy: Math.sin(angle) * (Math.random() * 0.7 + 0.3),
      r: radius,
      color: randomColor(),
      orbit: Math.random() * 40 + 20,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 0.01 + 0.005
    };
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }

  canvas.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.angle += p.speed;
      const targetX = mouse.x + Math.cos(p.angle) * p.orbit;
      const targetY = mouse.y + Math.sin(p.angle) * p.orbit;
      p.x += (targetX - p.x) * 0.04;
      p.y += (targetY - p.y) * 0.04;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.7;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

// Love Letter Overlay Logic + MUSIC ON CLOSE
(function() {
  const overlay = document.getElementById('loveLetterOverlay');
  const envelope = document.getElementById('envelope');
  const letterModal = document.getElementById('letterModal');
  const closeBtn = document.getElementById('closeLetterBtn');

  function blockScroll() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.documentElement.style.height = '100vh';
  }
  function allowScroll() {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.height = '';
    document.documentElement.style.height = '';
  }

  if (overlay) {
    blockScroll();
    envelope.addEventListener('click', function() {
      letterModal.classList.add('active');
      envelope.parentElement.style.display = 'none';
    });

    closeBtn.addEventListener('click', function() {
      overlay.classList.add('hide');
      allowScroll();

      // ✅ Play music when letter is closed
      bgMusic.play().then(() => {
        isPlaying = true;
        musicBtn.textContent = '⏸️';
      }).catch(console.error);
    });

    overlay.addEventListener('touchmove', function(e) {
      if (!overlay.classList.contains('hide')) e.preventDefault();
    }, { passive: false });
  }
})();
