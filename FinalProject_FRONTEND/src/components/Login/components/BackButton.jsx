import React from 'react';

export default function BackButton({ onClick, className = "backLink" }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };

  return (
    <span 
      className={className}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Back
    </span>
  );
}