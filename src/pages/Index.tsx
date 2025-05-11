
import React from "react";
import { Terminal } from "../components/terminal";
import { aboutData } from "../data/about";

const Index = () => {
  return (
    <div 
      className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center bg-gradient-to-b from-[#0D0D12] via-[#131320] to-[#1A1A28]"
    >
      <div className="mb-6">
        <h1 className="text-terminal-green text-3xl mb-2 font-bold text-center typewriter">{aboutData.name}'s Terminal</h1>
        <p className="text-terminal-gray text-center">A command-line portfolio experience</p>
      </div>
      <Terminal />
      <div className="mt-8 text-center">
        <p className="text-terminal-gray text-xs">
          © {new Date().getFullYear()} {aboutData.name}. All rights reserved.
        </p>
        <p className="text-terminal-gray text-xs mt-1">
          Type <span className="text-terminal-green">help</span> to see available commands.
        </p>
      </div>
    </div>
  );
};

export default Index;
