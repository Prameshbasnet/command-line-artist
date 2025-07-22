
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav entrance animation
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 3.5 }
      );

      // Nav items stagger animation
      gsap.fromTo('.nav-item',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, delay: 4, ease: "back.out(1.7)" }
      );

      // Nav background on scroll
      ScrollTrigger.create({
        start: "top -80",
        end: "bottom",
        onUpdate: self => {
          if (navRef.current) {
            gsap.to(navRef.current, {
              backgroundColor: self.direction === 1 ? "rgba(15, 15, 15, 0.9)" : "rgba(15, 15, 15, 0)",
              backdropFilter: self.direction === 1 ? "blur(20px)" : "blur(0px)",
              duration: 0.3
            });
          }
        }
      });

    }, navRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      gsap.fromTo(menuRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      
      gsap.fromTo('.mobile-nav-item',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "back.out(1.7)" }
      );
    } else {
      gsap.to(menuRef.current,
        { x: "100%", opacity: 0, duration: 0.3, ease: "power3.in" }
      );
    }
  };

  const navItems = [
    { id: 'hero', label: 'HOME', index: '01' },
    { id: 'experience', label: 'EXPERIENCE', index: '02' },
    { id: 'projects', label: 'PROJECTS', index: '03' },
    { id: 'skills', label: 'SKILLS', index: '04' },
    { id: 'education', label: 'EDUCATION', index: '05' }
  ];

  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6 mix-blend-mode-difference"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="group flex items-center gap-2 font-mono font-bold text-lg text-foreground hover:text-primary transition-colors duration-300"
              data-cursor="hover"
            >
              <Terminal className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="glitch" data-text="P.BASNET">P.BASNET</span>
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-12">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-item group relative font-mono text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  data-cursor="hover"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute -top-3 left-0 font-mono text-xs text-primary/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.index}
                  </span>
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
              data-cursor="hover"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-full h-screen bg-background/95 backdrop-blur-xl z-40 md:hidden"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex flex-col justify-center items-center h-full gap-8">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="mobile-nav-item group flex items-center gap-4 font-mono text-2xl font-bold text-muted-foreground hover:text-primary transition-colors duration-300"
              data-cursor="hover"
            >
              <span className="text-sm text-primary/50">{item.index}</span>
              <span className="group-hover:translate-x-2 transition-transform">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
