
import React, { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { Terminal, Code, Zap, Star, Github, Linkedin, Mail } from 'lucide-react';
import { aboutData } from "../data/about";
import { useIsMobile } from "../hooks/use-mobile";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Index = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([nameRef.current, titleRef.current, descriptionRef.current], { 
        opacity: 0, 
        y: 100 
      });
      gsap.set(skillsRef.current?.children || [], { 
        opacity: 0, 
        scale: 0.5, 
        rotation: 180 
      });
      gsap.set(ctaRef.current?.children || [], { 
        opacity: 0, 
        y: 50 
      });

      // Main timeline
      const tl = gsap.timeline({ delay: 0.5 });
      
      // Animate name with typewriter effect
      tl.to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(nameRef.current, {
        text: {
          value: aboutData.name,
          delimiter: ""
        },
        duration: 2,
        ease: "none"
      }, "-=0.5")
      
      // Animate title
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=1")
      
      // Animate description
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      
      // Animate skills with stagger
      .to(skillsRef.current?.children || [], {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.2")
      
      // Animate CTA buttons
      .to(ctaRef.current?.children || [], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3");

      // Continuous floating animation
      gsap.to(skillsRef.current?.children || [], {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.2
      });

      // Hover effects for skill cards
      const skillCards = skillsRef.current?.children;
      if (skillCards) {
        Array.from(skillCards).forEach((card) => {
          const element = card as HTMLElement;
          element.addEventListener('mouseenter', () => {
            gsap.to(element, {
              scale: 1.1,
              rotation: 5,
              duration: 0.3,
              ease: "power2.out"
            });
          });
          
          element.addEventListener('mouseleave', () => {
            gsap.to(element, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div ref={heroRef} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        
        {/* Name */}
        <h1 
          ref={nameRef}
          className={`font-black mb-6 leading-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ${
            isMobile ? 'text-4xl' : 'text-8xl'
          }`}
        >
          {/* Text will be animated via GSAP */}
        </h1>

        {/* Title */}
        <p 
          ref={titleRef}
          className={`font-semibold mb-8 text-cyan-300 ${
            isMobile ? 'text-xl' : 'text-3xl'
          }`}
        >
          Full Stack Developer & UI/UX Designer
        </p>

        {/* Description */}
        <p 
          ref={descriptionRef}
          className={`max-w-3xl mx-auto mb-12 text-gray-300 leading-relaxed ${
            isMobile ? 'text-lg' : 'text-xl'
          }`}
        >
          Creating amazing digital experiences with cutting-edge technologies. 
          Passionate about clean code, beautiful designs, and innovative solutions.
        </p>

        {/* Skills */}
        <div 
          ref={skillsRef}
          className={`flex flex-wrap justify-center gap-6 mb-12 ${
            isMobile ? 'max-w-sm' : 'max-w-4xl'
          }`}
        >
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
            <Code className="w-6 h-6 text-cyan-400" />
            <span className="font-semibold">React</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
            <Terminal className="w-6 h-6 text-green-400" />
            <span className="font-semibold">Node.js</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span className="font-semibold">TypeScript</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
            <Star className="w-6 h-6 text-purple-400" />
            <span className="font-semibold">GSAP</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div 
          ref={ctaRef}
          className={`flex gap-6 ${isMobile ? 'flex-col w-full max-w-xs' : 'flex-row'}`}
        >
          <button className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <Github className="w-5 h-5" />
              <span>View Projects</span>
            </span>
          </button>
          
          <button className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Get In Touch</span>
            </span>
          </button>
        </div>

        {/* Social Links */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6">
          <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
