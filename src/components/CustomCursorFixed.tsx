import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

const CustomCursorFixed = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState('default');

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    console.log('Enhanced cursor mounted');

    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      console.log('Touch device detected, hiding cursor');
      return;
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      // Main cursor - immediate follow
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      // Follower - smooth lag
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Interactive element handlers
    const handleElementHover = (type: string) => {
      setCursorType(type);
      
      if (type === 'magnetic') {
        gsap.to(cursor, {
          scale: 1.5,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
        gsap.to(follower, {
          scale: 0.5,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      } else if (type === 'project') {
        gsap.to(cursor, {
          scale: 3,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
        gsap.to(follower, {
          scale: 0.2,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      }
    };

    const handleElementLeave = () => {
      setCursorType('default');
      
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    
    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      // Links and buttons
      const links = document.querySelectorAll('a, button, [role="button"]');
      links.forEach(link => {
        link.addEventListener('mouseenter', () => handleElementHover('magnetic'));
        link.addEventListener('mouseleave', handleElementLeave);
      });

      // Project cards
      const projects = document.querySelectorAll('[data-cursor="project"]');
      projects.forEach(project => {
        project.addEventListener('mouseenter', () => handleElementHover('project'));
        project.addEventListener('mouseleave', handleElementLeave);
      });
    };

    // Initial setup
    gsap.set([cursor, follower], { 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2,
      scale: 1
    });
    
    // Add listeners initially
    addHoverListeners();
    
    // Re-add listeners when content changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    console.log('Enhanced cursor initialized');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 pointer-events-none z-[9999]"
        style={{
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference'
        }}
      >
        <div 
          className={`w-full h-full rounded-full transition-all duration-300 ${
            cursorType === 'magnetic' ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' :
            cursorType === 'project' ? 'bg-purple-500 shadow-lg shadow-purple-500/50' :
            'bg-white'
          }`}
        />
        
        {/* Cursor Text */}
        {cursorType === 'project' && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-[6px] font-bold">
            VIEW
          </div>
        )}
      </div>

      {/* Follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998]"
        style={{
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div 
          className={`w-full h-full rounded-full border transition-all duration-300 ${
            cursorType === 'magnetic' ? 'border-cyan-400 border-2' :
            cursorType === 'project' ? 'border-purple-500 border-2' :
            'border-white/50 border-1'
          }`}
          style={{
            background: cursorType === 'project' ? 'rgba(168, 85, 247, 0.1)' :
                       cursorType === 'magnetic' ? 'rgba(6, 182, 212, 0.1)' :
                       'rgba(255, 255, 255, 0.05)'
          }}
        />
      </div>

      {/* Global cursor hide style */}
      <style>{`
        * {
          cursor: none !important;
        }
        
        a, button, [role="button"], input, textarea, [contenteditable] {
          cursor: none !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            cursor: auto !important;
          }
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

export default CustomCursorFixed;
