// src/components/Search.js
import React, { useState } from 'react';
import '../styles/Search.css';

const Search = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Call the API with the current query
    // Replace this with actual API call
    console.log('Searching for:', query);
  };

  return (
    <div className="search">
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
