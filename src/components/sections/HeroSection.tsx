
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, Mail, MapPin, Phone, Globe } from 'lucide-react';
import { aboutData } from '../../data/about';
import { useIsMobile } from '../../hooks/use-mobile';

const HeroSection = () => {
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(nameRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
      );
      
      gsap.fromTo(contactRef.current?.children || [],
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, delay: 0.4, ease: "power2.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 
          ref={nameRef}
          className={`font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ${
            isMobile ? 'text-4xl' : 'text-7xl'
          }`}
        >
          {aboutData.name}
        </h1>
        
        <p 
          ref={titleRef}
          className={`font-semibold mb-8 text-cyan-300 ${
            isMobile ? 'text-xl' : 'text-3xl'
          }`}
        >
          SOFTWARE ENGINEER • .Net Core | React.js
        </p>

        <div ref={contactRef} className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex items-center space-x-2 text-gray-300">
            <MapPin className="w-4 h-4" />
            <span>{aboutData.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Phone className="w-4 h-4" />
            <span>{aboutData.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Mail className="w-4 h-4" />
            <span>{aboutData.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Globe className="w-4 h-4" />
            <span>{aboutData.website}</span>
          </div>
        </div>

        <div className="flex justify-center space-x-6">
          <a 
            href={aboutData.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a 
            href={aboutData.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href={`mailto:${aboutData.email}`}
            className="p-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
