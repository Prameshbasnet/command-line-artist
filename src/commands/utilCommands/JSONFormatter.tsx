
import React, { useState } from 'react';
import { formatJSON } from '../../utils/textUtils';
import { Copy, Check } from 'lucide-react';

export const JSONFormatter = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const handleFormat = () => {
    const result = formatJSON(input);
    setOutput(result.formatted);
    setIsValid(result.isValid);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">JSON Formatter & Validator</p>
      <div className="pl-2 border-l-2 border-terminal-darkgray">
        <div className="mb-2">
          <label className="text-terminal-gray block mb-1">Input JSON:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-terminal-black bg-opacity-50 border border-terminal-darkgray rounded-md p-2 text-terminal-green font-mono w-full h-24 resize-none"
            placeholder="Paste your JSON here..."
          />
        </div>

        <button
          onClick={handleFormat}
          className="terminal-button mb-2"
        >
          Format & Validate
        </button>

        {output && (
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <label className="text-terminal-gray">Formatted JSON:</label>
              <span className={isValid ? "text-terminal-green" : "text-red-500"}>
                {isValid ? "✓ Valid JSON" : "✗ Invalid JSON"}
              </span>
            </div>
            <div className="relative">
              <textarea
                readOnly
                value={output}
                className={`bg-terminal-black bg-opacity-50 border ${isValid ? "border-terminal-darkgray" : "border-red-500"} rounded-md p-2 text-terminal-green font-mono w-full h-36 resize-none`}
              />
              <button
                onClick={copyToClipboard}
                disabled={!isValid}
                className="absolute top-2 right-2 px-2 py-1 bg-terminal-darkgray text-terminal-green rounded-md hover:bg-opacity-70 transition flex items-center gap-1"
                title="Copy to clipboard"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
