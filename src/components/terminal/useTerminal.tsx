
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { processCommand } from './CommandProcessor';
import { aboutData } from '../../data/about';

type HistoryItem = {
  command: string;
  response: React.ReactNode;
};

export const useTerminal = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
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
    
    // Process the command
    response = processCommand(command);
    
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

  return {
    history,
    input,
    setInput,
    currentPath,
    handleSubmit,
    focusInput,
    inputRef,
    contentRef,
    scrollAreaRef,
    terminalRef,
  };
};
