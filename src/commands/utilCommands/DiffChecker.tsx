
import React, { useState } from 'react';
import { findDifferences } from '../../utils/textUtils';
import { Copy } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export const DiffChecker = () => {
  const [text1, setText1] = useState<string>('');
  const [text2, setText2] = useState<string>('');
  const [differences, setDifferences] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCompare = () => {
    const diffs = findDifferences(text1, text2);
    setDifferences(diffs);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(differences.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">Diff Checker</p>
      <div className="pl-2 border-l-2 border-terminal-darkgray">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-terminal-gray block mb-1">Text 1:</label>
            <Textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="bg-terminal-black bg-opacity-50 border border-terminal-darkgray rounded-md p-2 text-terminal-green font-mono w-full h-24 resize-none"
              placeholder="First text block..."
            />
          </div>
          <div>
            <label className="text-terminal-gray block mb-1">Text 2:</label>
            <Textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="bg-terminal-black bg-opacity-50 border border-terminal-darkgray rounded-md p-2 text-terminal-green font-mono w-full h-24 resize-none"
              placeholder="Second text block..."
            />
          </div>
        </div>

        <button
          onClick={handleCompare}
          className="terminal-button mb-3"
        >
          Compare
        </button>

        {differences.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-terminal-gray">Differences:</label>
              <button
                onClick={copyToClipboard}
                className="px-2 py-1 bg-terminal-darkgray text-terminal-green rounded-md hover:bg-opacity-70 transition flex items-center gap-1"
                title="Copy to clipboard"
              >
                <Copy size={14} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-terminal-black bg-opacity-50 border border-terminal-darkgray rounded-md p-2 font-mono w-full max-h-48 overflow-auto">
              {differences.map((line, index) => (
                <div key={index} className={`${
                  line.startsWith("- ") ? "text-red-400" : 
                  line.startsWith("+ ") ? "text-green-400" : 
                  "text-terminal-gray"
                }`}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
