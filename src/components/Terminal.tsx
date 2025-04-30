
import React, { useState, useEffect, useRef } from 'react';
import TerminalHeader from './TerminalHeader';
import TerminalContent from './TerminalContent';
import { aboutData } from '../data/about';
import { skillsData } from '../data/skills';
import { projectsData } from '../data/projects';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';

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
      <p className="mb-2 text-terminal-blue font-bold">{aboutData.name}</p>
      <p className="mb-1">{aboutData.location} • {aboutData.phone} • {aboutData.email}</p>
      <p className="mb-2">{aboutData.website}</p>
      <p className="mb-2">• {aboutData.linkedin} • {aboutData.github}</p>
      <p className="mt-4">{aboutData.summary}</p>
    </div>
  );

  const skills = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue">Technical Skills:</p>
      
      <div className="mb-2">
        <p className="font-medium">Languages & Frameworks:</p>
        <p className="pl-4">{skillsData.languages.join(', ')}</p>
      </div>
      
      <div className="mb-2">
        <p className="font-medium">Databases:</p>
        <p className="pl-4">{skillsData.databases.join(', ')}</p>
      </div>
      
      <div className="mb-2">
        <p className="font-medium">Tools & Platforms:</p>
        <p className="pl-4">{skillsData.tools.join(', ')}</p>
      </div>
      
      <div className="mb-2">
        <p className="font-medium">Other:</p>
        <p className="pl-4">{skillsData.other.join(', ')}</p>
      </div>
    </div>
  );

  const projects = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue">Projects:</p>
      
      {projectsData.map((project, index) => (
        <div key={index} className="mb-3">
          <p className="font-bold">{project.name}</p>
          <p className="pl-4 italic">Technologies: {project.technologies}</p>
          <ul className="list-disc list-inside pl-4">
            {project.description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const experience = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue">Work Experience:</p>
      
      {experienceData.map((job, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between">
            <p className="font-bold">{job.title}</p>
            <p>{job.period}</p>
          </div>
          <ul className="list-disc list-inside pl-4">
            {job.responsibilities.map((responsibility, i) => (
              <li key={i}>{responsibility}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const education = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue">Education:</p>
      
      {educationData.map((edu, index) => (
        <div key={index} className="mb-2">
          <div className="flex justify-between">
            <p className="font-bold">{edu.degree}</p>
            <p>{edu.period}</p>
          </div>
          <p>{edu.institution}</p>
        </div>
      ))}
    </div>
  );

  const contact = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue">Contact Information:</p>
      <p>Email: {aboutData.email}</p>
      <p>Phone: {aboutData.phone}</p>
      <p>GitHub: {aboutData.github}</p>
      <p>LinkedIn: {aboutData.linkedin}</p>
      <p>Website: {aboutData.website}</p>
    </div>
  );

  const help = (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue">Available commands:</p>
      <ul>
        <li><span className="text-terminal-blue">about</span> - Learn about me</li>
        <li><span className="text-terminal-blue">skills</span> - View my technical skills</li>
        <li><span className="text-terminal-blue">projects</span> - See my projects</li>
        <li><span className="text-terminal-blue">experience</span> - View my work experience</li>
        <li><span className="text-terminal-blue">education</span> - See my educational background</li>
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
      <TerminalHeader title={`${aboutData.name.toLowerCase()}.sh`} />
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
