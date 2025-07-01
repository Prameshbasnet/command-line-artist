
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
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4"
      )
      .fromTo(descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3"
      )
      .fromTo(contactRef.current?.children || [],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }, "-=0.2"
      )
      .fromTo(socialRef.current?.children || [],
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" }, "-=0.1"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-4xl mx-auto">
        <h1 
          ref={nameRef}
          className="text-4xl md:text-6xl lg:text-7xl font-light mb-4 text-gray-900 tracking-tight leading-none"
        >
          {aboutData.name}
        </h1>
        
        <p 
          ref={titleRef}
          className="text-lg md:text-xl font-normal mb-6 text-gray-600 tracking-wide uppercase letter-spacing-wide"
        >
          Software Engineer
        </p>

        <p 
          ref={descRef}
          className="text-base md:text-lg mb-8 text-gray-500 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Crafting scalable solutions with .NET Core & React.js
        </p>

        <div ref={contactRef} className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-500">
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

        <div ref={socialRef} className="flex justify-center space-x-4">
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
              className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
