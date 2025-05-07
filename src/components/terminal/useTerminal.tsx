
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
          <p className="mt-1">Try the new <span className="text-terminal-blue font-semibold">showcase</span> command for interactive UI components.</p>
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

  // Fix GSAP animation with proper error handling and safeguards
  useEffect(() => {
    try {
      if (terminalRef.current) {
        // Create a safer animation timeline with explicit defaults
        const tl = gsap.timeline({
          defaults: {
            duration: 0.7,
            ease: "power3.out",
            overwrite: true
          }
        });
        
        // Initial animation for terminal container - with fixed values and error handling
        tl.fromTo(terminalRef.current, 
          { y: -20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8,
            onComplete: () => {
              // Force terminal to stay visible after animation
              if (terminalRef.current) {
                gsap.set(terminalRef.current, { opacity: 1, y: 0, clearProps: "transform" });
              }
            }
          }
        );
        
        // Find all elements inside the terminal for staggered animation with null check
        const elements = terminalRef.current.querySelectorAll('.typewriter *');
        if (elements && elements.length > 0) {
          tl.fromTo(
            elements, 
            { opacity: 0, y: 10 },
            { 
              opacity: 1, 
              y: 0, 
              stagger: 0.1, 
              duration: 0.4,
              clearProps: "all"
            }, 
            "-=0.3"
          );
        }
      }
    } catch (error) {
      console.error("Animation error:", error);
      // Ensure terminal is visible even if animation fails
      if (terminalRef.current) {
        terminalRef.current.style.opacity = "1";
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
      
      // Safely animate the new command with GSAP
      try {
        const responseElements = document.querySelectorAll('.response');
        if (responseElements.length > 0) {
          const lastResponse = responseElements[responseElements.length - 1];
          gsap.fromTo(
            lastResponse,
            { opacity: 0, y: 10 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.4, 
              ease: "power2.out",
              clearProps: "all"
            }
          );
        }
      } catch (error) {
        console.error("Response animation error:", error);
      }
    }, 10);
  };

  // Scroll to bottom of terminal - with additional error handling
  const scrollToBottom = () => {
    try {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
      if (contentRef.current) {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
      }
    } catch (error) {
      console.error("Scroll error:", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
    }
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
