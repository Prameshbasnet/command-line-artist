
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
      // Create floating particles
      gsap.set(".particle", {
        opacity: 0,
        scale: 0,
        x: () => gsap.utils.random(-100, 100),
        y: () => gsap.utils.random(-100, 100)
      });

      const tl = gsap.timeline();
      
      // Hero entrance animation
      tl.fromTo(nameRef.current, 
        { opacity: 0, y: 50, rotationX: -15 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }, "-=0.6"
      )
      .fromTo(descRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4"
      )
      .to(".particle", {
        opacity: 1,
        scale: 1,
        duration: 2,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.8")
      .fromTo(contactRef.current?.children || [],
        { opacity: 0, y: 20, rotationY: 45 },
        { opacity: 1, y: 0, rotationY: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=1"
      )
      .fromTo(socialRef.current?.children || [],
        { opacity: 0, scale: 0, rotation: 180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.4"
      );

      // Continuous floating animation for particles
      gsap.to(".particle", {
        y: "+=20",
        rotation: "+=10",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });

      // Text glow animation
      gsap.to(nameRef.current, {
        textShadow: "0 0 20px rgba(0, 221, 179, 0.5)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center bg-gradient-dark px-8 relative overflow-hidden">
      {/* Animated Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="particle absolute w-2 h-2 bg-primary rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMEREQjMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
      
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
