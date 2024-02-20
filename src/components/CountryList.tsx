// src/components/CountryList.tsx
import React, { useState, useEffect, useMemo } from 'react';
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

  const selectionColors = [
    'lightblue',
    'lightgreen',
    'lightcoral',
    'lightgoldenrodyellow',
    'lightpink',
  ];

  const displayedCountries = useMemo(() => {
    let countries = data?.countries || [];

    if (filter) {
      countries = countries.filter((country: Country) =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      );
    }

    if (group) {
      if (!isNaN(Number(group))) {
        countries = countries.slice(0, parseInt(group, 10));
      } else {
        const groupLower = group.toLowerCase();
        countries = countries.filter(
          (country: Country) =>
            country.continent.name.toLowerCase() === groupLower
        );
      }
    }

    return countries;
  }, [data?.countries, filter, group]);

  const autoSelectedCountryCode = useMemo(() => {
    let autoSelectIndex = Math.min(10, displayedCountries.length) - 1;
    if (autoSelectIndex < 0) autoSelectIndex = 0;
    if (displayedCountries.length < 10) {
      autoSelectIndex = displayedCountries.length - 1;
    }
    return displayedCountries[autoSelectIndex]?.code;
  }, [displayedCountries]);

  useEffect(() => {
    setSelectedCountryCode(autoSelectedCountryCode);
  }, [autoSelectedCountryCode]);

  const handleCountryClick = (code: string) => {
    setSelectedCountryCode(code);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="country-list-main-component">
      {displayedCountries.length > 0 ? (
        <ul className="country-list">
          {displayedCountries.map((country: Country, index: number) => {
            const isSelected = selectedCountryCode === country.code;
            const style = isSelected
              ? {
                  backgroundColor:
                    selectionColors[index % selectionColors.length],
                }
              : undefined;
            return (
              <li
                key={country.code}
                onClick={() => handleCountryClick(country.code)}
                style={style}
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
