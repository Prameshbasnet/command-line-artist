
import React from "react";
import Navigation from "../components/Navigation";
import HeroSection from "../components/sections/HeroSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import EducationSection from "../components/sections/EducationSection";

const Index = () => {
  return (
    <div className="overflow-hidden">
      <Navigation />
      
      <div id="hero">
        <HeroSection />
      </div>
      
      <div id="experience">
        <ExperienceSection />
      </div>
      
      <div id="projects">
        <ProjectsSection />
      </div>
      
      <div id="skills">
        <SkillsSection />
      </div>
      
      <div id="education">
        <EducationSection />
      </div>
    </div>
  );
};

export default Index;
