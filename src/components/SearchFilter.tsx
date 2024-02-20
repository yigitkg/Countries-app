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
    const parts = inputValue.split(' group:');
    if (parts.length === 2) {
      filter = parts[0].trim();
      group = parts[1].trim();
    } else {
      filter = inputValue.trim();
    }
    onFilterChange(filter, group);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReset = () => {
    setInputValue('');
    onFilterChange('', '');
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
      <button onClick={handleReset} className="reset">
        Reset
      </button>
    </div>
  );
};

export default SearchFilter;
