import { AnimatePresence, motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code2, ExternalLink, Eye, Github, Play, Star, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { projectsData } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSectionEnhanced = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered parallax animations
      gsap.to('.project-bg-element', {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Magnetic cursor effect for project cards
      const handleMouseMove = (e: MouseEvent) => {
        const cards = document.querySelectorAll('.project-card-enhanced');
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) * 0.02;
          const deltaY = (e.clientY - centerY) * 0.02;
          
          gsap.to(card, {
            x: deltaX,
            y: deltaY,
            rotationX: -deltaY * 0.5,
            rotationY: deltaX * 0.5,
            duration: 0.6,
            ease: "power2.out",
            transformPerspective: 1000
          });
        });
      };

      sectionRef.current?.addEventListener('mousemove', handleMouseMove);
      sectionRef.current?.addEventListener('mouseleave', () => {
        gsap.to('.project-card-enhanced', {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        });
      });

      return () => {
        sectionRef.current?.removeEventListener('mousemove', handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      scale: 0.8,
      rotateX: -30
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0
    }
  };

  const ProjectCard = ({ project, index }: { project: any, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = (hovering: boolean) => {
      setIsHovered(hovering);
      setHoveredProject(hovering ? index : null);
      
      if (cardRef.current && imageRef.current) {
        const tl = gsap.timeline();
        
        if (hovering) {
          tl.to(cardRef.current, {
            scale: 1.05,
            boxShadow: "0 30px 60px rgba(0, 255, 255, 0.3)",
            duration: 0.4,
            ease: "power2.out"
          })
          .to(imageRef.current, {
            scale: 1.1,
            duration: 0.6,
            ease: "power2.out"
          }, 0)
          .from('.tech-pill', {
            y: 20,
            opacity: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: "back.out(1.7)"
          }, 0.2);
        } else {
          tl.to([cardRef.current, imageRef.current], {
            scale: 1,
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        }
      }
    };

    return (
      <motion.div
        ref={cardRef}
        className="project-card-enhanced group relative bg-gradient-to-br from-card/60 to-card/20 backdrop-blur-lg border border-border/50 rounded-3xl overflow-hidden"
        variants={cardVariants}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={() => setSelectedProject(index)}
        data-cursor="project"
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Project Image with Ripple Effect */}
        <div className="relative h-72 overflow-hidden">
          <div 
            ref={imageRef}
            className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30"
          >
            {/* Code Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 gap-2 p-4 h-full">
                {Array.from({ length: 32 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-cyan-400 rounded-sm"
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Main Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={isHovered ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                } : {}}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Code2 className="w-20 h-20 text-primary/60" />
              </motion.div>
            </div>
          </div>
          
          {/* Glitch Overlay Effect */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  x: [0, -2, 2, 0],
                  skewX: [0, -2, 2, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.3,
                  repeat: 2,
                  repeatType: "reverse"
                }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 mix-blend-multiply"
              />
            )}
          </AnimatePresence>
          
          {/* Action Buttons with Magnetic Effect */}
          <div className="absolute top-6 right-6 flex gap-3">
            <motion.div
              className="p-3 bg-black/30 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100"
              initial={{ scale: 0, rotate: -180 }}
              animate={isHovered ? { 
                scale: 1, 
                rotate: 0,
                transition: { delay: 0.1, type: "spring", stiffness: 200 }
              } : { scale: 0, rotate: -180 }}
              whileHover={{ scale: 1.1 }}
              data-cursor="magnetic"
            >
              <ExternalLink className="w-5 h-5 text-cyan-400" />
            </motion.div>
            <motion.div
              className="p-3 bg-black/30 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100"
              initial={{ scale: 0, rotate: -180 }}
              animate={isHovered ? { 
                scale: 1, 
                rotate: 0,
                transition: { delay: 0.2, type: "spring", stiffness: 200 }
              } : { scale: 0, rotate: -180 }}
              whileHover={{ scale: 1.1 }}
              data-cursor="magnetic"
            >
              <Github className="w-5 h-5 text-purple-400" />
            </motion.div>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-cursor="magnetic"
            >
              <Play className="w-8 h-8 text-white fill-white" />
            </motion.div>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <motion.h3 
              className="text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300"
              animate={isHovered ? { y: -2 } : { y: 0 }}
            >
              {project.name}
            </motion.h3>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-sm font-mono">4.9</span>
            </div>
          </div>
          
          <motion.p 
            className="text-muted-foreground leading-relaxed mb-6"
            animate={isHovered ? { y: -2 } : { y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {Array.isArray(project.description) ? project.description[0] : project.description}
          </motion.p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies?.split(',').slice(0, 4).map((tech: string, techIndex: number) => (
              <motion.span
                key={techIndex}
                className="tech-pill px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-sm font-mono rounded-full backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(6, 182, 212, 0.2)",
                  borderColor: "rgba(6, 182, 212, 0.4)"
                }}
              >
                {tech.trim()}
              </motion.span>
            ))}
          </div>

          {/* Project Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{Math.floor(Math.random() * 500) + 100}</span>
              </div>
              <div className="flex items-center gap-1">
                <Code2 className="w-4 h-4" />
                <span>Live</span>
              </div>
            </div>
            
            <motion.div
              className="flex items-center gap-2 text-primary font-semibold group-hover:text-cyan-400 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span>View Project</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Animated Border */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-30 blur-xl" />
        </div>
      </motion.div>
    );
  };

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-br from-background via-black/50 to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="project-bg-element absolute opacity-5"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
              fontSize: '4rem',
              color: '#00ffff'
            }}
          >
            {'{ }'[i % 2] || '</>'}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-9xl font-black font-display mb-8"
            initial={{ opacity: 0, y: 100, rotateX: -30 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0, 
              rotateX: 0 
            } : { 
              opacity: 0, 
              y: 100, 
              rotateX: -30 
            }}
            transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              PROJECTS
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
            Crafting digital experiences that blend innovation with functionality
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
        >
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: -30 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 30 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-card/90 backdrop-blur-lg border border-border/50 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold text-foreground">
                  {projectsData[selectedProject]?.name}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                  data-cursor="magnetic"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {Array.isArray(projectsData[selectedProject]?.description) 
                    ? projectsData[selectedProject]?.description.join(' ')
                    : projectsData[selectedProject]?.description}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {projectsData[selectedProject]?.technologies?.split(',').map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-primary/20 border border-primary/30 text-primary rounded-full font-mono"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor="magnetic"
                  >
                    View Live Demo
                  </motion.button>
                  <motion.button
                    className="px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor="magnetic"
                  >
                    View Code
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSectionEnhanced;
