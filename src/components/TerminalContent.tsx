
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
    <div className="terminal-content h-full overflow-y-auto" ref={contentRef}>
      {history.map((item, index) => (
        <div key={index}>
          {item.command && (
            <div className="terminal-prompt mb-1">
              <span className="text-terminal-blue mr-2">guest@portfolio:{currentPath}$</span>
              <span className="command">{item.command}</span>
            </div>
          )}
          <div className="response">{item.response}</div>
        </div>
      ))}
      
      <form onSubmit={handleSubmit} className="terminal-prompt">
        <span className="text-terminal-blue mr-2">guest@portfolio:{currentPath}$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="command flex-1 bg-transparent border-none outline-none text-terminal-green"
          ref={inputRef}
          autoComplete="off"
          autoFocus
        />
      </form>
    </div>
  );
};

export default TerminalContent;
