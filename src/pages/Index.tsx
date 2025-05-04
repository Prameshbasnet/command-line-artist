
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Terminal from "../components/Terminal";
import { aboutData } from "../data/about";

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (pageRef.current) {
      // Create a staggered fade-in effect for elements
      tl.from(pageRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }
  }, []);

  return (
    <div 
      ref={pageRef}
      className="min-h-screen bg-terminal-black p-4 sm:p-8 flex flex-col items-center justify-center"
    >
      <h1 className="text-center text-terminal-green text-2xl mb-4 sr-only">{aboutData.name} - Terminal Portfolio</h1>
      <Terminal />
      <p className="text-terminal-gray text-xs mt-4 text-center">
        © {new Date().getFullYear()} {aboutData.name}. All rights reserved.
      </p>
    </div>
  );
};

export default Index;
