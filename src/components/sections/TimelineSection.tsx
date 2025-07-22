import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, Code, Heart, MapPin, Trophy } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { aboutData } from '../../data/about';

gsap.registerPlugin(ScrollTrigger);

const TimelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const timelineEvents = [
    {
      year: "2022",
      title: "Joined General Technology",
      description: "Started my journey as a Software Engineer, focusing on .NET Core and React.js development for banking solutions.",
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500"
    },
    {
      year: "2023",
      title: "Banking Innovation",
      description: "Led development of Letter of Credit system and EFCU member onboarding platform, revolutionizing banking processes.",
      icon: Code,
      color: "from-purple-500 to-pink-500"
    },
    {
      year: "2024",
      title: "Full-Stack Mastery",
      description: "Expanded expertise to full-stack development, creating comprehensive solutions from backend APIs to responsive frontends.",
      icon: Trophy,
      color: "from-green-500 to-teal-500"
    },
    {
      year: "Present",
      title: "Continuous Innovation",
      description: "Currently pushing boundaries in modern web development, exploring new technologies and crafting exceptional user experiences.",
      icon: Heart,
      color: "from-orange-500 to-red-500"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated timeline line that follows scroll
      if (timelineRef.current) {
        gsap.to(timelineRef.current, {
          height: "100%",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        });
      }

      // Animate timeline events on scroll
      const events = document.querySelectorAll('.timeline-event');
      events.forEach((event, index) => {
        gsap.fromTo(event, 
          {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            scale: 0.8
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: event,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Floating particles animation
      const createParticles = () => {
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.className = 'timeline-particle';
          particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #06b6d4, #8b5cf6);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
          `;
          
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          
          sectionRef.current?.appendChild(particle);

          gsap.to(particle, {
            y: -100,
            opacity: 1,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            delay: Math.random() * 2
          });

          gsap.to(particle, {
            opacity: 0,
            duration: 1,
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 2
          });
        }
      };

      createParticles();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -30 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-32 bg-gradient-to-br from-background via-black/30 to-background relative overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.h2 
            variants={titleVariants}
            className="text-5xl md:text-7xl lg:text-9xl font-black font-display mb-8"
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              JOURNEY
            </span>
          </motion.h2>
          
          <motion.div 
            className="w-40 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 160 } : { width: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-mono"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {aboutData.summary}
          </motion.p>
        </motion.div>

        {/* Interactive Stats */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="text-center p-8 bg-card/20 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-primary/50 transition-all duration-500 group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)"
            }}
          >
            <motion.div
              className="text-4xl md:text-6xl font-bold text-primary mb-2"
              animate={{ 
                textShadow: ["0 0 10px rgba(6, 182, 212, 0.5)", "0 0 20px rgba(6, 182, 212, 0.8)", "0 0 10px rgba(6, 182, 212, 0.5)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {aboutData.experience}+
            </motion.div>
            <div className="text-muted-foreground font-mono">Years Experience</div>
          </motion.div>

          <motion.div 
            className="text-center p-8 bg-card/20 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-secondary/50 transition-all duration-500 group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.2)"
            }}
          >
            <motion.div
              className="text-4xl md:text-6xl font-bold text-secondary mb-2"
              animate={{ 
                textShadow: ["0 0 10px rgba(139, 92, 246, 0.5)", "0 0 20px rgba(139, 92, 246, 0.8)", "0 0 10px rgba(139, 92, 246, 0.5)"]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              15+
            </motion.div>
            <div className="text-muted-foreground font-mono">Technologies</div>
          </motion.div>

          <motion.div 
            className="text-center p-8 bg-card/20 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-accent/50 transition-all duration-500 group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)"
            }}
          >
            <motion.div
              className="text-4xl md:text-6xl font-bold text-accent mb-2"
              animate={{ 
                textShadow: ["0 0 10px rgba(236, 72, 153, 0.5)", "0 0 20px rgba(236, 72, 153, 0.8)", "0 0 10px rgba(236, 72, 153, 0.5)"]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              4+
            </motion.div>
            <div className="text-muted-foreground font-mono">Major Projects</div>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Main timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary/20 to-secondary/20 h-full rounded-full" />
          
          {/* Animated progress line */}
          <div 
            ref={timelineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary to-secondary rounded-full h-0"
            style={{ top: 0 }}
          />

          <div className="space-y-24">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  className={`timeline-event relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -100 : 100 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                >
                  {/* Timeline node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ 
                        scale: 1.2,
                        boxShadow: "0 0 30px rgba(6, 182, 212, 0.6)"
                      }}
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(6, 182, 212, 0.3)",
                          "0 0 30px rgba(139, 92, 246, 0.5)",
                          "0 0 20px rgba(6, 182, 212, 0.3)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <motion.div
                    className={`w-full md:w-5/12 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500">
                      <div className="flex items-center gap-4 mb-4">
                        <motion.span 
                          className="text-3xl font-black text-primary font-mono"
                          animate={{
                            color: ["#06b6d4", "#8b5cf6", "#ec4899", "#06b6d4"]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          {event.year}
                        </motion.span>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span className="font-mono text-sm">Timeline</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>

                      {/* Location info */}
                      <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="font-mono">{aboutData.location}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Personal Quote */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.blockquote 
              className="text-2xl md:text-3xl font-light italic text-muted-foreground mb-8"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              "Code is poetry in motion, transforming ideas into digital reality."
            </motion.blockquote>
            <motion.div
              className="flex items-center justify-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">{aboutData.name}</div>
                <div className="text-sm text-muted-foreground font-mono">{aboutData.title}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;
