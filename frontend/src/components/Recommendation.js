// src/components/Recommendation.js
import React, { useState, useEffect } from 'react';
import '../styles/Recommendation.css';

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch recommendations from the API and set them in state
    // Replace this with actual API call
    const mockData = [
      { id: 1, title: 'Song 1', artist: 'Artist 1' },
      { id: 2, title: 'Song 2', artist: 'Artist 2' },
      // Add more recommendations
    ];
    setRecommendations(mockData);
  }, []);

  return (
    <div className="recommendation">
      <h2>Recommended Songs</h2>
      <ul>
        {recommendations.map((song) => (
          <li key={song.id}>{song.title} - {song.artist}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendation;
