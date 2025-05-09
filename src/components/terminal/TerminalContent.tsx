
import React from 'react';

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
  return (
    <div className="terminal-content px-4 py-2 font-mono text-sm leading-relaxed" ref={contentRef}>
      {history.map((item, index) => (
        <div key={index} className="mb-3 command-response-pair">
          {item.command && (
            <div className="terminal-prompt mb-1 flex items-center">
              <span className="text-terminal-blue mr-1 font-bold">guest@portfolio:{currentPath}$</span>
              <span className="command text-terminal-green">{item.command}</span>
            </div>
          )}
          <div className="response pl-0 text-terminal-gray">{item.response}</div>
        </div>
      ))}
      
      <form onSubmit={handleSubmit} className="terminal-prompt flex items-center">
        <span className="text-terminal-blue mr-1 font-bold">guest@portfolio:{currentPath}$</span>
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
            spellCheck="false"
          />
          <span className="cursor absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-terminal-green inline-block animate-blink"></span>
        </div>
      </form>
    </div>
  );
};

export default TerminalContent;
