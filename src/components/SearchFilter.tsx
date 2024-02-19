// src/components/SearchFilter.tsx
import React, { useState } from 'react';

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

  return (
    <div>
      <input
        type="text"
        placeholder="Search countries..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchFilter;
