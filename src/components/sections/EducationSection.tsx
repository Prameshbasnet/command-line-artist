
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { educationData } from '../../data/education';

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

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

      gsap.fromTo(educationRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: educationRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-card">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold text-gradient mb-6"
          >
            Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Academic foundation and continuous learning journey
          </p>
        </div>

        {educationData.map((edu, index) => (
          <div
            key={index}
            ref={educationRef}
            className="bg-background border border-border rounded-2xl p-8 max-w-3xl mx-auto hover:border-primary/50 hover:shadow-glow transition-all duration-500"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold text-foreground mb-4">{edu.degree}</h3>
              <p className="text-xl text-primary mb-4 font-medium">{edu.institution}</p>
              <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <p className="text-sm text-primary font-medium">{edu.period}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
