
import React from "react";
import { Terminal } from "../components/terminal";
import { aboutData } from "../data/about";

const Index = () => {
  return (
    <div 
      className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center bg-gradient-to-b from-[#0D0D12] via-[#131320] to-[#1A1A28]"
    >
      <div className="mb-8">
        <h1 className="text-terminal-green text-4xl mb-3 font-bold text-center typewriter shadow-glow">{aboutData.name}'s Terminal</h1>
        <p className="text-terminal-gray text-center text-lg">A sophisticated command-line portfolio experience</p>
      </div>
      <Terminal />
      <div className="mt-10 text-center">
        <p className="text-terminal-gray text-sm">
          © {new Date().getFullYear()} {aboutData.name}. All rights reserved.
        </p>
        <p className="text-terminal-blue text-sm mt-2 hover:text-terminal-green transition-colors">
          Type <span className="text-terminal-green font-bold">help</span> to see available commands
        </p>
      </div>
    </div>
  );
};

export default Index;
