
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
  } = useTerminal();

  return (
    <div 
      className="terminal-window max-w-4xl w-full mx-auto shadow-lg h-[80vh] rounded-md overflow-hidden border border-terminal-darkgray"
      onClick={focusInput}
    >
      <TerminalHeader title={`${aboutData.name.toLowerCase()}@portfolio:~$`} />
      <ScrollArea className="h-[calc(80vh-32px)]" ref={scrollAreaRef}>
        <TerminalContent 
          history={history} 
          currentPath={currentPath} 
          input={input} 
          setInput={setInput}
          handleSubmit={handleSubmit}
          inputRef={inputRef}
          contentRef={contentRef}
        />
      </ScrollArea>
    </div>
  );
};

export default Terminal;
