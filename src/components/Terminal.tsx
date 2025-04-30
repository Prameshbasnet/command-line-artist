
import React, { useState, useEffect, useRef } from 'react';
import TerminalHeader from './TerminalHeader';
import TerminalContent from './TerminalContent';

const Terminal = () => {
  const [history, setHistory] = useState<{ command: string; response: React.ReactNode }[]>([
    { 
      command: '', 
      response: (
        <div className="mb-4 typewriter">
          <p className="text-terminal-blue">Welcome to my terminal portfolio!</p>
          <p>Type <span className="text-terminal-blue">help</span> to see available commands.</p>
        </div>
      ) 
    }
  ]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Commands
  const about = (
    <div className="mb-4">
      <p className="mb-2">Hello! I'm [Your Name], a web developer with a passion for creating elegant solutions.</p>
      <p>I specialize in building modern web applications using React, TypeScript, and Node.js.</p>
      <p>When not coding, you'll find me hiking, reading, or experimenting with new technologies.</p>
    </div>
  );

  const skills = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue">Technical Skills:</p>
      <ul className="list-disc list-inside mb-2">
        <li>Frontend: React, TypeScript, Next.js, Tailwind CSS</li>
        <li>Backend: Node.js, Express, MongoDB</li>
        <li>Tools: Git, Docker, VS Code</li>
        <li>Other: Responsive Design, REST APIs</li>
      </ul>
    </div>
  );

  const projects = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue">Projects:</p>
      
      <div className="mb-3">
        <p className="font-bold">Project One</p>
        <p className="pl-4">A full-stack application built with React and Node.js</p>
        <p className="pl-4 text-terminal-blue">github.com/yourusername/project-one</p>
      </div>
      
      <div className="mb-3">
        <p className="font-bold">Project Two</p>
        <p className="pl-4">An e-commerce platform using Next.js and Stripe</p>
        <p className="pl-4 text-terminal-blue">github.com/yourusername/project-two</p>
      </div>
      
      <div className="mb-3">
        <p className="font-bold">Project Three</p>
        <p className="pl-4">A real-time chat application with Socket.io</p>
        <p className="pl-4 text-terminal-blue">github.com/yourusername/project-three</p>
      </div>
    </div>
  );

  const contact = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue">Contact Information:</p>
      <p>Email: your.email@example.com</p>
      <p>GitHub: github.com/yourusername</p>
      <p>LinkedIn: linkedin.com/in/yourusername</p>
      <p>Twitter: @yourusername</p>
    </div>
  );

  const help = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue">Available commands:</p>
      <ul>
        <li><span className="text-terminal-blue">about</span> - Learn about me</li>
        <li><span className="text-terminal-blue">skills</span> - View my technical skills</li>
        <li><span className="text-terminal-blue">projects</span> - See my projects</li>
        <li><span className="text-terminal-blue">contact</span> - Get my contact info</li>
        <li><span className="text-terminal-blue">clear</span> - Clear the terminal</li>
        <li><span className="text-terminal-blue">help</span> - Show this help message</li>
      </ul>
    </div>
  );

  // Handle command execution
  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    
    let response: React.ReactNode;
    
    switch (command) {
      case 'about':
        response = about;
        break;
      case 'skills':
        response = skills;
        break;
      case 'projects':
        response = projects;
        break;
      case 'contact':
        response = contact;
        break;
      case 'help':
        response = help;
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        response = null;
        break;
      default:
        response = <p className="mb-4">Command not found. Type 'help' for available commands.</p>;
    }
    
    setHistory(prev => [...prev, { command: cmd, response }]);
    setInput('');
    
    // Scroll to bottom
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
      }
    }, 0);
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

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div 
      className="terminal-window max-w-4xl w-full mx-auto my-8 shadow-lg h-[80vh]"
      onClick={focusInput}
    >
      <TerminalHeader title="portfolio.sh" />
      <TerminalContent 
        history={history} 
        currentPath={currentPath} 
        input={input} 
        setInput={setInput}
        handleSubmit={handleSubmit}
        inputRef={inputRef}
        contentRef={contentRef}
      />
    </div>
  );
};

export default Terminal;
