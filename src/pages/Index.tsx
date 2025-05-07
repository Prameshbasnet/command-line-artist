
import React from "react";
import { Terminal } from "../components/terminal";
import { aboutData } from "../data/about";

const Index = () => {
  return (
    <div 
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
