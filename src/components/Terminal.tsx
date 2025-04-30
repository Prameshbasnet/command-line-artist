
import React, { useState, useEffect, useRef } from 'react';
import TerminalHeader from './TerminalHeader';
import TerminalContent from './TerminalContent';
import { aboutData } from '../data/about';
import { skillsData } from '../data/skills';
import { projectsData } from '../data/projects';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';
import { ScrollArea } from './ui/scroll-area';

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

  // Commands
  const about = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">{aboutData.name}</p>
      <div className="pl-2 border-l-2 border-terminal-darkgray">
        <p className="mb-1">{aboutData.location} • {aboutData.phone}</p>
        <p className="mb-1">{aboutData.email}</p>
        <p className="mb-1">{aboutData.website}</p>
        <p className="mb-2">
          <a href={aboutData.linkedin} target="_blank" rel="noopener noreferrer" className="text-terminal-blue hover:underline">LinkedIn</a> • 
          <a href={aboutData.github} target="_blank" rel="noopener noreferrer" className="text-terminal-blue hover:underline ml-2">GitHub</a>
        </p>
        <p className="mt-4 text-terminal-gray">{aboutData.summary}</p>
      </div>
    </div>
  );

  const skills = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">Technical Skills:</p>
      <div className="pl-2 border-l-2 border-terminal-darkgray">
        <div className="mb-2">
          <p className="font-medium text-terminal-green">Languages & Frameworks:</p>
          <p className="pl-4 text-terminal-gray">{skillsData.languages.join(', ')}</p>
        </div>
        
        <div className="mb-2">
          <p className="font-medium text-terminal-green">Databases:</p>
          <p className="pl-4 text-terminal-gray">{skillsData.databases.join(', ')}</p>
        </div>
        
        <div className="mb-2">
          <p className="font-medium text-terminal-green">Tools & Platforms:</p>
          <p className="pl-4 text-terminal-gray">{skillsData.tools.join(', ')}</p>
        </div>
        
        <div className="mb-2">
          <p className="font-medium text-terminal-green">Other:</p>
          <p className="pl-4 text-terminal-gray">{skillsData.other.join(', ')}</p>
        </div>
      </div>
    </div>
  );

  const projects = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">Projects:</p>
      
      {projectsData.map((project, index) => (
        <div key={index} className="mb-3 pl-2 border-l-2 border-terminal-darkgray">
          <p className="font-bold text-terminal-green">{project.name}</p>
          <p className="pl-4 italic text-xs text-terminal-gray">Technologies: {project.technologies}</p>
          <ul className="list-disc list-inside pl-4 text-terminal-gray">
            {project.description.map((item, i) => (
              <li key={i} className="text-sm">{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const experience = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">Work Experience:</p>
      
      {experienceData.map((job, index) => (
        <div key={index} className="mb-3 pl-2 border-l-2 border-terminal-darkgray">
          <div className="flex justify-between">
            <p className="font-bold text-terminal-green">{job.title}</p>
            <p className="text-terminal-gray text-sm">{job.period}</p>
          </div>
          <ul className="list-disc list-inside pl-4 text-terminal-gray">
            {job.responsibilities.map((responsibility, i) => (
              <li key={i} className="text-sm">{responsibility}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const education = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">Education:</p>
      
      {educationData.map((edu, index) => (
        <div key={index} className="mb-2 pl-2 border-l-2 border-terminal-darkgray">
          <div className="flex justify-between">
            <p className="font-bold text-terminal-green">{edu.degree}</p>
            <p className="text-terminal-gray text-sm">{edu.period}</p>
          </div>
          <p className="text-terminal-gray">{edu.institution}</p>
        </div>
      ))}
    </div>
  );

  const contact = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">Contact Information:</p>
      <div className="pl-2 border-l-2 border-terminal-darkgray">
        <p className="text-terminal-gray"><span className="text-terminal-green">Email:</span> {aboutData.email}</p>
        <p className="text-terminal-gray"><span className="text-terminal-green">Phone:</span> {aboutData.phone}</p>
        <p className="text-terminal-gray"><span className="text-terminal-green">GitHub:</span> <a href={aboutData.github} target="_blank" rel="noopener noreferrer" className="text-terminal-blue hover:underline">{aboutData.github}</a></p>
        <p className="text-terminal-gray"><span className="text-terminal-green">LinkedIn:</span> <a href={aboutData.linkedin} target="_blank" rel="noopener noreferrer" className="text-terminal-blue hover:underline">{aboutData.linkedin}</a></p>
        <p className="text-terminal-gray"><span className="text-terminal-green">Website:</span> <a href={aboutData.website} target="_blank" rel="noopener noreferrer" className="text-terminal-blue hover:underline">{aboutData.website}</a></p>
      </div>
    </div>
  );

  const help = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">Available commands:</p>
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
            <tr>
              <td className="pr-4 text-terminal-blue">clear</td>
              <td className="text-terminal-gray">Clear the terminal</td>
            </tr>
            <tr>
              <td className="pr-4 text-terminal-blue">help</td>
              <td className="text-terminal-gray">Show this help message</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

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
      case 'experience':
        response = experience;
        break;
      case 'education':
        response = education;
        break;
      case 'contact':
        response = contact;
        break;
      case 'help':
        response = help;
        break;
      case '':
        response = null;
        break;
      default:
        response = <p className="mb-4">Command not found. Type 'help' for available commands.</p>;
    }
    
    setHistory(prev => [...prev, { command: cmd, response }]);
    setInput('');
    
    // Scroll to bottom after a short delay to ensure DOM is updated
    setTimeout(() => {
      scrollToBottom();
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
