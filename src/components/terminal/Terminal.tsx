
import React from 'react';
import TerminalHeader from './TerminalHeader';
import TerminalContent from './TerminalContent';
import { ScrollArea } from '../ui/scroll-area';
import { useTerminal } from './useTerminal';
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

  return (
    <div 
      className="terminal-window w-full max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden border border-terminal-darkgray bg-gradient-to-b from-terminal-black to-[#0F0F16] transition-all hover:shadow-[0_0_15px_rgba(78,245,167,0.25)]"
      onClick={focusInput}
    >
      <TerminalHeader title={`${aboutData.name.toLowerCase()}@portfolio:~$`} />
      <ScrollArea 
        className="h-[calc(70vh)]" 
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
        />
      </ScrollArea>
    </div>
  );
};

export default Terminal;
