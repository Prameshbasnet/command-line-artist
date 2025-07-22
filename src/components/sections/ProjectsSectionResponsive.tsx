import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { projectsData } from '../../data/projects';

type Project = {
  name: string;
  technologies: string;
  description: string[];
  category: string;
  status: string;
  impact: string;
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background via-black/50 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.h2 
            variants={projectVariants}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold font-display mb-4 sm:mb-6"
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              PROJECTS
            </span>
          </motion.h2>
          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 sm:mb-8" />
          <motion.p 
            variants={projectVariants}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-mono leading-relaxed"
          >
            A collection of projects that showcase my passion for creating exceptional software solutions
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              variants={projectVariants}
              className="group relative bg-card/20 backdrop-blur-sm border border-border/30 rounded-xl sm:rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => openModal(project)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glitch overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
              
              {/* Project image/preview */}
              <div className="relative h-40 sm:h-48 md:h-56 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/20 font-mono">
                    {project.name.split(' ').map(word => word[0]).join('').slice(0, 3)}
                  </div>
                </div>
                
                {/* Animated code lines */}
                <div className="absolute bottom-2 left-2 right-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-1 bg-primary/60 rounded-full w-3/4 animate-pulse" />
                  <div className="h-1 bg-secondary/60 rounded-full w-1/2 animate-pulse delay-100" />
                  <div className="h-1 bg-accent/60 rounded-full w-2/3 animate-pulse delay-200" />
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                  {project.name}
                </h3>
                
                <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                  {project.description[0]}
                </p>

                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                  {project.technologies.split(', ').slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs sm:text-sm px-2 py-1 bg-primary/10 text-primary rounded-full font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.split(', ').length > 3 && (
                    <span className="text-xs sm:text-sm px-2 py-1 bg-muted/50 text-muted-foreground rounded-full font-mono">
                      +{project.technologies.split(', ').length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                  <span className="font-mono">{project.category}</span>
                  <span className="font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to explore →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateX: -30 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateX: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-card border border-border/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                  {selectedProject.name}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-muted-foreground hover:text-foreground transition-colors text-xl sm:text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-4 sm:mb-6">
                {selectedProject.description.map((desc, index) => (
                  <p key={index} className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                    {desc}
                  </p>
                ))}
              </div>

              <div className="mb-4 sm:mb-6">
                <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-3">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.split(', ').map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2">Status:</h4>
                <span className="text-sm sm:text-base px-3 py-1 bg-green-500/10 text-green-500 rounded-full font-mono">
                  {selectedProject.status}
                </span>
              </div>

              <div className="mb-4 sm:mb-6">
                <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2">Impact:</h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {selectedProject.impact}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
