// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header>
      <h1>HarmoniMix</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/history">History</Link>
      </nav>
    </header>
  );
};

export default Header;
