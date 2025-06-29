import React from 'react';

export default function ErrorMessage({ message, className = "errorMessage" }) {
  if (!message) return null;
  
  return (
    <div className={className}>
      {message}
    </div>
  );
}