
import React, { useState } from 'react';
import { base64Encode, base64Decode } from '../../utils/textUtils';
import { Copy, ArrowRightLeft, Check } from 'lucide-react';

export const Base64Tool = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState<boolean>(false);

  const handleProcess = () => {
    if (mode === 'encode') {
      setOutput(base64Encode(input));
    } else {
      setOutput(base64Decode(input));
    }
  };

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    // Clear the output when switching modes
    setOutput('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">Base64 {mode === 'encode' ? 'Encoder' : 'Decoder'}</p>
      <div className="pl-2 border-l-2 border-terminal-darkgray">
        <div className="mb-2">
          <label className="text-terminal-gray block mb-1">Input:</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-terminal-black bg-opacity-50 border border-terminal-darkgray rounded-md p-2 text-terminal-green font-mono w-full h-40 resize-none"
              placeholder={`Enter text to ${mode}...`}
            />
            <button
              onClick={toggleMode}
              className="px-2 py-1 bg-terminal-darkgray text-terminal-green rounded-md hover:bg-opacity-70 transition flex items-center gap-1 self-start sm:self-stretch"
              title="Switch mode"
            >
              <ArrowRightLeft size={14} />
              <span className="hidden sm:inline">{mode === 'encode' ? 'Decode' : 'Encode'}</span>
            </button>
          </div>
        </div>

        <button
          onClick={handleProcess}
          className="terminal-button mb-2"
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>

        {output && (
          <div className="mb-2">
            <label className="text-terminal-gray block mb-1">Output:</label>
            <div className="relative">
              <textarea
                readOnly
                value={output}
                className="bg-terminal-black bg-opacity-50 border border-terminal-darkgray rounded-md p-2 text-terminal-green font-mono w-full h-40 resize-none"
              />
              <button
                onClick={copyToClipboard}
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
