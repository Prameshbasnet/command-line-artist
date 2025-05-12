
import React, { useState } from 'react';
import { generateUUID } from '../../utils/uuidGenerator';
import { Copy, RefreshCcw } from 'lucide-react';

export const UUIDGenerator = () => {
  const [uuids, setUuids] = useState<string[]>([generateUUID()]);
  const [count, setCount] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateNewUuids = () => {
    const newUuids = Array(count).fill(null).map(() => generateUUID());
    setUuids(newUuids);
    setCopied(false);
    setCopiedIndex(null);
  };

  const copyToClipboard = (index?: number) => {
    if (index !== undefined) {
      // Copy specific UUID
      navigator.clipboard.writeText(uuids[index]);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      // Copy all UUIDs
      navigator.clipboard.writeText(uuids.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">UUID Generator</p>
      <div className="pl-2 border-l-2 border-terminal-darkgray">
        <div className="mb-3">
          <label className="text-terminal-gray block mb-1">Number of UUIDs: {count}</label>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={count} 
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full accent-terminal-green"
          />
          <div className="flex mt-1 justify-between text-terminal-gray text-xs">
            <span>1</span>
            <span>10</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
        
        <button
          onClick={generateNewUuids}
          className="terminal-button mb-2 flex items-center gap-1"
        >
          <RefreshCcw size={14} />
          Generate {count} UUID{count > 1 ? 's' : ''}
        </button>

        <div className="mb-3">
          {uuids.length > 1 && (
            <div className="flex justify-between items-center mb-1">
              <span className="text-terminal-gray">Generated {uuids.length} UUIDs:</span>
              <button
                onClick={() => copyToClipboard()}
                className="px-2 py-1 bg-terminal-darkgray text-terminal-green rounded-md hover:bg-opacity-70 transition flex items-center gap-1"
                title="Copy all UUIDs"
              >
                <Copy size={14} />
                {copied ? 'All Copied!' : 'Copy All'}
              </button>
            </div>
          )}

          <div className="bg-terminal-black bg-opacity-50 border border-terminal-darkgray rounded-md p-2 max-h-48 overflow-auto">
            {uuids.map((uuid, index) => (
              <div key={index} className="text-terminal-gray break-all flex items-center mb-1 last:mb-0">
                <span className="text-xs mr-2 text-terminal-blue">{index + 1}.</span>
                <span className="flex-grow">{uuid}</span>
                <button
                  onClick={() => copyToClipboard(index)}
                  className="ml-2 px-1 py-0.5 bg-terminal-darkgray text-terminal-green text-xs rounded-md hover:bg-opacity-70 transition flex items-center gap-1"
                  title="Copy UUID"
                >
                  {copiedIndex === index ? 'Copied!' : <Copy size={12} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
