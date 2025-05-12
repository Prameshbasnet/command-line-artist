
import React, { useState } from 'react';
import { Copy, RefreshCcw } from 'lucide-react';

export const PasswordGenerator = () => {
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = () => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_-+=<>?';

    if (charset === '') {
      setPassword('Please select at least one character type');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (password && password.indexOf('Please select') === -1) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Generate a password on initial render
  React.useEffect(() => {
    generatePassword();
  }, []);

  return (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">Password Generator</p>
      <div className="pl-2 border-l-2 border-terminal-darkgray">
        <div className="bg-terminal-black bg-opacity-50 p-2 rounded-md mb-3">
          {password && (
            <div className="flex items-center mb-2">
              <p className="text-terminal-green font-mono break-all flex-1">{password}</p>
              <button
                onClick={copyToClipboard}
                disabled={password.indexOf('Please select') !== -1}
                className="ml-2 px-2 py-1 bg-terminal-darkgray text-terminal-green rounded-md hover:bg-opacity-70 transition flex items-center gap-1"
                title="Copy to clipboard"
              >
                <Copy size={14} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </div>
        
        <div className="space-y-3 mb-3">
          <div>
            <label className="text-terminal-gray block mb-1">Length: {length}</label>
            <input 
              type="range" 
              min="8" 
              max="32" 
              value={length} 
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-terminal-green"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="uppercase"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
                className="mr-2 accent-terminal-green"
              />
              <label htmlFor="uppercase" className="text-terminal-gray">Uppercase</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="lowercase"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
                className="mr-2 accent-terminal-green"
              />
              <label htmlFor="lowercase" className="text-terminal-gray">Lowercase</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="numbers"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
                className="mr-2 accent-terminal-green"
              />
              <label htmlFor="numbers" className="text-terminal-gray">Numbers</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="symbols"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
                className="mr-2 accent-terminal-green"
              />
              <label htmlFor="symbols" className="text-terminal-gray">Symbols</label>
            </div>
          </div>
        </div>
        
        <button
          onClick={generatePassword}
          className="terminal-button flex items-center gap-1"
        >
          <RefreshCcw size={14} />
          Generate new password
        </button>
      </div>
    </div>
  );
};
