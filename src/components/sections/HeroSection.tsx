
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
    <section ref={heroRef} className="min-h-screen flex items-center justify-center bg-gradient-dark px-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMEREQjMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="text-center max-w-6xl mx-auto relative z-10">
        <div className="mb-8">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
            <span className="text-primary text-sm font-medium">Available for new opportunities</span>
          </div>
        </div>
        
        <h1 
          ref={nameRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient tracking-tight leading-none"
        >
          PRAMESH BASNET
        </h1>
        
        <p 
          ref={titleRef}
          className="text-2xl md:text-3xl font-light mb-8 text-foreground tracking-wide"
        >
          Full-Stack Software Engineer
        </p>

        <p 
          ref={descRef}
          className="text-lg md:text-xl mb-12 text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          I craft exceptional digital experiences with modern technologies. 
          Specializing in .NET Core, React.js, and cloud-native solutions.
        </p>

        <div ref={contactRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all duration-300 group">
            <MapPin className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-xs text-muted-foreground mb-1">Location</p>
            <p className="text-sm text-foreground font-medium">{aboutData.location}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all duration-300 group">
            <Phone className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-xs text-muted-foreground mb-1">Phone</p>
            <p className="text-sm text-foreground font-medium">{aboutData.phone}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all duration-300 group">
            <Mail className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-xs text-muted-foreground mb-1">Email</p>
            <p className="text-sm text-foreground font-medium">{aboutData.email}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all duration-300 group">
            <Globe className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-xs text-muted-foreground mb-1">Website</p>
            <p className="text-sm text-foreground font-medium">{aboutData.website}</p>
          </div>
        </div>

        <div ref={socialRef} className="flex justify-center space-x-6">
          {[
            { icon: Linkedin, href: aboutData.linkedin, label: 'LinkedIn' },
            { icon: Github, href: aboutData.github, label: 'GitHub' },
            { icon: Mail, href: `mailto:${aboutData.email}`, label: 'Email' }
          ].map((social, index) => (
            <a 
              key={index}
              href={social.href} 
              target={social.icon !== Mail ? "_blank" : undefined}
              rel={social.icon !== Mail ? "noopener noreferrer" : undefined}
              className="group relative w-14 h-14 bg-card border border-border rounded-xl flex items-center justify-center hover:border-primary hover:shadow-glow transition-all duration-300"
            >
              <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {social.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
