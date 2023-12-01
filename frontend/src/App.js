// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Recommendation from './components/Recommendation';
import Search from './components/Search';
import History from './components/History';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Recommendation />} />
            <Route path="/search" element={<Search />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
