
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

interface TerminalContentProps {
  history: { command: string; response: React.ReactNode }[];
  currentPath: string;
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  handleKeyDown?: (e: React.KeyboardEvent) => void;
  animateNewCommand: (element: HTMLElement) => void;
  animateResponse: (element: HTMLElement) => void;
  animateUtilityTool: (element: HTMLElement) => void;
}

const TerminalContent: React.FC<TerminalContentProps> = ({
  history,
  currentPath,
  input,
  setInput,
  handleSubmit,
  inputRef,
  contentRef,
  handleKeyDown,
  animateNewCommand,
  animateResponse,
  animateUtilityTool
}) => {
  const isMobile = useIsMobile();
  const lastHistoryLength = useRef(history.length);
  
  useEffect(() => {
    // Animate new history items
    if (history.length > lastHistoryLength.current) {
      const lastItem = contentRef.current?.querySelector('.command-response-pair:last-child');
      if (lastItem) {
        const command = lastItem.querySelector('.terminal-prompt');
        const response = lastItem.querySelector('.response');
        
        if (command && command instanceof HTMLElement) {
          animateNewCommand(command);
        }
        
        if (response && response instanceof HTMLElement) {
          // Check if response contains utility tools
          const utilityTool = response.querySelector('[class*="mb-4"]:first-child');
          if (utilityTool instanceof HTMLElement && (utilityTool.textContent?.includes('Generator') || utilityTool.textContent?.includes('Encoder') || utilityTool.textContent?.includes('Decoder'))) {
            animateUtilityTool(utilityTool);
          } else {
            animateResponse(response);
          }
        }
      }
    }
    lastHistoryLength.current = history.length;
  }, [history, animateNewCommand, animateResponse, animateUtilityTool]);
  
  return (
    <div className="terminal-content px-2 sm:px-5 py-3 sm:py-4 font-mono text-xs sm:text-sm leading-relaxed" ref={contentRef}>
      {history.map((item, index) => (
        <div key={index} className="mb-4 sm:mb-5 command-response-pair">
          {item.command && (
            <div className="terminal-prompt mb-1 sm:mb-2 flex items-center flex-wrap">
              <span className="text-terminal-purple mr-1 font-bold">portfolio:<span className="text-terminal-blue">{currentPath}</span>$</span>
              <span className="command text-terminal-green font-semibold">{item.command}</span>
            </div>
          )}
          <div className="response pl-0 text-terminal-gray">{item.response}</div>
        </div>
      ))}
      
      <form onSubmit={handleSubmit} className="terminal-prompt flex items-center flex-wrap">
        <span className="text-terminal-purple mr-1 font-bold">portfolio:<span className="text-terminal-blue">{currentPath}</span>$</span>
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="command flex-1 bg-transparent border-none outline-none text-terminal-green font-semibold w-full pr-2"
            ref={inputRef}
            autoComplete="off"
            autoFocus
            aria-label="Terminal command input"
            spellCheck="false"
          />
          <span className="cursor absolute right-0 top-1/2 -translate-y-1/2 w-2 h-5 bg-terminal-green inline-block animate-blink"></span>
        </div>
      </form>
    </div>
  );
};

export default TerminalContent;
