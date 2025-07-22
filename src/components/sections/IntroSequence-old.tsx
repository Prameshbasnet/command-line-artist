import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

interface IntroSequenceProps {
  onComplete: () => void;
}

const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [text, setText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const phrases = [
    'INITIALIZING...',
    'LOADING CORE...',
    'SYSTEM READY.'
  ];

  useEffect(() => {
    const runIntroSequence = async () => {
      // Phase 1: Terminal boot sequence
      for (let i = 0; i < phrases.length; i++) {
        await typewriterEffect(phrases[i]);
        await new Promise(resolve => setTimeout(resolve, 200));
        setPhase(i + 1);
      }

      // Phase 2: Glitch effect
      await new Promise(resolve => setTimeout(resolve, 300));
      triggerGlitchEffect();

      // Phase 3: Logo formation
      await new Promise(resolve => setTimeout(resolve, 800));
      formLogo();

      // Phase 4: Fade to main content
      await new Promise(resolve => setTimeout(resolve, 800));
      onComplete();
    };

    runIntroSequence();
  }, []);

  const typewriterEffect = (phrase: string): Promise<void> => {
    return new Promise((resolve) => {
      let i = 0;
      const timer = setInterval(() => {
        setText(phrase.slice(0, i));
        i++;
        if (i > phrase.length) {
          clearInterval(timer);
          resolve();
        }
      }, 30);
    });
  };

  const triggerGlitchEffect = () => {
    const container = containerRef.current;
    if (!container) return;

    // Create glitch layers
    for (let i = 0; i < 5; i++) {
      const glitchLayer = container.cloneNode(true) as HTMLElement;
      glitchLayer.style.position = 'absolute';
      glitchLayer.style.top = '0';
      glitchLayer.style.left = '0';
      glitchLayer.style.zIndex = '10';
      glitchLayer.style.color = i % 2 === 0 ? '#ff0000' : '#00ff00';
      glitchLayer.style.opacity = '0.3';
      
      container.parentElement?.appendChild(glitchLayer);

      gsap.to(glitchLayer, {
        x: Math.random() * 20 - 10,
        y: Math.random() * 20 - 10,
        duration: 0.1,
        repeat: 10,
        yoyo: true,
        onComplete: () => {
          glitchLayer.remove();
        }
      });
    }
  };

  const formLogo = () => {
    const letters = 'COMMAND_LINE_ARTIST'.split('');
    const logoContainer = document.createElement('div');
    logoContainer.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'JetBrains Mono', monospace;
      font-size: 4rem;
      font-weight: bold;
      z-index: 100;
    `;

    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter === '_' ? ' ' : letter;
      span.style.cssText = `
        display: inline-block;
        color: #00ffff;
        text-shadow: 0 0 20px #00ffff;
        opacity: 0;
        transform: rotateY(90deg);
      `;
      logoContainer.appendChild(span);

      gsap.to(span, {
        opacity: 1,
        rotateY: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: "back.out(1.7)"
      });
    });

    document.body.appendChild(logoContainer);

    // Remove logo before transition
    setTimeout(() => {
      gsap.to(logoContainer, {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        onComplete: () => {
          logoContainer.remove();
        }
      });
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-2xl">
        {/* Skip Button */}
        <motion.button
          onClick={onComplete}
          className="absolute -top-12 right-0 text-gray-400 hover:text-white font-mono text-sm transition-colors z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          [SKIP] →
        </motion.button>

        {/* Terminal Window */}
        <div
          ref={containerRef}
          className="bg-black border-2 border-primary rounded-lg p-4 md:p-8 w-full shadow-neon"
        >
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-2 md:ml-4 text-xs md:text-sm text-gray-400 font-mono truncate">
              terminal@dev:~$
            </div>
          </div>

          <div ref={terminalRef} className="font-mono text-primary space-y-2 text-sm md:text-base">
            {phrases.slice(0, phase).map((phrase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
                className="flex items-center"
              >
                <span className="text-green-400 mr-2 text-xs md:text-base">›</span>
                <span className="break-all">{index === phase - 1 ? text : phrase}</span>
                {index === phase - 1 && (
                  <motion.span
                    animate={{ opacity: [0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="ml-1"
                  >
                    █
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-6 md:mt-8">
            <div className="bg-gray-800 rounded-full h-1.5 md:h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(phase / phrases.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
            <div className="text-right text-xs md:text-sm text-gray-400 mt-2 font-mono">
              {Math.round((phase / phrases.length) * 100)}% COMPLETE
            </div>
          </div>
        </div>

        {/* Particle effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: 0 
              }}
              animate={{ 
                y: -50,
                opacity: [0, 1, 0] 
              }}
              transition={{ 
                duration: 2,
                delay: Math.random() * 2,
                repeat: Infinity 
              }}
              className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-primary rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default IntroSequence;
