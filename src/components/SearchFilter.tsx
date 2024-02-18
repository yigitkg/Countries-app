// src/components/SearchFilter.tsx
import React, { useState } from 'react';

interface Props {
  onFilterChange: (filter: string) => void;
}

const SearchFilter: React.FC<Props> = ({ onFilterChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    onFilterChange(inputValue); // Trigger the filtering with the current input value
  };
  console.log('inputValue', inputValue);

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
