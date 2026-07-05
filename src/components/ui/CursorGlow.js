import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Glass Rubik's cube cursor.
//
// Structural integrity: a horizontal layer can only legally rotate around the
// vertical axis, and a vertical column around a horizontal axis. So the cube
// is built twice — once as 3 stacked layers (performing Y-turns) and once as
// 3 side-by-side columns (performing X-turns). The two are overlaid and
// visibility swaps at the exact keyframes where both are complete cubes at
// rest, so it always reads as one solid cube being solved: three horizontal
// moves, then three vertical moves, forever.
const S = 27; // cube size (px)
const T = S / 3; // slice thickness

const TILE_BG =
  'linear-gradient(135deg, rgba(139,92,246,0.45), rgba(34,211,238,0.28))';

const FaceGrid = ({ w, h, cols, rows, transform, x = 0, y = 0 }) => (
  <div
    className="absolute grid"
    style={{
      width: w,
      height: h,
      left: x,
      top: y,
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gap: 1,
      padding: 0.5,
      transform,
      background: 'rgba(255,255,255,0.05)'
    }}
  >
    {Array.from({ length: cols * rows }).map((_, i) => (
      <span
        key={i}
        style={{
          background: TILE_BG,
          border: '0.5px solid rgba(255,255,255,0.35)',
          borderRadius: 1
        }}
      />
    ))}
  </div>
);

// Horizontal layer (S wide × T tall × S deep) — rotates around Y
const HLayer = ({ index }) => (
  <div
    className="absolute left-0"
    style={{
      top: index * T,
      width: S,
      height: T,
      transformStyle: 'preserve-3d',
      animation: `slice-h-${index} 12s ease-in-out infinite`
    }}
  >
    <FaceGrid w={S} h={T} cols={3} rows={1} transform={`translateZ(${S / 2}px)`} />
    <FaceGrid w={S} h={T} cols={3} rows={1} transform={`rotateY(180deg) translateZ(${S / 2}px)`} />
    <FaceGrid w={S} h={T} cols={3} rows={1} transform={`rotateY(90deg) translateZ(${S / 2}px)`} />
    <FaceGrid w={S} h={T} cols={3} rows={1} transform={`rotateY(-90deg) translateZ(${S / 2}px)`} />
    <FaceGrid w={S} h={S} cols={3} rows={3} y={(T - S) / 2} transform={`rotateX(90deg) translateZ(${T / 2}px)`} />
    <FaceGrid w={S} h={S} cols={3} rows={3} y={(T - S) / 2} transform={`rotateX(-90deg) translateZ(${T / 2}px)`} />
  </div>
);

// Vertical column (T wide × S tall × S deep) — rotates around X
const VColumn = ({ index }) => (
  <div
    className="absolute top-0"
    style={{
      left: index * T,
      width: T,
      height: S,
      transformStyle: 'preserve-3d',
      animation: `slice-v-${index} 12s ease-in-out infinite`
    }}
  >
    <FaceGrid w={T} h={S} cols={1} rows={3} transform={`translateZ(${S / 2}px)`} />
    <FaceGrid w={T} h={S} cols={1} rows={3} transform={`rotateY(180deg) translateZ(${S / 2}px)`} />
    <FaceGrid w={S} h={S} cols={3} rows={3} x={(T - S) / 2} transform={`rotateY(90deg) translateZ(${T / 2}px)`} />
    <FaceGrid w={S} h={S} cols={3} rows={3} x={(T - S) / 2} transform={`rotateY(-90deg) translateZ(${T / 2}px)`} />
    <FaceGrid w={T} h={S} cols={1} rows={3} transform={`rotateX(90deg) translateZ(${S / 2}px)`} />
    <FaceGrid w={T} h={S} cols={1} rows={3} transform={`rotateX(-90deg) translateZ(${S / 2}px)`} />
  </div>
);

const CursorGlow = () => {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const glowX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });
  const cubeX = useSpring(x, { stiffness: 420, damping: 32 });
  const cubeY = useSpring(y, { stiffness: 420, damping: 32 });

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    // Desktop pointers only — on touch devices this repainted on every scroll
    // touch and caused visible flicker.
    if (reduce.matches || !finePointer.matches) return undefined;
    setEnabled(true);
    // Mouse: follows the cursor. Touch: jumps to the last touched location
    // (pointerdown) and rides along while dragging (pointermove).
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', move);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Big soft ambient glow */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none fixed left-0 top-0 z-[5] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        aria-hidden
      >
        <div className="h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.35),rgba(34,211,238,0.12)_45%,transparent_70%)]" />
      </motion.div>

      {/* Self-solving glass Rubik's cube */}
      <motion.div
        style={{ x: cubeX, y: cubeY }}
        className="pointer-events-none fixed left-0 top-0 z-[65]"
        aria-hidden
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2"
          style={{ perspective: 320, filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.55))' }}
        >
          <div
            className="relative"
            style={{
              width: S,
              height: S,
              transformStyle: 'preserve-3d',
              transform: 'rotateX(-26deg) rotateY(-38deg)'
            }}
          >
            {/* Layered build: horizontal moves (visible first half) */}
            <div
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d', animation: 'cube-h-vis 12s step-end infinite' }}
            >
              <HLayer index={0} />
              <HLayer index={1} />
              <HLayer index={2} />
            </div>
            {/* Column build: vertical moves (visible second half) */}
            <div
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d', animation: 'cube-v-vis 12s step-end infinite' }}
            >
              <VColumn index={0} />
              <VColumn index={1} />
              <VColumn index={2} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CursorGlow;
