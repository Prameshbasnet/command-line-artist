
import { useState, useRef, useEffect } from 'react';
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
        <div className="mb-4">
          <p className="text-terminal-green typewriter">Welcome to <span className="text-terminal-purple font-bold">{aboutData.name.toLowerCase()}'s</span> terminal portfolio!</p>
          <p className="mt-1">Type <span className="text-terminal-blue font-semibold">help</span> to see available commands.</p>
          <p className="mt-1 text-terminal-gray text-xs">Last login: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
        </div>
      ) 
    }
  ]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Handle command execution
  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    
    // Add to command history
    if (command) {
      setCommandHistory(prev => [command, ...prev]);
      setHistoryIndex(-1);
    }
    
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
  };

  // Scroll to bottom of terminal
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }, 10);
      }
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

  // Handle keyboard navigation for command history
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
    handleKeyDown,
  };
};
