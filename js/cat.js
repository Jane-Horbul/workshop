// Pixel cat companion — walks while waiting, purrs on correct, angry on wrong

const Cat = {
  canvas: null,
  ctx: null,
  x: 80,
  vx: 1.5,
  facing: 1,       // 1 = right, -1 = left
  state: 'walk',   // 'walk' | 'purr' | 'angry'
  frame: 0,
  frameTimer: 0,
  frameDelay: 12,
  scale: 3,
  _timer: null,
  particles: [],

  // Color palette: key => CSS color (null = transparent)
  C: {
    '.': null,
    'B': '#1a1a2e',  // black outline
    'O': '#cc7733',  // dark orange (ear/shadow)
    'L': '#e89040',  // main orange body
    'F': '#f5b060',  // light orange highlight
    'W': '#f0f0f0',  // white (eyes)
    'P': '#ff9999',  // pink (nose)
    'G': '#888888',  // gray (tail)
  },

  // 16-wide x 13-tall sprites, cat facing RIGHT
  SPRITES: {
    walk: [
      // Frame 0: left leg forward
      [
        '........BB.BB...',
        '.......BOLLLLB..',
        '......BOLLLLLB..',
        '......BLWBBLWB..',
        '......BLLBBLL...',
        '......BLPPPLBB..',
        '.......BBBBB....',
        '......BLLLLB....',
        '....BBLLLLLLB...',
        '...BGLLLLLLLLB..',
        '...BGB..........',
        '...BB..BB.......',
        '....B...B.......',
      ],
      // Frame 1: right leg forward
      [
        '........BB.BB...',
        '.......BOLLLLB..',
        '......BOLLLLLB..',
        '......BLWBBLWB..',
        '......BLLBBLL...',
        '......BLPPPLBB..',
        '.......BBBBB....',
        '......BLLLLB....',
        '....BBLLLLLLB...',
        '...BGLLLLLLLLB..',
        '...BGB..........',
        '....BB..BB......',
        '.....B...B......',
      ],
    ],
    purr: [
      // Frame 0: sitting, happy mouth, tail left-low
      [
        '........BB.BB...',
        '.......BOLLLLB..',
        '......BOLLLLLB..',
        '......BLWBBLWB..',
        '......BLLBBLL...',
        '......BLWWWLBB..',
        '.......BBBBB....',
        '......BLLLLB....',
        '....BBLLLLLLB...',
        '..BGBLLLLLLLLB..',
        '..BGB...........',
        '...BB.BB........',
        '....BBBBB.......',
      ],
      // Frame 1: tail slightly higher
      [
        '........BB.BB...',
        '.......BOLLLLB..',
        '......BOLLLLLB..',
        '......BLWBBLWB..',
        '......BLLBBLL...',
        '......BLWWWLBB..',
        '.......BBBBB....',
        '......BLLLLB....',
        '....BBLLLLLLB...',
        '...BGBLLLLLLLLB.',
        '...BGB..........',
        '...BB.BB........',
        '....BBBBB.......',
      ],
    ],
    angry: [
      // Frame 0: arched, angry slanted eyes, 3 legs
      [
        '......BB.BB.....',
        '.....BOLLLLB....',
        '....BOLLLLLB....',
        '....BBBBLBBB....',  // slanted brow lines
        '....BLLBBLL.....',
        '....BLPPPLBB....',
        '.....BBBBBB.....',
        '....BLLLLBB.....',
        '..BBLLLLLLBB....',
        '.BGLLLLLLLLLLB..',
        '.BGB............',
        '.BB.BB.BB.......',
        '..B..B..B.......',
      ],
      // Frame 1: legs slightly different
      [
        '......BB.BB.....',
        '.....BOLLLLB....',
        '....BOLLLLLB....',
        '....BBBBLBBB....',
        '....BLLBBLL.....',
        '....BLPPPLBB....',
        '.....BBBBBB.....',
        '....BLLLLBB.....',
        '..BBLLLLLLBB....',
        '.BGLLLLLLLLLLB..',
        '.BGB............',
        '..BB.BB.BB......',
        '...B..B..B......',
      ],
    ],
  },

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'cat-canvas';
    Object.assign(this.canvas.style, {
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '60px',
      pointerEvents: 'none',
      zIndex: '9999',
      imageRendering: 'pixelated',
    });
    document.body.appendChild(this.canvas);
    this.resize();
    window.addEventListener('resize', () => this.resize());
    requestAnimationFrame(() => this.loop());
  },

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = 60;
    if (this.x > this.canvas.width - 60) this.x = this.canvas.width - 80;
  },

  loop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.loop());
  },

  update() {
    // Walking movement
    if (this.state === 'walk') {
      this.x += this.vx;
      if (this.x > this.canvas.width - 55) this.vx = -Math.abs(this.vx);
      if (this.x < 5) this.vx = Math.abs(this.vx);
      this.facing = this.vx >= 0 ? 1 : -1;
    }

    // Animate frames
    this.frameTimer++;
    if (this.frameTimer >= this.frameDelay) {
      this.frameTimer = 0;
      this.frame = (this.frame + 1) % 2;
    }

    // Particles lifecycle
    this.particles = this.particles.filter(p => p.life > 0);
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
    }

    // Spawn hearts for purr
    if (this.state === 'purr' && Math.random() < 0.12) {
      const headX = this.facing === 1 ? this.x + 38 : this.x + 10;
      this.particles.push({
        x: headX + (Math.random() - 0.5) * 10,
        y: this.canvas.height - 36,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -1.4 - Math.random() * 0.6,
        life: 45,
        type: 'heart',
      });
    }

    // Spawn sparks for angry
    if (this.state === 'angry' && Math.random() < 0.18) {
      const headX = this.facing === 1 ? this.x + 38 : this.x + 10;
      this.particles.push({
        x: headX + (Math.random() - 0.5) * 12,
        y: this.canvas.height - 40,
        vx: (Math.random() - 0.5) * 2.5,
        vy: -2 - Math.random(),
        life: 22,
        type: 'spark',
      });
    }
  },

  render() {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const frames = this.SPRITES[this.state];
    const sprite = frames[this.frame];
    const s = this.scale;
    const spriteW = 16;
    const spriteH = sprite.length;
    const drawY = this.canvas.height - spriteH * s;

    ctx.save();
    if (this.facing === -1) {
      // Flip horizontally to face left
      ctx.translate(this.x + spriteW * s, drawY);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(this.x, drawY);
    }

    for (let row = 0; row < sprite.length; row++) {
      const line = sprite[row];
      for (let col = 0; col < line.length; col++) {
        const color = this.C[line[col]];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(col * s, row * s, s, s);
        }
      }
    }

    ctx.restore();

    // Draw particles
    for (const p of this.particles) {
      if (p.type === 'heart') {
        ctx.globalAlpha = p.life / 45;
        ctx.font = '13px serif';
        ctx.fillStyle = '#ff66aa';
        ctx.fillText('♥', p.x, p.y);
      } else {
        ctx.globalAlpha = p.life / 22;
        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(p.x, p.y, 3, 3);
        ctx.fillStyle = '#ff4400';
        ctx.fillRect(p.x + 1, p.y + 1, 2, 2);
      }
    }
    ctx.globalAlpha = 1;

    // Speech bubble
    if (this.state === 'purr') {
      this.drawBubble(ctx, 'мур-р-р~ ♥', '#ff77cc');
    } else if (this.state === 'angry') {
      this.drawBubble(ctx, 'Фш-ш-ш! >.<', '#ff3333');
    }
  },

  drawBubble(ctx, text, borderColor) {
    const spriteW = 16 * this.scale;
    const pad = 8;

    ctx.font = 'bold 12px Arial, sans-serif';
    const tw = ctx.measureText(text).width;
    const bw = tw + pad * 2;
    const bh = 24;

    // Position bubble to the right or left of cat depending on facing
    let bx = this.facing === 1 ? this.x + spriteW + 5 : this.x - bw - 5;
    // Keep on screen
    bx = Math.max(4, Math.min(bx, this.canvas.width - bw - 4));
    const by = 4;

    ctx.fillStyle = 'rgba(10, 10, 22, 0.88)';
    ctx.beginPath();
    this._roundRect(ctx, bx, by, bw, bh, 6);
    ctx.fill();

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, bx + pad, by + bh / 2 + 4);
  },

  _roundRect(ctx, x, y, w, h, r) {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  },

  // Public API
  walk() {
    this.state = 'walk';
    clearTimeout(this._timer);
  },

  purr() {
    this.state = 'purr';
    clearTimeout(this._timer);
    this._timer = setTimeout(() => this.walk(), 2500);
  },

  angry() {
    this.state = 'angry';
    clearTimeout(this._timer);
    this._timer = setTimeout(() => this.walk(), 2500);
  },
};
