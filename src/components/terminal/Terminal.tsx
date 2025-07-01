
import React from 'react';
import TerminalHeader from './TerminalHeader';
import TerminalContent from './TerminalContent';
import { ScrollArea } from '../ui/scroll-area';
import { useTerminal } from './useTerminal';
import { useTerminalAnimations } from '../../hooks/useTerminalAnimations';
import { useIsMobile } from '../../hooks/use-mobile';
import { aboutData } from '../../data/about';

const Terminal = () => {
  const {
    history,
    input,
    setInput,
    currentPath,
    handleSubmit,
    focusInput,
    inputRef,
    contentRef,
    scrollAreaRef,
    handleKeyDown,
  } = useTerminal();
  
  const { terminalRef, animateNewCommand, animateResponse, animateUtilityTool } = useTerminalAnimations();
  const isMobile = useIsMobile();

  return (
    <div 
      ref={terminalRef}
      className="terminal-window w-full max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden border border-terminal-darkgray bg-gradient-to-b from-terminal-black to-[#0F0F16] transition-all"
      onClick={focusInput}
    >
      <TerminalHeader title={`${aboutData.name.toLowerCase()}@portfolio:~$`} />
      <ScrollArea 
        className={`${isMobile ? 'h-[60vh]' : 'h-[70vh]'}`}
        ref={scrollAreaRef}
      >
        <TerminalContent 
          history={history} 
          currentPath={currentPath} 
          input={input} 
          setInput={setInput}
          handleSubmit={handleSubmit}
          inputRef={inputRef}
          contentRef={contentRef}
          handleKeyDown={handleKeyDown}
          animateNewCommand={animateNewCommand}
          animateResponse={animateResponse}
          animateUtilityTool={animateUtilityTool}
        />
      </ScrollArea>
    </div>
  );
};

export default Terminal;
