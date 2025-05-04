
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TerminalHeader from './TerminalHeader';
import TerminalContent from './TerminalContent';
import { aboutData } from '../data/about';
import { about, skills, projects, experience, education, contact } from '../commands/baseCommands';
import { RockPaperScissors, DiceRoller, NumberGuesser, gamesHelp } from '../commands/gameCommands';
import { UUIDGenerator, DateTimeInfo, IPInfo, utilsHelp } from '../commands/utilCommands';
import { ScrollArea } from './ui/scroll-area';
import { Terminal as TerminalIcon, Code, Gamepad, Square } from 'lucide-react';

// Help menu
const help = (
  <div className="mb-4">
    <p className="mb-2 text-terminal-blue font-bold">Available command categories:</p>
    <div className="pl-2 border-l-2 border-terminal-darkgray">
      <table className="table-auto border-collapse">
        <tbody>
          <tr>
            <td className="pr-4 text-terminal-blue flex items-center gap-1"><TerminalIcon className="w-4 h-4" /> basic</td>
            <td className="text-terminal-gray">Basic portfolio commands (about, skills, projects, etc.)</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue flex items-center gap-1"><Gamepad className="w-4 h-4" /> games</td>
            <td className="text-terminal-gray">Fun games to play in the terminal</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue flex items-center gap-1"><Code className="w-4 h-4" /> utils</td>
            <td className="text-terminal-gray">Utility commands (uuid, datetime, etc.)</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue flex items-center gap-1"><Square className="w-4 h-4" /> clear</td>
            <td className="text-terminal-gray">Clear the terminal</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-2 text-terminal-gray">Type 'basic', 'games', or 'utils' to see specific commands in each category</p>
    </div>
  </div>
);

const basicHelp = (
  <div className="mb-4">
    <p className="mb-2 text-terminal-blue font-bold">Basic Portfolio Commands:</p>
    <div className="pl-2 border-l-2 border-terminal-darkgray">
      <table className="table-auto border-collapse">
        <tbody>
          <tr>
            <td className="pr-4 text-terminal-blue">about</td>
            <td className="text-terminal-gray">Learn about me</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue">skills</td>
            <td className="text-terminal-gray">View my technical skills</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue">projects</td>
            <td className="text-terminal-gray">See my projects</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue">experience</td>
            <td className="text-terminal-gray">View my work experience</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue">education</td>
            <td className="text-terminal-gray">See my educational background</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue">contact</td>
            <td className="text-terminal-gray">Get my contact info</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const Terminal = () => {
  const [history, setHistory] = useState<{ command: string; response: React.ReactNode }[]>([
    { 
      command: '', 
      response: (
        <div className="mb-4 typewriter">
          <p className="text-terminal-green">Welcome to <span className="text-terminal-blue font-bold">{aboutData.name.toLowerCase()}'s</span> terminal portfolio!</p>
          <p className="mt-1">Type <span className="text-terminal-blue font-semibold">help</span> to see available commands.</p>
          <p className="mt-1 text-terminal-gray text-xs">Last login: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
        </div>
      ) 
    }
  ]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP animation
  useEffect(() => {
    if (terminalRef.current) {
      gsap.from(terminalRef.current, {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power3.out"
      });
    }
  }, []);

  // Handle command execution
  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    
    // Special handling for clear command
    if (command === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }
    
    let response: React.ReactNode;
    
    // Process command categories
    switch (command) {
      // Basic commands
      case 'about':
        response = about;
        break;
      case 'skills':
        response = skills;
        break;
      case 'projects':
        response = projects;
        break;
      case 'experience':
        response = experience;
        break;
      case 'education':
        response = education;
        break;
      case 'contact':
        response = contact;
        break;
      case 'basic':
        response = basicHelp;
        break;
      
      // Game commands  
      case 'rps':
        response = <RockPaperScissors />;
        break;
      case 'dice':
        response = <DiceRoller />;
        break;
      case 'numguess':
        response = <NumberGuesser />;
        break;
      case 'games':
        response = gamesHelp;
        break;
      
      // Utility commands
      case 'uuid':
        response = <UUIDGenerator />;
        break;
      case 'datetime':
        response = <DateTimeInfo />;
        break;
      case 'ip':
        response = <IPInfo />;
        break;
      case 'utils':
        response = utilsHelp;
        break;
      
      // Help command
      case 'help':
        response = help;
        break;
      
      // Empty command
      case '':
        response = null;
        break;
      
      // Command not found
      default:
        response = <p className="mb-4">Command not found. Type 'help' for available commands.</p>;
    }
    
    // Animate the new command response with GSAP
    const newHistoryItem = { command: cmd, response };
    setHistory(prev => [...prev, newHistoryItem]);
    setInput('');
    
    // Scroll to bottom after a short delay to ensure DOM is updated
    setTimeout(() => {
      scrollToBottom();
      
      // Animate the new command with GSAP
      const responseElements = document.querySelectorAll('.response');
      if (responseElements.length > 0) {
        const lastResponse = responseElements[responseElements.length - 1];
        gsap.from(lastResponse, {
          duration: 0.5,
          y: 20,
          opacity: 0,
          ease: "power2.out"
        });
      }
    }, 10);
  };

  // Scroll to bottom of terminal
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  // Focus input on terminal click
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Auto-focus input on mount and scroll to bottom
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    scrollToBottom();
  }, []);

  // Scroll to bottom whenever history changes
  useEffect(() => {
    scrollToBottom();
  }, [history]);

  return (
    <div 
      className="terminal-window max-w-4xl w-full mx-auto my-8 shadow-lg h-[80vh] rounded-md overflow-hidden border border-terminal-darkgray"
      onClick={focusInput}
      ref={terminalRef}
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
