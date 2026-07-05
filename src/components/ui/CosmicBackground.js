import { useEffect, useRef } from 'react';

// Site-wide fixed starfield: twinkling stars, occasional shooting stars, and a
// slow parallax drift tied to scroll. Canvas-based so hundreds of particles stay
// cheap; density scales down on small screens and everything stops for
// prefers-reduced-motion users.
const CosmicBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let stars = [];
    let meteors = [];
    let raf;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = width < 640 ? 14000 : 9000;
      const count = Math.floor((width * height) / density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        depth: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.9 + 0.4,
        hue: [265, 190, 300, 230][Math.floor(Math.random() * 4)]
      }));
    };

    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width * 0.9,
        y: Math.random() * height * 0.35,
        vx: 6 + Math.random() * 6,
        vy: 3 + Math.random() * 3,
        life: 1
      });
    };

    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);
      const scrollShift = (window.scrollY || 0) * 0.06;

      for (const s of stars) {
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(s.phase + t * s.speed));
        const y = (s.y - scrollShift * s.depth + height) % height;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 90%, 78%, ${tw * s.depth})`;
        ctx.fill();
      }

      if (!reduceMotion && Math.random() < 0.006 && meteors.length < 3) spawnMeteor();
      meteors = meteors.filter((m) => m.life > 0);
      for (const m of meteors) {
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 12, m.y - m.vy * 12);
        grad.addColorStop(0, `rgba(190, 242, 255, ${m.life})`);
        grad.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 12, m.y - m.vy * 12);
        ctx.stroke();
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.02;
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    if (reduceMotion) {
      // Single static frame — stars visible, nothing moves
      t = 1;
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 90%, 78%, ${0.5 * s.depth})`;
        ctx.fill();
      }
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Deep space base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#12063a_0%,#050014_55%,#020009_100%)]" />

      {/* Drifting nebula orbs */}
      <div className="orb h-[40rem] w-[40rem] -left-40 -top-40 animate-wobble bg-brand-violet/15" />
      <div className="orb h-[34rem] w-[34rem] right-[-8rem] top-1/4 animate-aurora bg-brand-cyan/10 [animation-delay:-5s]" />
      <div className="orb h-[30rem] w-[30rem] left-1/4 bottom-[-8rem] animate-wobble bg-brand-fuchsia/10 [animation-delay:-9s]" />

      {/* Star canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Slow rotating conic sweep */}
      <div
        className="absolute left-1/2 top-1/2 h-[80rem] w-[80rem] -translate-x-1/2 -translate-y-1/2 animate-spin-slower rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(139,92,246,0.25), transparent 30%, rgba(34,211,238,0.18) 50%, transparent 70%, rgba(232,121,249,0.2) 85%, rgba(139,92,246,0.25))'
        }}
      />
    </div>
  );
};

export default CosmicBackground;
