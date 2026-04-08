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
  scale: 18,        // 16*18 = 288px wide, 16*18 = 288px tall (sprite is ~16 rows)
  _timer: null,
  particles: [],

  // Color palette
  C: {
    '.': null,
    'B': '#111111',  // black outline
    'O': '#cc6820',  // dark orange (ear shadow, accent)
    'L': '#e8904a',  // main orange body
    'F': '#f5b460',  // light orange highlight
    'W': '#f0f0f0',  // white (eyes)
    'P': '#ff8888',  // pink (nose, inner ears)
    'G': '#aaaaaa',  // gray (tail tip)
    'N': '#222222',  // dark (pupil)
  },

  // ─────────────────────────────────────────────────────────────
  //  Sprites: 16 columns × 16 rows, cat facing RIGHT
  //
  //  Layout (per row):
  //   0-1  : pointy ears
  //   2-7  : round head (eyes, nose, chin)
  //   8-9  : neck → body
  //  10-12 : body + tail on left side
  //  13-15 : legs / feet
  // ─────────────────────────────────────────────────────────────
  SPRITES: {

    // ── WALK ──────────────────────────────────────────────────
    walk: [
      [   // frame 0: left leg forward
        // 0123456789012345
        '....BB....BB....',  //  0  two pointy ears (cols 4-5, 10-11)
        '...BPPB..BPPB...',  //  1  ear inner pink
        '...BLLBBBBLLB...',  //  2  head top — ears merge into skull
        '..BLLLLLLLLLLB..',  //  3  head wide row
        '..BLLWWLLLWWLB..',  //  4  eyes: WW = white (left cols 5-6, right cols 10-11)
        '..BLLWNLLLWNLB..',  //  5  pupils: N = dark dot (right side of each eye)
        '..BLLLLLPLLLLLB.',  //  6  nose: P = pink centre (col 9)
        '..BLLLLBBBLLLLB.',  //  7  mouth: BBB = tiny frown line
        '...BBBBBBBBBB...',  //  8  chin / bottom of head
        '...BLLLLLLLLB...',  //  9  neck
        'BGBLLLLLLLLLLLB.',  // 10  body (BGB = tail left, body to right)
        'BGBLLLLLLLLLLLB.',  // 11  body
        '.BGBB...........',  // 12  tail curves left-up
        '....BB.....BB...',  // 13  legs: front pair + back pair
        '....B......B....',  // 14  feet
        '................',  // 15  ground clearance
      ],
      [   // frame 1: right leg forward (legs shifted)
        '....BB....BB....',  //  0
        '...BPPB..BPPB...',  //  1
        '...BLLBBBBLLB...',  //  2
        '..BLLLLLLLLLLB..',  //  3
        '..BLLWWLLLWWLB..',  //  4
        '..BLLWNLLLWNLB..',  //  5
        '..BLLLLLPLLLLLB.',  //  6
        '..BLLLLBBBLLLLB.',  //  7
        '...BBBBBBBBBB...',  //  8
        '...BLLLLLLLLB...',  //  9
        'BGBLLLLLLLLLLLB.',  // 10
        'BGBLLLLLLLLLLLB.',  // 11
        '.BGBB...........',  // 12
        '..BB.......BB...',  // 13  legs shifted
        '..B.........B...',  // 14
        '................',  // 15
      ],
    ],

    // ── PURR (sitting, happy face) ────────────────────────────
    purr: [
      [   // frame 0: tail up
        '....BB....BB....',  //  0
        '...BPPB..BPPB...',  //  1
        '...BLLBBBBLLB...',  //  2
        '..BLLLLLLLLLLB..',  //  3
        '..BLLWWLLLWWLB..',  //  4
        '..BLLWNLLLWNLB..',  //  5
        '..BLLLLWPLLLLLB.',  //  6  W = happy-mouth corner, P = nose
        '..BLLLLWWWLLLLB.',  //  7  WWW = wide smile curve
        '...BBBBBBBBBB...',  //  8
        '...BLLLLLLLLB...',  //  9
        'BGBLLLLLLLLLLLB.',  // 10
        'BGBLLLLLLLLLLLB.',  // 11
        'BGB.............',  // 12  tail up (straight left)
        '....BBBB.BBBB...',  // 13  sitting paws
        '....BLLL.LLLB...',  // 14  paw interior
        '................',  // 15
      ],
      [   // frame 1: tail slightly different
        '....BB....BB....',  //  0
        '...BPPB..BPPB...',  //  1
        '...BLLBBBBLLB...',  //  2
        '..BLLLLLLLLLLB..',  //  3
        '..BLLWWLLLWWLB..',  //  4
        '..BLLWNLLLWNLB..',  //  5
        '..BLLLLWPLLLLLB.',  //  6
        '..BLLLLWWWLLLLB.',  //  7
        '...BBBBBBBBBB...',  //  8
        '...BLLLLLLLLB...',  //  9
        'BGBLLLLLLLLLLLB.',  // 10
        'BGBLLLLLLLLLLLB.',  // 11
        '.BGB............',  // 12  tail shifted
        '....BBBB.BBBB...',  // 13
        '....BLLL.LLLB...',  // 14
        '................',  // 15
      ],
    ],

    // ── ANGRY (arched back, narrowed eyes, frown) ─────────────
    angry: [
      [   // frame 0
        '..BB.......BB...',  //  0  ears wide apart (alert / scared-angry)
        '.BPPB.....BPPB..',  //  1  ear inner
        '..BBLLLLLLLBB...',  //  2  puffed head top (BB = fur spikes on edges)
        '..BLLLLLLLLLLB..',  //  3
        '..BBBWLLLWBBB...',  //  4  eyes: BBB = heavy furrowed brows, W = narrow slits
        '..BLLWNLLLWNLB..',  //  5  pupils same
        '..BLLLLPBBBLLB..',  //  6  nose + angry-mouth BBB = straight frown
        '..BLLLLBBBLLLLB.',  //  7  deeper frown
        '...BBBBBBBBBB...',  //  8
        '..BBLLLLLLLLBB..',  //  9  neck puffed
        'BGBBLLLLLLLLBBB.',  // 10  body arched (extra B on both sides)
        'BGBBLLLLLLLBBBB.',  // 11
        'BGBB............',  // 12  tail stiff (straight left)
        '.BB.BB.BB.......',  // 13  three-legged alert stance
        '..B..B..B.......',  // 14  feet spread
        '................',  // 15
      ],
      [   // frame 1: slight leg shift
        '..BB.......BB...',  //  0
        '.BPPB.....BPPB..',  //  1
        '..BBLLLLLLLBB...',  //  2
        '..BLLLLLLLLLLB..',  //  3
        '..BBBWLLLWBBB...',  //  4
        '..BLLWNLLLWNLB..',  //  5
        '..BLLLLPBBBLLB..',  //  6
        '..BLLLLBBBLLLLB.',  //  7
        '...BBBBBBBBBB...',  //  8
        '..BBLLLLLLLLBB..',  //  9
        'BGBBLLLLLLLLBBB.',  // 10
        'BGBBLLLLLLLBBBB.',  // 11
        'BGBB............',  // 12
        '..BB.BB.BB......',  // 13  slightly shifted
        '...B..B..B......',  // 14
        '................',  // 15
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
      height: '310px',
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
    this.canvas.height = 310;
    if (this.x > this.canvas.width - 80) this.x = this.canvas.width - 100;
  },

  loop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.loop());
  },

  update() {
    if (this.state === 'walk') {
      this.x += this.vx;
      if (this.x > this.canvas.width - 70) this.vx = -Math.abs(this.vx);
      if (this.x < 5) this.vx = Math.abs(this.vx);
      this.facing = this.vx >= 0 ? 1 : -1;
    }

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

    // Hearts for purr
    if (this.state === 'purr' && Math.random() < 0.12) {
      const headX = this.facing === 1 ? this.x + 60 : this.x + 5;
      this.particles.push({
        x: headX + (Math.random() - 0.5) * 20,
        y: this.canvas.height - 200,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -1.5 - Math.random(),
        life: 50,
        type: 'heart',
      });
    }

    // Sparks for angry
    if (this.state === 'angry' && Math.random() < 0.2) {
      const headX = this.facing === 1 ? this.x + 60 : this.x + 5;
      this.particles.push({
        x: headX + (Math.random() - 0.5) * 20,
        y: this.canvas.height - 220,
        vx: (Math.random() - 0.5) * 3,
        vy: -2 - Math.random() * 1.5,
        life: 25,
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

    // Particles
    for (const p of this.particles) {
      if (p.type === 'heart') {
        ctx.globalAlpha = p.life / 50;
        ctx.font = '18px serif';
        ctx.fillStyle = '#ff66bb';
        ctx.fillText('♥', p.x, p.y);
      } else {
        ctx.globalAlpha = p.life / 25;
        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(p.x, p.y, 4, 4);
        ctx.fillStyle = '#ff4400';
        ctx.fillRect(p.x + 1, p.y + 1, 3, 3);
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
    const pad = 10;
    ctx.font = 'bold 14px Arial, sans-serif';
    const tw = ctx.measureText(text).width;
    const bw = tw + pad * 2;
    const bh = 30;

    let bx = this.facing === 1 ? this.x + spriteW + 8 : this.x - bw - 8;
    bx = Math.max(4, Math.min(bx, this.canvas.width - bw - 4));
    const by = 20;

    ctx.fillStyle = 'rgba(8, 8, 20, 0.88)';
    ctx.beginPath();
    this._roundRect(ctx, bx, by, bw, bh, 7);
    ctx.fill();

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, bx + pad, by + bh / 2 + 5);
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
