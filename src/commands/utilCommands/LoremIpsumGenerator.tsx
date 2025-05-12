
import React, { useState } from 'react';
import { generateLoremIpsum } from '../../utils/textUtils';
import { Copy } from 'lucide-react';

export const LoremIpsumGenerator = () => {
  const [count, setCount] = useState<number>(3);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [output, setOutput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = () => {
    setOutput(generateLoremIpsum(count, type));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate initial text on component mount
  React.useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">Lorem Ipsum Generator</p>
      <div className="pl-2 border-l-2 border-terminal-darkgray">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-terminal-gray block mb-1">Count: {count}</label>
            <input 
              type="range" 
              min="1" 
              max={type === 'paragraphs' ? 10 : type === 'sentences' ? 20 : 100} 
              value={count} 
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full accent-terminal-green"
            />
          </div>
          <div>
            <label className="text-terminal-gray block mb-1">Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'paragraphs' | 'sentences' | 'words')}
              className="bg-terminal-black bg-opacity-50 border border-terminal-darkgray rounded-md p-2 text-terminal-green w-full"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="terminal-button mb-3"
        >
          Generate
        </button>

        {output && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-terminal-gray">Generated Text:</label>
              <button
                onClick={copyToClipboard}
                className="px-2 py-1 bg-terminal-darkgray text-terminal-green rounded-md hover:bg-opacity-70 transition flex items-center gap-1"
                title="Copy to clipboard"
              >
                <Copy size={14} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-terminal-black bg-opacity-50 border border-terminal-darkgray rounded-md p-2 text-terminal-green font-mono w-full max-h-48 overflow-auto whitespace-pre-wrap">
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
