
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { educationData } from '../../data/education';
import { Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

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

      gsap.fromTo(educationRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: educationRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-6xl font-black text-center mb-20 text-gray-900"
        >
          Education
        </h2>

        {educationData.map((edu, index) => (
          <div
            key={index}
            ref={educationRef}
            className="bg-gray-50 rounded-3xl p-8 md:p-12 mx-auto max-w-2xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{edu.degree}</h3>
            <p className="text-xl text-gray-600 mb-6">{edu.institution}</p>
            <div className="flex items-center text-gray-500">
              <Calendar className="w-5 h-5 mr-3" />
              <span className="text-lg">{edu.period}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
