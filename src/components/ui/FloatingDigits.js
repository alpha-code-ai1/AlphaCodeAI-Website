import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const rand = (min, max) => Math.random() * (max - min) + min;
const colors = ['#6366F1', '#22D3EE', '#8B5CF6', '#E879F9'];

const makeItem = () => {
  // Single digits only (0–9)
  const text = Math.floor(rand(0, 10)).toString();

  return {
    id: Math.random().toString(36).slice(2),
    x: rand(3, 94),
    y: rand(6, 90),
    text,
    size: rand(0.85, 1.9),
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: rand(0.28, 0.6)
  };
};

const COUNT = 18;

// Numbers/digits that randomly fade in and out across the hero background.
const FloatingDigits = () => {
  const [items, setItems] = useState(() => Array.from({ length: COUNT }, makeItem));

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        // Replace a few random slots each tick → continuous appear/disappear
        for (let i = 0; i < 4; i++) {
          next[Math.floor(Math.random() * next.length)] = makeItem();
        }
        return next;
      });
    }, 850);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden font-mono font-semibold">
      <AnimatePresence>
        {items.map((it) => (
          <motion.span
            key={it.id}
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(2px)' }}
            animate={{ opacity: it.opacity, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.5, filter: 'blur(2px)' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute select-none tracking-tight"
            style={{
              left: `${it.x}%`,
              top: `${it.y}%`,
              fontSize: `${it.size}rem`,
              color: it.color
            }}
          >
            {it.text}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingDigits;
