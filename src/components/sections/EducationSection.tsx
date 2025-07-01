
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
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl font-light text-center mb-16 text-gray-900"
        >
          Education
        </h2>

        {educationData.map((edu, index) => (
          <div
            key={index}
            ref={educationRef}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-xl md:text-2xl font-normal mb-3 text-gray-900">{edu.degree}</h3>
            <p className="text-lg text-gray-600 mb-2">{edu.institution}</p>
            <p className="text-sm text-gray-500 uppercase tracking-wide">{edu.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
