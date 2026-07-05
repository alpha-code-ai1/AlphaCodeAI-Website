import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// 3D perspective tilt that follows the pointer, with a moving glare highlight.
// On touch devices the tilt simply never triggers (no pointer hover events),
// so cards behave like normal tappable elements.
const TiltCard = ({ children, className = '', maxTilt = 10 }) => {
  const ref = useRef(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, visible: false });

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 260, damping: 22 });
  const sry = useSpring(ry, { stiffness: 260, damping: 22 });
  const transform = useTransform(
    [srx, sry],
    ([a, b]) => `perspective(900px) rotateX(${a}deg) rotateY(${b}deg)`
  );

  const onPointerMove = (e) => {
    if (e.pointerType === 'touch') return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * maxTilt * 2);
    rx.set((0.5 - py) * maxTilt * 2);
    setGlare({ x: px * 100, y: py * 100, visible: true });
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    setGlare((g) => ({ ...g, visible: false }));
  };

  return (
    <motion.div
      ref={ref}
      style={{ transform, transformStyle: 'preserve-3d' }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={`relative ${className}`}
    >
      {children}
      {/* Pointer-tracked glare */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: glare.visible ? 1 : 0,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.14), transparent 55%)`
        }}
      />
    </motion.div>
  );
};

export default TiltCard;
