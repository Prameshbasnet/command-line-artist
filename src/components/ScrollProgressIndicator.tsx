import { motion, useScroll, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgressIndicator = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Create scroll-triggered animations for different sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          // Update progress indicator color based on section
          if (progressRef.current) {
            const colors = [
              'linear-gradient(90deg, #06b6d4, #8b5cf6)', // cyan to purple
              'linear-gradient(90deg, #8b5cf6, #ec4899)', // purple to pink
              'linear-gradient(90deg, #ec4899, #f59e0b)', // pink to amber
              'linear-gradient(90deg, #f59e0b, #10b981)', // amber to emerald
              'linear-gradient(90deg, #10b981, #06b6d4)'  // emerald to cyan
            ];
            
            gsap.to(progressRef.current, {
              background: colors[index % colors.length],
              duration: 0.5,
              ease: "power2.out"
            });
          }
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Main Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 origin-left z-50"
        style={{ scaleX }}
        ref={progressRef}
      />
      
      {/* Floating Progress Indicator */}
      <motion.div
        className="fixed top-8 right-8 z-40 opacity-80 hover:opacity-100 transition-opacity"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <div className="relative w-16 h-16">
          {/* Background Circle */}
          <div className="absolute inset-0 rounded-full border-2 border-white/20 backdrop-blur-sm" />
          
          {/* Progress Circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              style={{
                pathLength: scrollYProgress
              }}
              strokeDasharray="0 1"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Section Navigator */}
      <motion.div
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-4"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        {['Intro', 'About', 'Skills', 'Projects', 'Contact'].map((section, index) => (
          <motion.div
            key={section}
            className="group relative"
            whileHover={{ scale: 1.2 }}
          >
            <div 
              className="w-3 h-3 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/30"
              onClick={() => {
                const element = document.querySelector(`section:nth-of-type(${index + 1})`);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            
            {/* Section Label */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/80 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-lg font-mono whitespace-nowrap">
                {section}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default ScrollProgressIndicator;
