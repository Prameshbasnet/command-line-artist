import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(TextPlugin);

const NotFoundEnhanced = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Glitch effect on 404
    tl.to(".glitch-404", {
      duration: 0.1,
      x: () => gsap.utils.random(-5, 5),
      y: () => gsap.utils.random(-2, 2),
      skewX: () => gsap.utils.random(-2, 2),
      repeat: 10,
      yoyo: true,
      ease: "power2.inOut"
    })
    .to(".glitch-404", {
      duration: 0.5,
      x: 0,
      y: 0,
      skewX: 0,
      ease: "elastic.out(1, 0.3)"
    });

    // Typing animation
    setTimeout(() => {
      setIsTyping(true);
      gsap.to(".typing-text", {
        duration: 2,
        text: "This page doesn't exist — yet.",
        ease: "none",
        onComplete: () => {
          setTimeout(() => {
            gsap.to(".typing-text-2", {
              duration: 1.5,
              text: "Want to build it together?",
              ease: "none"
            });
          }, 500);
        }
      });
    }, 1000);

    // Floating elements
    gsap.to(".float-element", {
      duration: 3,
      y: -20,
      rotation: 5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.2
    });

    // Cursor blinking
    gsap.to(".cursor-blink", {
      duration: 0.8,
      opacity: 0,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Matrix rain effect
    const createMatrixRain = () => {
      const characters = "0123456789ABCDEF<>{}[]();";
      const container = document.querySelector('.matrix-rain');
      
      for (let i = 0; i < 15; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${Math.random() * 100}%`;
        column.style.animationDelay = `${Math.random() * 3}s`;
        
        for (let j = 0; j < 10; j++) {
          const char = document.createElement('span');
          char.textContent = characters[Math.floor(Math.random() * characters.length)];
          char.style.opacity = `${Math.random() * 0.7 + 0.3}`;
          column.appendChild(char);
        }
        
        container?.appendChild(column);
      }
    };

    createMatrixRain();

    return () => {
      tl.kill();
    };
  }, []);

  const codeSnippets = [
    "function findPage(url) {",
    "  const page = database.find(url);",
    "  if (!page) {",
    "    throw new PageNotFoundError();",
    "  }",
    "  return page;",
    "}"
  ];

  return (
    <div 
      className="min-h-screen bg-black relative overflow-hidden"
    >
      {/* Matrix Rain Background */}
      <div className="matrix-rain absolute inset-0 opacity-20 overflow-hidden">
        <style>{`
          .matrix-column {
            position: absolute;
            top: -100%;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            color: #00ff41;
            animation: matrix-fall 4s linear infinite;
            display: flex;
            flex-direction: column;
          }
          
          @keyframes matrix-fall {
            0% { top: -100%; }
            100% { top: 100%; }
          }
        `}</style>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {['{ }', '< />', '[ ]', '( )', ';', '=', '+'].map((symbol, i) => (
          <motion.div
            key={i}
            className="float-element absolute text-cyan-400/30 text-2xl font-mono"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="text-center max-w-4xl mx-auto px-4">
          
          {/* 404 with Glitch Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <h1 className="glitch-404 text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500 mb-4">
              404
            </h1>
            <div className="relative">
              <div className="absolute inset-0 glitch-404 text-9xl md:text-[12rem] font-black text-red-500/20 transform translate-x-1 translate-y-1">
                404
              </div>
              <div className="absolute inset-0 glitch-404 text-9xl md:text-[12rem] font-black text-cyan-500/20 transform -translate-x-1 -translate-y-1">
                404
              </div>
            </div>
          </motion.div>

          {/* Code Block */}
          <motion.div
            ref={codeBlockRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-cyan-500/30 max-w-2xl mx-auto"
          >
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-4 text-gray-400 text-sm font-mono">error.js</span>
            </div>
            
            <div className="text-left font-mono text-sm">
              {codeSnippets.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + (i * 0.1), duration: 0.5 }}
                  className="mb-1"
                >
                  <span className="text-gray-500 mr-4">{String(i + 1).padStart(2, '0')}</span>
                  <span className={
                    line.includes('throw') ? 'text-red-400' :
                    line.includes('function') || line.includes('return') ? 'text-purple-400' :
                    line.includes('const') || line.includes('if') ? 'text-blue-400' :
                    'text-gray-300'
                  }>
                    {line}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Typing Text */}
          <div className="space-y-6 mb-12">
            <div className="text-2xl md:text-4xl font-light text-gray-300">
              <span className="typing-text"></span>
              <span className="cursor-blink">|</span>
            </div>
            <div className="text-xl md:text-2xl font-light text-cyan-400">
              <span className="typing-text-2"></span>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                ← Take me home
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-purple-500 text-purple-400 font-semibold rounded-lg hover:bg-purple-500/10 transition-all duration-300"
              onClick={() => window.open('https://github.com/Prameshbasnet', '_blank')}
            >
              Let's collaborate →
            </motion.button>
          </motion.div>

          
        </div>
      </div>
    </div>
  );
};

export default NotFoundEnhanced;
