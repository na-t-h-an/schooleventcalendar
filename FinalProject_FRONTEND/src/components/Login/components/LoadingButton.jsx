import React from 'react';

export default function LoadingButton({ 
  loading = false, 
  disabled = false, 
  onClick, 
  type = "button", 
  className = "loginButton", 
  children, 
  loadingText = "Loading..." 
}) {
  return (
    <button 
      type={type} 
      className={className} 
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading ? loadingText : children}
    </button>
  );
}