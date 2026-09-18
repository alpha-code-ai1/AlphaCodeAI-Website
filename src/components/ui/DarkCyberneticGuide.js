import { motion } from 'framer-motion';
import { useLayoutEffect, useRef } from 'react';
import { createFrameScrubber } from './frameScrubber';

const SPRITE_SRC = `${process.env.PUBLIC_URL}/cybernetic-guide-sprite.webp?v=5`;
const FRAME_COUNT = 97;
const SPRITE_COLUMNS = 10;
const SPRITE_ROWS = 10;
const INITIAL_FRAME = 48;

const getFramePosition = (frameIndex) => ({
  backgroundPosition: `${((frameIndex % SPRITE_COLUMNS) / (SPRITE_COLUMNS - 1)) * 100}% ${(
    (Math.floor(frameIndex / SPRITE_COLUMNS) / (SPRITE_ROWS - 1)) *
    100
  )}%`
});

const DarkCyberneticGuide = () => {
  const guideRef = useRef(null);
  const spriteRef = useRef(null);

  useLayoutEffect(() => {
    const sprite = spriteRef.current;
    const scrubber = createFrameScrubber((frameIndex) => {
      const { backgroundPosition } = getFramePosition(frameIndex);
      sprite.style.backgroundPosition = backgroundPosition;
      sprite.dataset.frame = String(frameIndex);
    }, {
      frameCount: FRAME_COUNT,
      getViewportWidth: () => window.innerWidth,
      requestFrame: (callback) => window.requestAnimationFrame(callback),
      cancelFrame: (frameId) => window.cancelAnimationFrame(frameId)
    });

    const handlePointerMove = (event) => scrubber.scrubTo(event.clientX);
    const handleTouchMove = (event) => {
      const touch = event.touches?.[0] || event.changedTouches?.[0];
      if (!touch) return;
      scrubber.scrubTo(touch.clientX);
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchMove);
      scrubber.destroy();
    };
  }, []);

  return (
    <motion.figure
      ref={guideRef}
      role="img"
      aria-label="AlphaCodeAI cybernetic guide"
      className="cyber-guide"
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="cyber-guide__tracker">
        <div className="cyber-guide__halo" aria-hidden="true" />
        <div className="cyber-guide__frame">
          <div
            ref={spriteRef}
            className="cyber-guide__sprite"
            data-cursor-media
            data-frame={INITIAL_FRAME}
            style={{
              backgroundImage: `url(${SPRITE_SRC})`,
              ...getFramePosition(INITIAL_FRAME)
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </motion.figure>
  );
};

export default DarkCyberneticGuide;
