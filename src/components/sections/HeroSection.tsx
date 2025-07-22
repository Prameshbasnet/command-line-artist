
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { aboutData } from '../../data/about';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create matrix rain effect
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let x = 0; x < columns; x++) {
          drops[x] = 1;
        }

        function draw() {
          if (!ctx || !canvas) return;
          
          ctx.fillStyle = 'rgba(15, 15, 15, 0.04)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          ctx.fillStyle = '#00ffff';
          ctx.font = fontSize + 'px monospace';
          
          for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }
        }

        const interval = setInterval(draw, 35);
        
        const handleResize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
          clearInterval(interval);
          window.removeEventListener('resize', handleResize);
        };
      }

      // Glitch effect on name
      const nameChars = nameRef.current?.querySelectorAll('.char');
      if (nameChars) {
        gsap.set(nameChars, { opacity: 0, y: 100, rotationX: -90 });
        
        gsap.to(nameChars, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: "back.out(1.7)",
          delay: 0.5
        });

        // Random glitch effect
        const glitchLoop = () => {
          const randomChar = nameChars[Math.floor(Math.random() * nameChars.length)];
          gsap.set(randomChar, { 
            color: Math.random() > 0.5 ? '#ff00ff' : '#00ffff',
            scaleX: Math.random() > 0.5 ? 1.2 : 0.8,
            skewX: gsap.utils.random(-5, 5)
          });
          
          gsap.to(randomChar, {
            color: '#ffffff',
            scaleX: 1,
            skewX: 0,
            duration: 0.1,
            delay: 0.05
          });
        };

        const glitchInterval = setInterval(glitchLoop, 2000);
        
        // Cleanup
        return () => clearInterval(glitchInterval);
      }

      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50, filter: "blur(20px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)", 
          duration: 1, 
          ease: "power3.out",
          delay: 1.5
        }
      );

      // CTA animation
      gsap.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          ease: "elastic.out(1, 0.75)",
          delay: 2
        }
      );

      // Scroll indicator animation
      gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('experience');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef} 
      className="min-h-screen relative overflow-hidden bg-background flex items-center justify-center"
    >
      {/* Matrix Rain Background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 opacity-30 pointer-events-none"
      />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">

        {/* Animated Name */}
        <div ref={nameRef} className="mb-8">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter">
            {aboutData.name.split('').map((char, index) => (
              <span 
                key={index} 
                className={`char inline-block ${char === ' ' ? 'w-4' : ''} text-gradient hover:scale-110 transition-transform cursor-default`}
                data-cursor="hover"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Animated Title */}
        <div ref={titleRef} className="mb-16">
          <p className="font-mono text-xl md:text-2xl text-muted-foreground mb-4 glitch" data-text={aboutData.subtitle}>
            {aboutData.subtitle}
          </p>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground/80 leading-relaxed">
            {aboutData.summary.split('.')[0]}. <span className="text-primary font-mono">Focused on delivering secure, scalable solutions</span> in the 
            <span className="text-gradient font-medium"> banking and insurance sectors</span>
          </p>
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20">
          <button 
            className="group relative px-8 py-4 bg-primary text-background font-mono font-bold text-lg uppercase tracking-wider brutal-hover border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-300"
            data-cursor="hover"
          >
            <span className="relative z-10">VIEW WORK</span>
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <a 
            href={`mailto:${aboutData.email}`}
            className="group relative px-8 py-4 border-2 border-muted-foreground text-muted-foreground font-mono font-bold text-lg uppercase tracking-wider brutal-hover hover:border-primary hover:text-primary transition-all duration-300"
            data-cursor="hover"
          >
            GET IN TOUCH
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-16">
          {[
            { icon: Github, href: aboutData.github, label: 'GITHUB' },
            { icon: Linkedin, href: aboutData.linkedin, label: 'LINKEDIN' },
            { icon: Mail, href: `mailto:${aboutData.email}`, label: 'EMAIL' }
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target={social.icon !== Mail ? "_blank" : undefined}
              rel={social.icon !== Mail ? "noopener noreferrer" : undefined}
              className="group relative p-3 border border-muted-foreground/30 hover:border-primary transition-all duration-300 brutal-hover"
              data-cursor="hover"
            >
              <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 font-mono text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {social.label}
              </span>
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={handleScrollDown}
          className="scroll-indicator group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          data-cursor="hover"
        >
          <span className="font-mono text-xs uppercase tracking-wider">SCROLL TO EXPLORE</span>
          <ArrowDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Corner Elements */}
      <div className="absolute top-8 left-8 font-mono text-xs text-muted-foreground/50">
        <div>PORTFOLIO.2024</div>
        <div className="mt-1">v2.0.1</div>
      </div>
      
      <div className="absolute top-8 right-8 font-mono text-xs text-muted-foreground/50 text-right">
        <div>CREATIVE.DEV</div>
        <div className="mt-1">{aboutData.location}</div>
      </div>
    </section>
  );
};

export default HeroSection;
