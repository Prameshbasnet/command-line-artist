import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

const BackgroundEffects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: linear-gradient(45deg, #00ffff, #ff00ff);
        border-radius: 50%;
        opacity: 0.1;
        pointer-events: none;
      `;
      
      // Random position
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.top = Math.random() * 100 + 'vh';
      
      container.appendChild(particle);
      particlesRef.current.push(particle);

      // Animate particle
      gsap.to(particle, {
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        duration: Math.random() * 10 + 5,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });

      // Twinkle effect
      gsap.to(particle, {
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 3 + 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    // Grid overlay effect
    const grid = document.createElement('div');
    grid.className = 'grid-overlay';
    grid.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      pointer-events: none;
      z-index: 1;
    `;
    container.appendChild(grid);

    // Scan line effect
    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    scanLine.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #00ffff, transparent);
      opacity: 0.3;
      pointer-events: none;
      z-index: 2;
    `;
    container.appendChild(scanLine);

    gsap.to(scanLine, {
      y: '100vh',
      duration: 4,
      repeat: -1,
      ease: "none"
    });

    return () => {
      particlesRef.current.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      if (grid.parentNode) grid.parentNode.removeChild(grid);
      if (scanLine.parentNode) scanLine.parentNode.removeChild(scanLine);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: `
          radial-gradient(ellipse at top, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
          linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)
        `
      }}
    />
  );
};

export default BackgroundEffects;
