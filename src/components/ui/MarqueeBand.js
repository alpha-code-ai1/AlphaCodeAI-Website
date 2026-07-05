// Infinite scrolling neon text band used as a section divider.
// `reverse` flips direction, `angle` tilts the whole strip.
const MarqueeBand = ({ items, reverse = false, angle = 0 }) => {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div
      className="relative z-10 overflow-hidden border-y border-brand-violet/15 bg-canvas-soft/60 py-3 backdrop-blur-sm sm:py-4"
      // Only scale up when tilted (to cover the corners); a straight band at
      // scale 1.05 would be wider than the screen and cause horizontal scroll.
      style={angle ? { transform: `rotate(${angle}deg) scale(1.05)` } : undefined}
    >
      <div
        className={`flex w-max items-center gap-6 whitespace-nowrap sm:gap-10 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-6 sm:gap-10">
            <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-white/70 sm:text-base">
              {item}
            </span>
            <span className="animate-neon-pulse text-brand-cyan">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBand;
