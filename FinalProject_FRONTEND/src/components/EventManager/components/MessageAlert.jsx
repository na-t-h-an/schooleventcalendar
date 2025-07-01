const MessageAlert = ({ message }) => {
  if (!message) return null;
  const isError = message.includes('First and Last names are required.') ||
  message.includes('Error: Passwords do not match');
  return <div className={isError ? 'errorMessage' : 'successMessage'}>{message}</div>;
};

export default MessageAlert;
