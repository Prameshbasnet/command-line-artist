
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '../../data/skills';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillGroupRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          }
        }
      );

      skillGroupRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(ref,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: ref,
                start: "top 80%",
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    { title: "Languages & Frameworks", skills: skillsData.languages },
    { title: "Databases", skills: skillsData.databases },
    { title: "Tools & Technologies", skills: skillsData.tools },
    { title: "Other Skills", skills: skillsData.other }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold text-gradient mb-6"
          >
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              ref={el => skillGroupRefs.current[index] = el}
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-glow transition-all duration-500"
            >
              <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
                <div className="w-2 h-8 bg-primary rounded-full mr-4"></div>
                {category.title}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="group flex items-center space-x-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform"></div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
