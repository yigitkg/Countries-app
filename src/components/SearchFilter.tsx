// src/components/SearchFilter.tsx
import React, { useState } from 'react';
import './SearchFilter.css';

interface Props {
  onFilterChange: (filter: string, group: string) => void;
}

const SearchFilter: React.FC<Props> = ({ onFilterChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    let filter = '';
    let group = '';

    // Split the input value by 'group:' if present
    const parts = inputValue.split(' group:');
    if (parts.length === 2) {
      filter = parts[0].trim();
      group = parts[1].trim();
    } else {
      filter = inputValue.trim(); // Trim the input to avoid white space issues
    }

    onFilterChange(filter, group);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search countries..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchFilter;
