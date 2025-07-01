
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, Mail, MapPin, Phone, Globe } from 'lucide-react';
import { aboutData } from '../../data/about';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(nameRef.current, 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.8"
      )
      .fromTo(descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6"
      )
      .fromTo(contactRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.4"
      )
      .fromTo(socialRef.current?.children || [],
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.3"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 
          ref={nameRef}
          className="text-6xl md:text-8xl font-black mb-6 text-gray-900 tracking-tight"
        >
          {aboutData.name}
        </h1>
        
        <p 
          ref={titleRef}
          className="text-2xl md:text-3xl font-light mb-8 text-gray-600 tracking-wide"
        >
          SOFTWARE ENGINEER
        </p>

        <p 
          ref={descRef}
          className="text-lg md:text-xl mb-12 text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting scalable solutions with .NET Core & React.js
        </p>

        <div ref={contactRef} className="flex flex-wrap justify-center gap-8 mb-12 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{aboutData.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>{aboutData.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>{aboutData.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>{aboutData.website}</span>
          </div>
        </div>

        <div ref={socialRef} className="flex justify-center space-x-6">
          {[
            { icon: Linkedin, href: aboutData.linkedin },
            { icon: Github, href: aboutData.github },
            { icon: Mail, href: `mailto:${aboutData.email}` }
          ].map((social, index) => (
            <a 
              key={index}
              href={social.href} 
              target={social.icon !== Mail ? "_blank" : undefined}
              rel={social.icon !== Mail ? "noopener noreferrer" : undefined}
              className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
