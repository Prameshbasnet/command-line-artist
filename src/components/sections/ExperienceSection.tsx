
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData } from '../../data/experience';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      experienceRefs.current.forEach((ref, index) => {
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

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl font-light text-center mb-16 text-gray-900"
        >
          Experience
        </h2>

        <div className="space-y-12">
          {experienceData.map((exp, index) => (
            <div
              key={index}
              ref={el => experienceRefs.current[index] = el}
              className="border-l-2 border-gray-200 pl-8 ml-4"
            >
              <div className="relative">
                <div className="absolute -left-10 top-0 w-4 h-4 bg-gray-900 rounded-full"></div>
                <h3 className="text-xl md:text-2xl font-normal text-gray-900 mb-2">{exp.title}</h3>
                <p className="text-sm text-gray-500 mb-6 uppercase tracking-wide">{exp.period}</p>
                
                <ul className="space-y-3">
                  {exp.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="text-gray-600 leading-relaxed">
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
