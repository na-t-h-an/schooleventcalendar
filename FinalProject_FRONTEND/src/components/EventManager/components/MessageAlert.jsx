import React from 'react';

const MessageAlert = ({ message }) => {
  if (!message) return null;
  const isError = message.toLowerCase().includes('error') || message.includes('❌');
  return <div className={isError ? 'errorMessage' : 'successMessage'}>{message}</div>;
};

export default MessageAlert;
