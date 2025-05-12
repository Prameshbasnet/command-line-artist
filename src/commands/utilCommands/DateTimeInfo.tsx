
import React from 'react';

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
