
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TerminalContentProps {
  history: { command: string; response: React.ReactNode }[];
  currentPath: string;
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  contentRef: React.RefObject<HTMLDivElement>;
}

const TerminalContent: React.FC<TerminalContentProps> = ({
  history,
  currentPath,
  input,
  setInput,
  handleSubmit,
  inputRef,
  contentRef
}) => {
  const commandLineRef = useRef<HTMLFormElement>(null);
  
  // Animate new commands as they come in using GSAP
  useEffect(() => {
    if (history.length > 0 && commandLineRef.current) {
      gsap.from(commandLineRef.current, {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: "power2.out"
      });
    }
  }, [history.length]);

  return (
    <div className="terminal-content p-4 font-mono" ref={contentRef}>
      {history.map((item, index) => (
        <div key={index} className="mb-3">
          {item.command && (
            <div className="terminal-prompt mb-1 flex">
              <span className="text-terminal-blue mr-1">guest@portfolio:{currentPath}$</span>
              <span className="command text-terminal-green">{item.command}</span>
            </div>
          )}
          <div className="response pl-0">{item.response}</div>
        </div>
      ))}
      
      <form ref={commandLineRef} onSubmit={handleSubmit} className="terminal-prompt flex">
        <span className="text-terminal-blue mr-1">guest@portfolio:{currentPath}$</span>
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="command flex-1 bg-transparent border-none outline-none text-terminal-green w-full pr-2"
            ref={inputRef}
            autoComplete="off"
            autoFocus
            aria-label="Terminal command input"
          />
          <span className="cursor absolute right-0 top-0 w-2 h-5 bg-terminal-green inline-block animate-blink"></span>
        </div>
      </form>
    </div>
  );
};

export default TerminalContent;
