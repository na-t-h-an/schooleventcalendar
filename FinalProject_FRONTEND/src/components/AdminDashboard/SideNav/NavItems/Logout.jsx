import React from 'react';

export default function Logout({ onClick }) {
  return (
    <li>
      <button className="nav-button" onClick={onClick}>
        Logout
      </button>
    </li>
  );
}
