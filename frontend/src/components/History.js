// src/components/History.js
import React, { useState, useEffect } from 'react';
import '../styles/History.css';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch user's recommendation history from the API and set it in state
    // Replace this with actual API call
    const mockData = [
      { id: 1, title: 'Song 1', artist: 'Artist 1' },
      { id: 2, title: 'Song 2', artist: 'Artist 2' },
      // Add more history entries
    ];
    setHistory(mockData);
  }, []);

  return (
    <div className="history">
      <h2>Recommendation History</h2>
      <ul>
        {history.map((song) => (
          <li key={song.id}>{song.title} - {song.artist}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;
