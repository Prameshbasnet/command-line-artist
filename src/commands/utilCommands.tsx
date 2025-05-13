
import React from 'react';
import { Code, Cpu, FlipHorizontal, TerminalSquare, Text } from 'lucide-react';

// Help menu for utility commands
export const utilsHelp = (
  <div className="mb-4">
    <p className="mb-2 text-terminal-blue font-bold">Available Utilities:</p>
    <div className="pl-2 border-l-2 border-terminal-darkgray">
      <table className="table-auto border-collapse">
        <tbody>
          <tr>
            <td className="pr-4 text-terminal-blue flex items-center gap-1">
              <Code className="w-4 h-4" /> uuid
            </td>
            <td className="text-terminal-gray">Generate UUIDs (single or bulk)</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue flex items-center gap-1">
              <FlipHorizontal className="w-4 h-4" /> base64
            </td>
            <td className="text-terminal-gray">Encode/decode Base64</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue flex items-center gap-1">
              <Cpu className="w-4 h-4" /> password
            </td>
            <td className="text-terminal-gray">Generate secure passwords</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue flex items-center gap-1">
              <TerminalSquare className="w-4 h-4" /> datetime
            </td>
            <td className="text-terminal-gray">Show date and time information</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue flex items-center gap-1">
              <Text className="w-4 h-4" /> lorem
            </td>
            <td className="text-terminal-gray">Generate Lorem Ipsum placeholder text</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
