
import React from 'react';
import { Terminal as TerminalIcon, X, Minus } from 'lucide-react';

interface TerminalHeaderProps {
  title: string;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ title }) => {
  return (
    <div className="terminal-header bg-terminal-darkgray p-2 flex items-center justify-between rounded-t-md">
      <div className="flex items-center">
        <TerminalIcon className="w-4 h-4 text-terminal-green mr-2" />
        <span className="text-terminal-gray text-sm">{title}</span>
      </div>
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center">
          <Minus className="w-2 h-2 text-yellow-800 opacity-0 group-hover:opacity-100" />
        </div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center">
          <X className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default TerminalHeader;
