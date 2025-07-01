
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData } from '../../data/experience';
import { Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      experienceRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(ref,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.2,
              scrollTrigger: {
                trigger: ref,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-6xl font-black text-center mb-20 text-gray-900"
        >
          Experience
        </h2>

        <div className="space-y-16">
          {experienceData.map((exp, index) => (
            <div
              key={index}
              ref={el => experienceRefs.current[index] = el}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{exp.title}</h3>
              <div className="flex items-center text-gray-500 mb-8">
                <Calendar className="w-5 h-5 mr-3" />
                <span className="text-lg">{exp.period}</span>
              </div>
              
              <ul className="space-y-4">
                {exp.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 text-lg leading-relaxed">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
