
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

  // Enhanced GSAP animation for terminal appearance
  useEffect(() => {
    if (terminalRef.current) {
      // Create a timeline for more complex animations
      const tl = gsap.timeline();
      
      tl.from(terminalRef.current, {
        duration: 0.8,
        y: -30,
        opacity: 0,
        ease: "power3.out"
      });
      
      // Find elements inside the terminal for staggered animation
      const elements = terminalRef.current.querySelectorAll('.typewriter *');
      if (elements.length) {
        tl.from(elements, {
          opacity: 0,
          y: 15,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.4");
      }
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
    
    // Process the command
    const response = processCommand(command);
    
    // Create new history item
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
          duration: 0.4,
          y: 15,
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
