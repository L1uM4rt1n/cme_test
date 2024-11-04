// src/components/Header.js
import React from 'react';

const Header = ({ username, onSignOut }) => (
  <div className="header">
    <h1>Welcome to Your Digital Bank, {username}</h1>
    <button onClick={onSignOut}>Sign Out</button>
  </div>
);

export default Header;
