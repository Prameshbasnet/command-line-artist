import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const counterEl = counterRef.current;
    
    if (!container || !text || !counterEl) return;

    const tl = gsap.timeline();

    // Counter animation
    gsap.to({ val: 0 }, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: function() {
        const value = Math.round(this.targets()[0].val);
        setCounter(value);
        counterEl.textContent = value.toString().padStart(3, '0');
      }
    });

    // Text animations
    tl.fromTo(text.children,
      { y: 100, opacity: 0, rotationX: -90 },
      { 
        y: 0, 
        opacity: 1, 
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, 0.5
    )
    .to(text.children, {
      scale: 1.1,
      duration: 0.3,
      stagger: 0.05,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    }, 1.8)
    .to(container, {
      scale: 1.1,
      duration: 0.5,
      ease: "power2.inOut"
    }, 2.5)
    .to(container, {
      y: "-100%",
      duration: 1,
      ease: "power3.inOut",
      onComplete: onComplete
    }, 3.2);

    // Glitch effect
    gsap.to(text, {
      skewX: () => gsap.utils.random(-2, 2),
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-background flex items-center justify-center"
    >
      <div className="text-center">
        <div 
          ref={textRef}
          className="font-display text-6xl md:text-8xl font-black mb-8 text-gradient"
        >
          <div className="inline-block">P</div>
          <div className="inline-block">R</div>
          <div className="inline-block">A</div>
          <div className="inline-block">M</div>
          <div className="inline-block">E</div>
          <div className="inline-block">S</div>
          <div className="inline-block">H</div>
        </div>
        
        <div className="font-mono text-2xl text-muted-foreground">
          <span ref={counterRef}>000</span>%
        </div>
        
        <div className="mt-4 text-sm font-mono text-primary">
          INITIALIZING CREATIVE EXPERIENCE...
        </div>
      </div>
      
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] bg-repeat"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;