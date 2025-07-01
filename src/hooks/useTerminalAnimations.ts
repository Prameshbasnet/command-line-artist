
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useTerminalAnimations = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      // Initial terminal entrance animation
      gsap.fromTo(terminalRef.current, 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        }
      );

      // Add subtle glow animation
      gsap.to(terminalRef.current, {
        boxShadow: "0 0 20px rgba(78, 245, 167, 0.3)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }, []);

  const animateNewCommand = (element: HTMLElement) => {
    gsap.fromTo(element,
      { 
        opacity: 0, 
        x: -20 
      },
      { 
        opacity: 1, 
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      }
    );
  };

  const animateResponse = (element: HTMLElement) => {
    gsap.fromTo(element,
      { 
        opacity: 0, 
        y: 10 
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.1
      }
    );
  };

  const animateUtilityTool = (element: HTMLElement) => {
    gsap.fromTo(element,
      { 
        opacity: 0,
        scale: 0.95,
        y: 20
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      }
    );
  };

  return {
    terminalRef,
    contentRef,
    animateNewCommand,
    animateResponse,
    animateUtilityTool
  };
};
