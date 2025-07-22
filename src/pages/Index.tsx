
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import BackgroundEffects from "../components/BackgroundEffects";
import KonamiCode from "../components/KonamiCode";
import Navigation from "../components/Navigation";
import ScrollProgressIndicator from "../components/ScrollProgressIndicator";
import ContactSection from "../components/sections/ContactSection";
import HeroSection from "../components/sections/HeroSection";
import IntroSequence from "../components/sections/IntroSequence";
import ProjectsSection from "../components/sections/ProjectsSectionResponsive";
import SkillsSection from "../components/sections/SkillsSection";
import TimelineSection from "../components/sections/TimelineSection";
import SmoothScrollProvider from "../components/SmoothScrollProvider";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    // Check if user is on mobile or has visited before
    const isMobile = window.innerWidth < 768;
    const hasVisited = localStorage.getItem('portfolio-visited');
    
    if (isMobile || hasVisited) {
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    localStorage.setItem('portfolio-visited', 'true');
  };

  return (
    <SmoothScrollProvider>
      <div className="relative overflow-hidden bg-black">
        <BackgroundEffects />
        <KonamiCode />
        
        <AnimatePresence mode="wait">
          {!introComplete ? (
            <IntroSequence key="intro" onComplete={handleIntroComplete} />
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <Navigation currentSection={currentSection} />
              <ScrollProgressIndicator />
              
              <div id="hero" className="section">
                <HeroSection />
              </div>
              
              <div id="about" className="section">
                <TimelineSection />
              </div>
              
              <div id="skills" className="section">
                <SkillsSection />
              </div>
              
              <div id="projects" className="section">
                <ProjectsSection />
              </div>
              
              <div id="contact" className="section">
                <ContactSection />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SmoothScrollProvider>
  );
};

export default Index;
