import React from 'react';

export default function MessageDisplay({ message, className }) {
  if (!message) return null;

  // Determine the message type based on content or explicit className
  const messageClass = className || (message.includes('failed') ? 'errorMessage' : 'successMessage');
  
  return (
    <div className={messageClass}>
      {message}
    </div>
  );
}