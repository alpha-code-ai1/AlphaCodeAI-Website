import { useEffect, useRef, useState } from 'react';
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

const LIGHT_TILE_COLORS = [
  ['#ff5a3d', '#ff8a2b'],
  ['#ffd43b', '#ffb21a'],
  ['#31d6b3', '#0db9c5'],
  ['#3157f5', '#6886ff'],
  ['#f14c9d', '#ff78b8'],
  ['#8b5cf6', '#b37aff']
];

const FaceGrid = ({ w, h, cols, rows, transform, theme, x = 0, y = 0 }) => (
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
        data-cube-tile
        data-cube-color={theme === 'light' ? i % LIGHT_TILE_COLORS.length : 'dark'}
        style={{
          background:
            theme === 'light'
              ? `linear-gradient(135deg, ${LIGHT_TILE_COLORS[i % LIGHT_TILE_COLORS.length][0]}, ${LIGHT_TILE_COLORS[i % LIGHT_TILE_COLORS.length][1]})`
              : TILE_BG,
          border:
            theme === 'light'
              ? '0.5px solid rgba(16,23,40,0.42)'
              : '0.5px solid rgba(255,255,255,0.35)',
          borderRadius: 1,
          boxShadow: theme === 'light' ? 'inset 0 0 3px rgba(255,255,255,0.42)' : 'none'
        }}
      />
    ))}
  </div>
);

// Horizontal layer (S wide × T tall × S deep) — rotates around Y
const HLayer = ({ index, theme }) => (
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
    <FaceGrid w={S} h={T} cols={3} rows={1} theme={theme} transform={`translateZ(${S / 2}px)`} />
    <FaceGrid w={S} h={T} cols={3} rows={1} theme={theme} transform={`rotateY(180deg) translateZ(${S / 2}px)`} />
    <FaceGrid w={S} h={T} cols={3} rows={1} theme={theme} transform={`rotateY(90deg) translateZ(${S / 2}px)`} />
    <FaceGrid w={S} h={T} cols={3} rows={1} theme={theme} transform={`rotateY(-90deg) translateZ(${S / 2}px)`} />
    <FaceGrid w={S} h={S} cols={3} rows={3} theme={theme} y={(T - S) / 2} transform={`rotateX(90deg) translateZ(${T / 2}px)`} />
    <FaceGrid w={S} h={S} cols={3} rows={3} theme={theme} y={(T - S) / 2} transform={`rotateX(-90deg) translateZ(${T / 2}px)`} />
  </div>
);

// Vertical column (T wide × S tall × S deep) — rotates around X
const VColumn = ({ index, theme }) => (
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
    <FaceGrid w={T} h={S} cols={1} rows={3} theme={theme} transform={`translateZ(${S / 2}px)`} />
    <FaceGrid w={T} h={S} cols={1} rows={3} theme={theme} transform={`rotateY(180deg) translateZ(${S / 2}px)`} />
    <FaceGrid w={S} h={S} cols={3} rows={3} theme={theme} x={(T - S) / 2} transform={`rotateY(90deg) translateZ(${T / 2}px)`} />
    <FaceGrid w={S} h={S} cols={3} rows={3} theme={theme} x={(T - S) / 2} transform={`rotateY(-90deg) translateZ(${T / 2}px)`} />
    <FaceGrid w={T} h={S} cols={1} rows={3} theme={theme} transform={`rotateX(90deg) translateZ(${S / 2}px)`} />
    <FaceGrid w={T} h={S} cols={1} rows={3} theme={theme} transform={`rotateX(-90deg) translateZ(${S / 2}px)`} />
  </div>
);

const CursorGlow = ({ theme = 'dark' }) => {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const glowX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });
  const cubeX = useSpring(x, { stiffness: 420, damping: 32 });
  const cubeY = useSpring(y, { stiffness: 420, damping: 32 });
  const rotationX = useMotionValue(-26);
  const rotationY = useMotionValue(-38);
  const cubeRotationX = useSpring(rotationX, { stiffness: 260, damping: 24 });
  const cubeRotationY = useSpring(rotationY, { stiffness: 260, damping: 24 });
  const lastPointer = useRef(null);

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
      const previous = lastPointer.current;
      if (previous) {
        rotationX.set(rotationX.get() - (e.clientY - previous.y) * 0.34);
        rotationY.set(rotationY.get() + (e.clientX - previous.x) * 0.34);
      }
      lastPointer.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', move);
    };
  }, [rotationX, rotationY, x, y]);

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
        className="cursor-cube pointer-events-none fixed left-0 top-0 z-[65]"
        data-cursor-theme={theme}
        aria-hidden
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2"
          style={{
            perspective: 320,
            filter:
              theme === 'light'
                ? 'drop-shadow(2px 3px 1px rgba(16,23,40,0.35))'
                : 'drop-shadow(0 0 8px rgba(139,92,246,0.55))'
          }}
        >
          <motion.div
            className="relative"
            style={{
              width: S,
              height: S,
              transformStyle: 'preserve-3d',
              rotateX: cubeRotationX,
              rotateY: cubeRotationY
            }}
          >
            {/* Layered build: horizontal moves (visible first half) */}
            <div
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d', animation: 'cube-h-vis 12s step-end infinite' }}
            >
              <HLayer index={0} theme={theme} />
              <HLayer index={1} theme={theme} />
              <HLayer index={2} theme={theme} />
            </div>
            {/* Column build: vertical moves (visible second half) */}
            <div
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d', animation: 'cube-v-vis 12s step-end infinite' }}
            >
              <VColumn index={0} theme={theme} />
              <VColumn index={1} theme={theme} />
              <VColumn index={2} theme={theme} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default CursorGlow;
