import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

interface IntroSequenceProps {
  onComplete: () => void;
}

const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [showMainText, setShowMainText] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runIntroSequence = async () => {
      // Phase 1: Dramatic pause with cursor reveal
      await new Promise(resolve => setTimeout(resolve, 800));
      setPhase(1);
      setCursorText('{ }');

      // Phase 2: Code artist arrival
      await new Promise(resolve => setTimeout(resolve, 1200));
      setPhase(2);
      setCursorText('< artist />');

      // Phase 3: Main typography reveal
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowMainText(true);
      setCursorText('[ creating ]');

      // Phase 4: Final transition
      await new Promise(resolve => setTimeout(resolve, 2500));
      setCursorText('✨');
      
      await new Promise(resolve => setTimeout(resolve, 800));
      onComplete();
    };

    runIntroSequence();
  }, [onComplete]);

  const glitchVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0.8, 1],
      x: [0, -2, 2, 0],
      transition: {
        duration: 0.3,
        repeat: 2
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)"
      }}
      transition={{ duration: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
      className="fixed inset-0 bg-black z-50 overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3
            }}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen relative">
        <div className="text-center max-w-7xl mx-auto px-4">
          
          {/* Phase Indicators */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-12 left-1/2 transform -translate-x-1/2"
              >
                <div className="font-mono text-cyan-400 text-sm tracking-wider">
                  [ INITIALIZING_CREATIVE_CORE ]
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="mb-12"
              >
                <motion.div
                  variants={glitchVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-mono text-lg md:text-xl text-cyan-400 tracking-widest"
                >
                  &gt; CODE_ARTIST.ENTER()
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Typography */}
          <AnimatePresence>
            {showMainText && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* PRAMESH */}
                <div className="overflow-hidden">
                  <motion.h1 className="text-8xl md:text-[12rem] lg:text-[16rem] font-black tracking-tighter leading-none">
                    {"PRAMESH".split('').map((letter, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 100, rotateX: -90, scale: 0.3 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                        transition={{ 
                          delay: i * 0.1,
                          duration: 0.8,
                          ease: "easeOut"
                        }}
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400"
                        style={{
                          backgroundSize: '200% 100%',
                          animation: 'gradient-shift 3s ease infinite'
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </motion.h1>
                </div>

                {/* BASNET */}
                <div className="overflow-hidden">
                  <motion.h1 className="text-8xl md:text-[12rem] lg:text-[16rem] font-black tracking-tighter leading-none">
                    {"BASNET".split('').map((letter, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 100, rotateX: -90, scale: 0.3 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                        transition={{ 
                          delay: (i + 7) * 0.1,
                          duration: 0.8,
                          ease: "easeOut"
                        }}
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-purple-400"
                        style={{
                          backgroundSize: '200% 100%',
                          animation: 'gradient-shift 3s ease infinite'
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </motion.h1>
                </div>

                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="space-y-4"
                >
                  <div className="font-mono text-2xl md:text-4xl text-cyan-400 tracking-widest">
                    SOFTWARE_ENGINEER
                  </div>
                  
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 2.5, duration: 1.5 }}
                    className="h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mx-auto max-w-lg"
                  />
                  
                  <div className="font-mono text-lg md:text-xl text-gray-400 tracking-wider">
                    .NET_CORE | REACT.JS | BANKING_SOLUTIONS
                  </div>
                </motion.div>

                {/* Skip Button */}
                <motion.button
                  onClick={onComplete}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ delay: 3 }}
                  className="absolute bottom-12 right-12 font-mono text-cyan-400 hover:text-white transition-colors tracking-wider"
                >
                  [ SKIP_INTRO ]
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Code Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {['{', '}', '<', '>', '[', ']', '(', ')', ';', '=', '+', '-'].map((symbol, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                  scale: 0
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  y: [null, -100],
                  scale: [0, 1, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 4,
                  delay: Math.random() * 3 + 1,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2
                }}
                className="absolute text-4xl md:text-6xl font-mono text-cyan-400/20"
              >
                {symbol}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Styles for Gradient Animation */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.div>
  );
};

export default IntroSequence;
