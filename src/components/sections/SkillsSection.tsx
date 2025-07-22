
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { skillsData } from '../../data/skills';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

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

  const skillCategoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  const SkillCard = ({ skill, index }: { skill: { name: string, level: number, category: string }, index: number }) => (
    <motion.div
      variants={skillItemVariants}
      className="group relative bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6 hover:border-primary/50 hover:bg-card/60 transition-all duration-300"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(6, 182, 212, 0.1)"
      }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
          {skill.name}
        </span>
        <span className="text-xs sm:text-sm text-primary font-mono bg-primary/10 px-2 py-1 rounded-full">
          {skill.level}%
        </span>
      </div>
      
      <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ 
            duration: 1.5, 
            delay: index * 0.1, 
            ease: "easeOut" 
          }}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </motion.div>
      </div>
      
      <span className="text-xs text-muted-foreground font-mono">
        {skill.category}
      </span>
    </motion.div>
  );

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-gradient-to-br from-background via-black/50 to-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 sm:mb-20"
        >
          <motion.h2 
            variants={skillCategoryVariants}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold font-display mb-4 sm:mb-6"
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              SKILLS
            </span>
          </motion.h2>
          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 sm:mb-8" />
          <motion.p 
            variants={skillCategoryVariants}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-mono leading-relaxed"
          >
            Technologies and tools I use to build exceptional software solutions
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-20"
        >
          {Object.entries(skillsData).map(([categoryTitle, skills], categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={skillCategoryVariants}
              className="space-y-4"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-6 flex items-center">
                <div className="w-1 sm:w-2 h-4 sm:h-6 md:h-8 bg-gradient-to-b from-primary to-secondary rounded-full mr-3"></div>
                {categoryTitle}
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                {skills.map((skill, skillIndex) => (
                  <SkillCard 
                    key={skillIndex} 
                    skill={skill} 
                    index={categoryIndex * skills.length + skillIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-center"
        >
          <motion.div 
            variants={skillCategoryVariants} 
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card/10 border border-border/30 hover:border-primary/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-muted-foreground font-mono text-sm sm:text-base">Technologies</div>
          </motion.div>
          
          <motion.div 
            variants={skillCategoryVariants} 
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card/10 border border-border/30 hover:border-secondary/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-2">2+</div>
            <div className="text-muted-foreground font-mono text-sm sm:text-base">Years Experience</div>
          </motion.div>
          
          <motion.div 
            variants={skillCategoryVariants} 
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card/10 border border-border/30 hover:border-accent/50 transition-all duration-300 sm:col-span-2 md:col-span-1"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-2">4+</div>
            <div className="text-muted-foreground font-mono text-sm sm:text-base">Major Projects</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
