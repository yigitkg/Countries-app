// src/components/CountryList.tsx
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../graphql/queries';
import './CountryList.css';

interface Country {
  code: string;
  name: string;
  continent: { name: string };
  languages: { name: string }[];
}

interface Props {
  filter: string;
  group: string;
}

const CountryList: React.FC<Props> = ({ filter, group }) => {
  const { data, loading, error } = useQuery(GET_COUNTRIES);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const selectionColors = [
    'lightblue',
    'lightgreen',
    'lightcoral',
    'lightgoldenrodyellow',
    'lightpink',
  ];
  const continents = [
    'africa',
    'antarctica',
    'asia',
    'europe',
    'north america',
    'australia',
    'south america',
  ];

  let displayedCountries = data?.countries;

  useEffect(() => {
    if (data?.countries?.length) {
      let autoSelectIndex = Math.min(10, displayedCountries.length) - 1;
      console.log('autoSelectIndex', autoSelectIndex);
      if (autoSelectIndex < 0) autoSelectIndex = 0;
      if (displayedCountries.size < 10)
        autoSelectIndex = displayedCountries.size - 1;
      setSelectedCountryCode(displayedCountries[autoSelectIndex].code);
      setSelectedColorIndex(autoSelectIndex % selectionColors.length);
    }
  }, [displayedCountries, group, filter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let isContinentGroup = false;

  // Apply filter if there is a search term
  if (filter) {
    displayedCountries = displayedCountries.filter((country: Country) =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  // Group by continent or limit the number of displayed countries
  if (group) {
    if (!isNaN(Number(group))) {
      // If group is numeric, limit the number of displayed countries
      displayedCountries = displayedCountries.slice(0, parseInt(group, 10));
    } else {
      const groupLower = group?.toLowerCase();
      isContinentGroup = continents.includes(groupLower);
      // If group is a string, assume it's a continent name and filter by it
      displayedCountries = displayedCountries.filter(
        (country: Country) =>
          (isContinentGroup
            ? country?.continent.name
            : country?.languages[0].name
          ).toLowerCase() === groupLower
      );
    }
  }

  const handleCountryClick = (code: string) => {
    // Check if the clicked country is already selected
    if (selectedCountryCode === code) {
      // If so, clear the selection
      setSelectedCountryCode(null);
      setSelectedColorIndex(0); // Reset the color index if needed, or handle this differently depending on your design
    } else {
      // If it's not already selected, select it
      setSelectedCountryCode(code);
      const index = displayedCountries.findIndex(
        (country: Country) => country.code === code
      );
      setSelectedColorIndex(index % selectionColors.length);
    }
  };

  return (
    <div>
      {displayedCountries.length > 0 ? (
        <ul className="country-list">
          {displayedCountries.map((country: Country) => {
            const isSelected = selectedCountryCode === country.code;
            const style = isSelected
              ? { '--selected-bg-color': selectionColors[selectedColorIndex] }
              : {};
            return (
              <li
                key={country.code}
                onClick={() => handleCountryClick(country.code)}
                style={style as React.CSSProperties} // Type casting for TypeScript
                className={isSelected ? 'selected' : ''}
              >
                {country.name}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No countries found matching your search criteria.</p>
      )}
    </div>
  );
};

export default CountryList;
