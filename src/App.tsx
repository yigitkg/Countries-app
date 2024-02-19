// src/App.tsx
import React, { useState } from 'react';
import './App.css';
import CountryList from './components/CountryList';
import SearchFilter from './components/SearchFilter';

const App: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [group, setGroup] = useState('');

  const handleFilterChange = (newFilter: string, newGroup: string) => {
    setFilter(newFilter);
    setGroup(newGroup);
  };

  return (
    <div className="App">
      <main className="App-header">
        <h1>Countries List</h1>
        <SearchFilter onFilterChange={handleFilterChange} />
        <CountryList filter={filter} group={group} />
      </main>
    </div>
  );
};

export default App;
