
import React from "react";
import { Terminal } from "../components/terminal";
import { aboutData } from "../data/about";
import { useIsMobile } from "../hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className="min-h-screen p-2 sm:p-8 flex flex-col items-center justify-center bg-gradient-to-b from-[#0D0D12] via-[#131320] to-[#1A1A28]"
    >
      <div className="mb-4 sm:mb-8 px-2">
        <h1 className="text-terminal-green text-2xl sm:text-4xl mb-2 sm:mb-3 font-bold text-center typewriter shadow-glow">{aboutData.name}'s Terminal</h1>
        <p className="text-terminal-gray text-center text-sm sm:text-lg">A sophisticated command-line portfolio experience</p>
        <p className="text-terminal-blue text-center text-xs sm:text-sm mt-2">Type <span className="text-terminal-green font-bold">help</span> to see available commands</p>
      </div>
      <Terminal />
      <div className="mt-6 sm:mt-10 text-center px-2">
        <p className="text-terminal-gray text-xs sm:text-sm">
          © {new Date().getFullYear()} {aboutData.name}. All rights reserved.
        </p>
        {isMobile && (
          <p className="text-terminal-gray text-xs mt-2">
            For best experience, try in landscape mode
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;
