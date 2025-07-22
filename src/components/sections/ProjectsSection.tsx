import { AnimatePresence, motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code2, ExternalLink, Eye, Github, Star, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { projectsData } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating tech symbols
      const symbols = ['{ }', '< />', '[ ]', '( )', '&&', '||', '=>', '++'];
      symbols.forEach((symbol) => {
        const element = document.createElement('div');
        element.textContent = symbol;
        element.className = 'floating-symbol';
        element.style.cssText = `
          position: absolute;
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.5rem;
          color: rgba(0, 255, 255, 0.1);
          pointer-events: none;
          z-index: 1;
        `;
        
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        
        sectionRef.current?.appendChild(element);

        gsap.to(element, {
          x: Math.random() * 300 - 150,
          y: Math.random() * 300 - 150,
          rotation: 360,
          duration: Math.random() * 20 + 10,
          repeat: -1,
          ease: "none"
        });

        gsap.to(element, {
          opacity: 0.3,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      // Magnetic mouse effect for project cards
      const handleMouseMove = (e: MouseEvent) => {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(card, {
            rotationY: x / 10,
            rotationX: -y / 10,
            duration: 0.6,
            ease: "power2.out",
            transformPerspective: 1000
          });
        });
      };

      sectionRef.current?.addEventListener('mousemove', handleMouseMove);

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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  const ProjectCard = ({ project, index }: { project: any, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleHover = (isHovering: boolean) => {
      setHoveredProject(isHovering ? index : null);
      
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          scale: isHovering ? 1.05 : 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    return (
      <motion.div
        ref={cardRef}
        className="project-card group relative bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden cursor-pointer"
        variants={cardVariants}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={() => setSelectedProject(index)}
        whileHover={{ 
          boxShadow: "0 20px 40px rgba(0, 255, 255, 0.2)",
          borderColor: "rgba(0, 255, 255, 0.5)"
        }}
      >
        {/* Project Image with Overlay */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <Code2 className="w-16 h-16 text-primary/40" />
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              className="p-2 bg-primary/20 backdrop-blur-sm rounded-full hover:bg-primary/40 transition-colors cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="w-4 h-4 text-primary" />
            </motion.div>
            <motion.div
              className="p-2 bg-secondary/20 backdrop-blur-sm rounded-full hover:bg-secondary/40 transition-colors cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-4 h-4 text-secondary" />
            </motion.div>
          </div>

          {/* Tech Stack Pills */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.technologies?.split(',').slice(0, 3).map((tech: string, techIndex: number) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-black/50 backdrop-blur-sm text-xs font-mono text-primary rounded-full"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center gap-1 text-accent">
              <Star className="w-4 h-4" />
              <span className="text-sm font-mono">4.9</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {Array.isArray(project.description) ? project.description[0] : project.description}
          </p>

          {/* Project Stats */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{Math.floor(Math.random() * 500) + 100} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Code2 className="w-3 h-3" />
              <span>{project.technologies?.split(',').length || 0} techs</span>
            </div>
          </div>
        </div>

        {/* Glowing Border Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent p-[1px]">
            <div className="w-full h-full rounded-2xl bg-card" />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative py-20 overflow-hidden bg-gradient-to-br from-background via-black to-background"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
              linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.03) 50%, transparent 70%)
            `,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div 
            variants={cardVariants}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold font-display mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                PROJECTS
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-mono mb-8">
              Each project is a piece of my journey, crafted with passion and built to inspire.
            </p>

            {/* View Mode Toggle */}
            <div className="flex justify-center gap-2 md:gap-4 mb-12">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-mono text-sm md:text-base transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-black' 
                    : 'bg-card/30 border border-border text-muted-foreground hover:border-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                GRID VIEW
              </motion.button>
              <motion.button
                onClick={() => setViewMode('carousel')}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-mono text-sm md:text-base transition-all duration-300 ${
                  viewMode === 'carousel' 
                    ? 'bg-primary text-black' 
                    : 'bg-card/30 border border-border text-muted-foreground hover:border-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SHOWCASE
              </motion.button>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            {viewMode === 'grid' && (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {projectsData.map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))}
              </motion.div>
            )}

            {viewMode === 'carousel' && (
              <motion.div
                key="carousel"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-4xl mx-auto"
              >
                <div className="bg-card/20 backdrop-blur-sm border border-border rounded-3xl p-8">
                  <h3 className="text-3xl font-bold text-center mb-8 text-primary">Featured Showcase</h3>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 flex items-center justify-center h-64">
                      <Code2 className="w-24 h-24 text-primary/40" />
                    </div>
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold">{projectsData[0]?.name}</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {Array.isArray(projectsData[0]?.description) ? projectsData[0].description[0] : projectsData[0]?.description}
                      </p>
                      <div className="flex gap-4">
                        <motion.button
                          className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-lg hover:shadow-neon transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          VIEW PROJECT
                        </motion.button>
                        <motion.button
                          className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-black transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          SOURCE CODE
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Section */}
          <motion.div
            variants={cardVariants}
            className="text-center mt-20 py-12"
          >
            <h3 className="text-4xl font-bold mb-6 font-display">
              Want to See More?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 font-mono">
              Explore my complete portfolio and discover the stories behind each creation.
            </p>
            <motion.button
              className="px-8 py-4 bg-transparent border-2 border-primary text-primary font-bold rounded-full text-lg hover:bg-primary hover:text-black transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                VIEW ALL PROJECTS
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-bold text-primary">
                    {projectsData[selectedProject]?.name}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-border/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6 p-12 flex items-center justify-center">
                  <Code2 className="w-32 h-32 text-primary/40" />
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {Array.isArray(projectsData[selectedProject]?.description) 
                    ? projectsData[selectedProject].description.join(' ') 
                    : projectsData[selectedProject]?.description}
                </p>
                
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-primary text-black font-bold rounded-lg hover:shadow-neon transition-all duration-300">
                    VIEW LIVE
                  </button>
                  <button className="px-6 py-3 border border-border text-foreground rounded-lg hover:border-primary transition-colors">
                    VIEW CODE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
