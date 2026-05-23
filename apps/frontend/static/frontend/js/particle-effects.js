class ParticleSystem {
  constructor() {
    this.container = document.getElementById('particles-container');
    if (!this.container) return;

    this.particles = [];
    this.particleCount = 50;

    this.createParticles();
    this.animate();

    window.addEventListener('resize', () => this.handleResize());
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      const color = [
        'rgba(59, 130, 246, 0.5)',
        'rgba(139, 92, 246, 0.5)',
        'rgba(236, 72, 153, 0.5)',
        'rgba(6, 182, 212, 0.5)',
        'rgba(16, 185, 129, 0.5)'
      ][Math.floor(Math.random() * 5)];

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 ${size * 3}px ${color};
        animation: float ${duration}s linear ${delay}s infinite;
        opacity: ${Math.random() * 0.5 + 0.3};
      `;

      this.container.appendChild(particle);
      this.particles.push({
        element: particle,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size
      });
    }

    if (!document.getElementById('particle-animations')) {
      const style = document.createElement('style');
      style.id = 'particle-animations';
      style.textContent = `
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-${window.innerHeight}px) translateX(${(Math.random() - 0.5) * 100}px) scale(0);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  animate = () => {
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = window.innerWidth;
      if (p.x > window.innerWidth) p.x = 0;
      if (p.y < 0) p.y = window.innerHeight;
      if (p.y > window.innerHeight) p.y = 0;

      p.element.style.left = p.x + 'px';
      p.element.style.top = p.y + 'px';
    });

    requestAnimationFrame(this.animate);
  };

  handleResize() {
  }
}

class MouseTrail {
  constructor() {
    this.trails = [];
    this.maxTrails = 15;

    document.addEventListener('mousemove', (e) => this.addTrail(e));
    document.addEventListener('mouseleave', () => this.clearTrails());
  }

  addTrail(e) {
    if (Math.random() > 0.3) return;

    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed;
      pointer-events: none;
      width: 4px;
      height: 4px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.4));
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      animation: trailFade 0.6s ease-out forwards;
      z-index: 0;
    `;

    document.body.appendChild(trail);
    this.trails.push(trail);

    setTimeout(() => {
      trail.remove();
      this.trails = this.trails.filter((t) => t !== trail);
    }, 600);

    if (this.trails.length > this.maxTrails) {
      const old = this.trails.shift();
      old.remove();
    }
  }

  clearTrails() {
    this.trails.forEach((t) => t.remove());
    this.trails = [];
  }
}

if (!document.getElementById('trail-animations')) {
  const style = document.createElement('style');
  style.id = 'trail-animations';
  style.textContent = `
    @keyframes trailFade {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(0.2);
      }
    }
  `;
  document.head.appendChild(style);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    new MouseTrail();
  });
} else {
  new ParticleSystem();
  new MouseTrail();
}