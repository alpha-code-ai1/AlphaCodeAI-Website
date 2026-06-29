import FloatingDigits from './FloatingDigits';

// Animated hero background — pure CSS + light JS, instant load (replaced the old 20MB video).
// Layers: panning grid, rotating conic glow, drifting orbs, floating digits, twinkling particles.

// Deterministic-ish scatter of floating particles
const particles = [
  { left: '12%', top: '22%', size: 6, delay: '0s', dur: '7s' },
  { left: '24%', top: '68%', size: 4, delay: '1.2s', dur: '9s' },
  { left: '38%', top: '35%', size: 5, delay: '0.6s', dur: '8s' },
  { left: '52%', top: '78%', size: 7, delay: '2s', dur: '10s' },
  { left: '63%', top: '28%', size: 4, delay: '0.3s', dur: '7.5s' },
  { left: '74%', top: '60%', size: 6, delay: '1.8s', dur: '9.5s' },
  { left: '85%', top: '40%', size: 5, delay: '0.9s', dur: '8.5s' },
  { left: '46%', top: '18%', size: 4, delay: '2.4s', dur: '11s' },
  { left: '18%', top: '48%', size: 5, delay: '1.5s', dur: '8s' },
  { left: '90%', top: '72%', size: 6, delay: '0.4s', dur: '10s' }
];

const AuroraBackground = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Slowly panning technical grid */}
      <div className="absolute inset-0 animate-grid-pan bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_at_center,black_22%,transparent_72%)]" />

      {/* Rotating conic light sweep */}
      <div
        className="absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(139,92,246,0.22), rgba(34,211,238,0.18), rgba(232,121,249,0.18), rgba(99,102,241,0.22), rgba(139,92,246,0.22))'
        }}
      />

      {/* Drifting orbs */}
      <div className="orb animate-aurora h-[38rem] w-[38rem] -left-24 -top-32 bg-brand-violet/40" />
      <div className="orb animate-aurora h-[32rem] w-[32rem] right-[-6rem] top-0 bg-brand-cyan/35 [animation-delay:-6s]" />
      <div className="orb animate-aurora h-[28rem] w-[28rem] left-1/3 bottom-[-10rem] bg-brand-fuchsia/30 [animation-delay:-3s]" />
      <div className="orb animate-float-slow h-[22rem] w-[22rem] right-1/4 top-1/3 bg-brand-blue/25" />

      {/* Numbers & digits randomly appearing / disappearing */}
      <FloatingDigits />

      {/* Twinkling particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-brand-indigo/70 shadow-[0_0_8px_rgba(99,102,241,0.6)] animate-twinkle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.dur
          }}
        />
      ))}

      {/* Fade content area into the canvas so text stays crisp */}
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/20 via-transparent to-canvas" />
    </div>
  );
};

export default AuroraBackground;
