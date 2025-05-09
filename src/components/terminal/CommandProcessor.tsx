
import React from 'react';
import { about, skills, projects, experience, education, contact } from '../../commands/baseCommands';
import { RockPaperScissors, DiceRoller, NumberGuesser, gamesHelp } from '../../commands/gameCommands';
import { UUIDGenerator, DateTimeInfo, PasswordGenerator, utilsHelp } from '../../commands/utilCommands';
import { Terminal as TerminalIcon, Circle, Square } from 'lucide-react';

// Help menu
export const help = (
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
            <td className="pr-4 text-terminal-blue flex items-center gap-1"><Circle className="w-4 h-4" /> games</td>
            <td className="text-terminal-gray">Fun games to play in the terminal</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue flex items-center gap-1"><Circle className="w-4 h-4" /> utils</td>
            <td className="text-terminal-gray">Utility commands (uuid, password, datetime, etc.)</td>
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

export const basicHelp = (
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

export const processCommand = (command: string): React.ReactNode => {
  // Process command categories
  switch (command) {
    // Basic commands
    case 'about':
      return about;
    case 'skills':
      return skills;
    case 'projects':
      return projects;
    case 'experience':
      return experience;
    case 'education':
      return education;
    case 'contact':
      return contact;
    case 'basic':
      return basicHelp;
    
    // Game commands  
    case 'rps':
      return <RockPaperScissors />;
    case 'dice':
      return <DiceRoller />;
    case 'numguess':
      return <NumberGuesser />;
    case 'games':
      return gamesHelp;
    
    // Utility commands
    case 'uuid':
      return <UUIDGenerator />;
    case 'datetime':
      return <DateTimeInfo />;
    case 'password':
      return <PasswordGenerator />;
    case 'utils':
      return utilsHelp;
    
    // Help command
    case 'help':
      return help;
    
    // Empty command
    case '':
      return null;
    
    // Command not found
    default:
      return <p className="mb-4">Command not found. Type 'help' for available commands.</p>;
  }
};
