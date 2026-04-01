// Confetti and visual effects for quiz feedback
const Confetti = {
  canvas: null,
  ctx: null,
  particles: [],
  animationId: null,

  init(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  },

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  // Launch confetti burst from a point
  burst(x, y, count = 40) {
    const colors = ['#00d4ff', '#7b2ff7', '#69f0ae', '#ffd700', '#ff6b6b', '#ff9ff3', '#48dbfb'];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const velocity = 4 + Math.random() * 6;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2,
        width: 6 + Math.random() * 6,
        height: 4 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        gravity: 0.12,
        opacity: 1,
        decay: 0.015 + Math.random() * 0.01
      });
    }

    if (!this.animationId) {
      this.animate();
    }
  },

  // Full screen celebration
  celebrate() {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 3;
    this.burst(cx, cy, 60);

    // Additional bursts with delay
    setTimeout(() => this.burst(cx - 150, cy + 50, 30), 200);
    setTimeout(() => this.burst(cx + 150, cy + 50, 30), 400);
    setTimeout(() => this.burst(cx, cy - 30, 40), 600);
  },

  // Fireworks effect for 100% score
  fireworks() {
    const positions = [
      { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.2 },
      { x: window.innerWidth * 0.8, y: window.innerHeight * 0.3 },
      { x: window.innerWidth * 0.35, y: window.innerHeight * 0.15 },
      { x: window.innerWidth * 0.65, y: window.innerHeight * 0.15 }
    ];

    positions.forEach((pos, i) => {
      setTimeout(() => this.burst(pos.x, pos.y, 50), i * 300);
    });
  },

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.99;
      p.rotation += p.rotationSpeed;
      p.opacity -= p.decay;

      if (p.opacity <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.animationId = null;
    }
  }
};
