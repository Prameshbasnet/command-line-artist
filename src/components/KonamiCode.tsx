import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import React, { useEffect, useState } from 'react';

const KonamiCode: React.FC = () => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const newSequence = [...sequence, event.code].slice(-konamiCode.length);
      setSequence(newSequence);

      if (newSequence.join(',') === konamiCode.join(',')) {
        setActivated(true);
        triggerEasterEgg();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [sequence]);

  const triggerEasterEgg = () => {
    // Matrix rain effect
    const chars = '01デジタルコードハッカー'.split('');
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.8);
    `;

    for (let i = 0; i < 20; i++) {
      const column = document.createElement('div');
      column.style.cssText = `
        position: absolute;
        left: ${i * 5}%;
        top: -100px;
        color: #00ff00;
        font-family: 'JetBrains Mono', monospace;
        font-size: 14px;
        opacity: 0.7;
      `;

      for (let j = 0; j < 20; j++) {
        const char = document.createElement('div');
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.marginBottom = '10px';
        column.appendChild(char);
      }

      container.appendChild(column);

      gsap.to(column, {
        y: window.innerHeight + 200,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        ease: "none",
        onComplete: () => {
          if (column.parentNode) {
            column.parentNode.removeChild(column);
          }
        }
      });
    }

    document.body.appendChild(container);

    // Remove after animation
    setTimeout(() => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      setActivated(false);
      setSequence([]);
    }, 5000);
  };

  return (
    <>
      {activated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10000] pointer-events-none"
        >
          <div className="text-6xl font-mono text-green-400 animate-pulse">
            HACK THE PLANET
          </div>
        </motion.div>
      )}
    </>
  );
};

export default KonamiCode;
