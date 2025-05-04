
import React, { useState } from 'react';
import { generateUUID } from '../utils/uuidGenerator';

export const UUIDGenerator = () => {
  const [uuid, setUuid] = useState<string>(generateUUID());

  const generateNewUuid = () => {
    setUuid(generateUUID());
  };

  return (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">UUID Generator</p>
      <div className="pl-2 border-l-2 border-terminal-darkgray">
        <p className="text-terminal-gray break-all">{uuid}</p>
        <button
          onClick={generateNewUuid}
          className="mt-2 px-3 py-1 bg-terminal-darkgray text-terminal-green rounded hover:bg-opacity-70 transition"
        >
          Generate new UUID
        </button>
      </div>
    </div>
  );
};

export const DateTimeInfo = () => {
  const now = new Date();
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };

  return (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">Date & Time Information</p>
      <div className="pl-2 border-l-2 border-terminal-darkgray">
        <p className="text-terminal-gray">Current Date & Time: <span className="text-terminal-green">{now.toLocaleString(undefined, dateFormatOptions)}</span></p>
        <p className="text-terminal-gray">Unix Timestamp: <span className="text-terminal-green">{Math.floor(now.getTime() / 1000)}</span></p>
        <p className="text-terminal-gray">UTC String: <span className="text-terminal-green">{now.toUTCString()}</span></p>
      </div>
    </div>
  );
};

export const IPInfo = () => {
  const [ipInfo, setIpInfo] = useState<{ ip?: string, loading: boolean }>({
    loading: true
  });

  React.useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpInfo({ ip: data.ip, loading: false });
      } catch (error) {
        setIpInfo({ ip: 'Error fetching IP', loading: false });
      }
    };

    fetchIpInfo();
  }, []);

  return (
    <div className="mb-4">
      <p className="mb-2 text-terminal-blue font-bold">IP Information</p>
      <div className="pl-2 border-l-2 border-terminal-darkgray">
        {ipInfo.loading ? (
          <p className="text-terminal-gray">Loading IP information...</p>
        ) : (
          <p className="text-terminal-gray">Your IP Address: <span className="text-terminal-green">{ipInfo.ip}</span></p>
        )}
      </div>
    </div>
  );
};

export const utilsHelp = (
  <div className="mb-4">
    <p className="mb-2 text-terminal-blue font-bold">Available Utilities:</p>
    <div className="pl-2 border-l-2 border-terminal-darkgray">
      <table className="table-auto border-collapse">
        <tbody>
          <tr>
            <td className="pr-4 text-terminal-blue">uuid</td>
            <td className="text-terminal-gray">Generate a UUID</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue">datetime</td>
            <td className="text-terminal-gray">Show date and time information</td>
          </tr>
          <tr>
            <td className="pr-4 text-terminal-blue">ip</td>
            <td className="text-terminal-gray">Show your IP address</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
