import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

const SimpleCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    console.log('Cursor component mounted');

    // Simple mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      console.log('Mouse move detected:', e.clientX, e.clientY);
      setIsVisible(true);
      
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    // Mouse enter/leave
    const handleMouseEnter = () => {
      console.log('Mouse enter');
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => {
      console.log('Mouse leave');
      setIsVisible(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initial position
    gsap.set(cursor, { 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2,
      scale: 1
    });

    console.log('Event listeners added');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      console.log('Event listeners removed');
    };
  }, []);

  console.log('Rendering cursor, isVisible:', isVisible);

  return (
    <>
      {/* Simple Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-[9999] border-2 border-white"
        style={{
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0.3,
          transition: 'opacity 0.3s ease',
          mixBlendMode: 'normal'
        }}
      />

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
        
        @media (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default SimpleCursor;
