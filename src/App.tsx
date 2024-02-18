// src/App.tsx
import React, { useState } from 'react';
import './App.css';
import CountryList from './components/CountryList';
import SearchFilter from './components/SearchFilter';

const App: React.FC = () => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className="App">
      <main className="App-header">
        <h1>Countries List</h1>
        <SearchFilter onFilterChange={handleFilterChange} />
        <div>
          <CountryList filter={filter} />
        </div>
      </main>
    </div>
  );
};

export default App;
