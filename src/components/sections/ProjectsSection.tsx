
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Play, Zap, Code2, Sparkles } from 'lucide-react';
import { projectsData } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with split text
      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        gsap.fromTo(titleChars,
          { opacity: 0, y: 100, rotationX: -90 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Projects grid animation
      projectRefs.current.forEach((ref, index) => {
        if (ref) {
          // Initial state
          gsap.set(ref, { y: 50, opacity: 0, scale: 0.8 });
          
          // Entrance animation
          gsap.to(ref, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "elastic.out(1, 0.75)",
            scrollTrigger: {
              trigger: ref,
              start: "top 85%",
            }
          });

          // Parallax effect
          gsap.to(ref, {
            y: -20,
            scrollTrigger: {
              trigger: ref,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        }
      });

      // Background particles animation
      gsap.to('.project-particle', {
        x: () => gsap.utils.random(-20, 20),
        y: () => gsap.utils.random(-20, 20),
        rotation: () => gsap.utils.random(0, 360),
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.1
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleProjectHover = (index: number, isEntering: boolean) => {
    const project = projectRefs.current[index];
    if (!project) return;

    if (isEntering) {
      setHoveredProject(index);
      gsap.to(project, {
        scale: 1.02,
        rotationY: 5,
        rotationX: 2,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(project.querySelector('.project-bg'), {
        scale: 1.1,
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      setHoveredProject(null);
      gsap.to(project, {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(project.querySelector('.project-bg'), {
        scale: 1,
        opacity: 0.2,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  return (
    <section ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="project-particle absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-0.5 bg-gradient-primary" />
            <span className="font-mono text-sm text-primary uppercase tracking-wider">FEATURED WORK</span>
            <div className="w-12 h-0.5 bg-gradient-primary" />
          </div>
          
          <div ref={titleRef} className="mb-6">
            <h2 className="font-display text-5xl md:text-7xl font-black leading-none">
              {"PROJECTS".split('').map((char, index) => (
                <span key={index} className="char inline-block text-gradient">
                  {char}
                </span>
              ))}
            </h2>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Digital experiences that <span className="text-primary font-mono">push boundaries</span> and 
            <span className="text-gradient font-medium"> solve real problems</span>
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projectsData.map((project, index) => (
            <div
              key={index}
              ref={el => projectRefs.current[index] = el}
              className="group relative"
              onMouseEnter={() => handleProjectHover(index, true)}
              onMouseLeave={() => handleProjectHover(index, false)}
              data-cursor="hover"
            >
              {/* Project Card */}
              <div className="relative bg-card border-2 border-border hover:border-primary/50 transition-all duration-500 overflow-hidden">
                {/* Background Effect */}
                <div className="project-bg absolute inset-0 bg-gradient-primary opacity-20 scale-100" />
                
                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Project Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-4xl font-black text-primary/30">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-2 border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 group/btn">
                        <Github className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                      </button>
                      <button className="p-2 border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 group/btn">
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                      </button>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {project.name}
                  </h3>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.split(', ').map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-muted border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider hover:bg-primary/10 transition-colors cursor-default"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    {project.description.map((desc, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 opacity-60" />
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Project Actions */}
                  <div className="mt-8 pt-6 border-t border-border/50">
                    <button className="group/cta relative px-6 py-3 bg-primary text-background font-mono font-bold text-sm uppercase tracking-wider brutal-hover hover:bg-transparent hover:text-primary border-2 border-primary transition-all duration-300 overflow-hidden">
                      <span className="relative z-10 flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        VIEW PROJECT
                      </span>
                      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>
                </div>

                {/* Hover Effects */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Zap className="w-6 h-6 text-primary animate-pulse" />
                </div>
              </div>

              {/* Project Index */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary text-background font-mono font-black text-lg flex items-center justify-center shadow-brutal z-20">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <button className="group relative px-8 py-4 border-2 border-muted-foreground text-muted-foreground font-mono font-bold text-lg uppercase tracking-wider brutal-hover hover:border-primary hover:text-primary transition-all duration-300">
            <span className="relative z-10 flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              VIEW ALL PROJECTS
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
