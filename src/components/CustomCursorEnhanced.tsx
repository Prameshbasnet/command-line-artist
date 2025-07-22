import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

const CustomCursorEnhanced = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Mouse move handler with magnetic effect
    const handleMouseMove = (e: MouseEvent) => {
      // Ensure cursor is visible when mouse moves
      if (!isVisible) setIsVisible(true);
      
      // Check for magnetic elements
      const magneticElements = document.querySelectorAll('[data-cursor="magnetic"]');
      let closestElement: Element | null = null;
      let minDistance = Infinity;

      magneticElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        if (distance < minDistance && distance < 100) {
          minDistance = distance;
          closestElement = element;
        }
      });

      let targetX = e.clientX;
      let targetY = e.clientY;

      // Apply magnetic effect
      if (closestElement && minDistance < 100) {
        const rect = closestElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const force = (100 - minDistance) / 100;
        
        targetX = e.clientX + (centerX - e.clientX) * force * 0.3;
        targetY = e.clientY + (centerY - e.clientY) * force * 0.3;
      }
      
      // Main cursor - immediate follow
      gsap.to(cursor, {
        x: targetX,
        y: targetY,
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

    // Mouse enter/leave handlers
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Interactive element handlers
    const handleElementHover = (type: string) => {
      setCursorType(type);
      
      if (type === 'magnetic') {
        gsap.to(cursor, {
          scale: 1.5,
          duration: 0.3,
          ease: "elastic.out(1, 0.3)"
        });
        gsap.to(follower, {
          scale: 0.5,
          duration: 0.3,
          ease: "elastic.out(1, 0.3)"
        });
      } else if (type === 'project') {
        gsap.to(cursor, {
          scale: 4,
          duration: 0.4,
          ease: "back.out(1.7)"
        });
        gsap.to(follower, {
          scale: 0.2,
          duration: 0.4,
          ease: "back.out(1.7)"
        });
      } else if (type === 'text') {
        gsap.to(cursor, {
          scale: 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(follower, {
          scale: 2.5,
          duration: 0.3,
          ease: "power2.out"
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

    // Add event listeners to interactive elements
    const addHoverListeners = () => {
      // Links and buttons with magnetic effect
      const magneticElements = document.querySelectorAll('a, button, [role="button"], [data-cursor="magnetic"]');
      magneticElements.forEach(element => {
        element.setAttribute('data-cursor', 'magnetic');
        element.addEventListener('mouseenter', () => handleElementHover('magnetic'));
        element.addEventListener('mouseleave', handleElementLeave);
      });

      // Project cards
      const projects = document.querySelectorAll('[data-cursor="project"]');
      projects.forEach(project => {
        project.addEventListener('mouseenter', () => handleElementHover('project'));
        project.addEventListener('mouseleave', handleElementLeave);
      });

      // Text areas
      const textElements = document.querySelectorAll('input, textarea, [contenteditable]');
      textElements.forEach(element => {
        element.addEventListener('mouseenter', () => handleElementHover('text'));
        element.addEventListener('mouseleave', handleElementLeave);
      });
    };

    // Initial setup
    gsap.set([cursor, follower], { scale: 0 });
    
    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Add hover listeners initially and on route changes
    addHoverListeners();
    
    // Re-add listeners when content changes (for dynamic content)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Animate cursor in
    gsap.to([cursor, follower], {
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: 0.2
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  // Hide on mobile/touch devices
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      setIsVisible(true); // Show cursor on desktop devices
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 pointer-events-none z-[9999]"
        style={{
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        <div 
          className={`w-full h-full rounded-full transition-all duration-300 ${
            cursorType === 'magnetic' ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' :
            cursorType === 'project' ? 'bg-purple-500 shadow-lg shadow-purple-500/50' :
            cursorType === 'text' ? 'bg-green-400 shadow-lg shadow-green-400/50' :
            'bg-white'
          }`}
        />
        
        {/* Cursor Text/Icon */}
        {cursorType === 'project' && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-[8px] font-bold tracking-wider">
            VIEW
          </div>
        )}
        
        {cursorType === 'text' && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
            |
          </div>
        )}
      </div>

      {/* Follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9998]"
        style={{
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        <div 
          className={`w-full h-full rounded-full border transition-all duration-300 ${
            cursorType === 'magnetic' ? 'border-cyan-400 border-2 shadow-lg shadow-cyan-400/20' :
            cursorType === 'project' ? 'border-purple-500 border-2 shadow-lg shadow-purple-500/20' :
            cursorType === 'text' ? 'border-green-400 border-2 shadow-lg shadow-green-400/20' :
            'border-white/50 border-1'
          }`}
          style={{
            background: cursorType === 'project' ? 'rgba(168, 85, 247, 0.05)' :
                       cursorType === 'magnetic' ? 'rgba(6, 182, 212, 0.05)' :
                       cursorType === 'text' ? 'rgba(34, 197, 94, 0.05)' :
                       'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(1px)'
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

export default CustomCursorEnhanced;
