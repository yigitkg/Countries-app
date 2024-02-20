// src/components/CountryList.tsx
import React from 'react';
import './CountryList.css';
import { useCountries } from '../hooks/useCountries';

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
  const {
    displayedCountries,
    loading,
    error,
    handleCountrySelect,
    getCountryStyle,
    selectedCountryCode, // Get this from the custom hook now
  } = useCountries({ filter, group });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="country-list-main-component">
      {displayedCountries.length > 0 ? (
        <ul className="country-list">
          {displayedCountries.map(
            (
              country: Country,
              index: number // Explicitly type the parameters
            ) => (
              <li
                key={country.code}
                onClick={() => handleCountrySelect(country.code)}
                style={getCountryStyle(country.code, index)}
                className={
                  country.code === selectedCountryCode ? 'selected' : ''
                }
              >
                {country.name}
              </li>
            )
          )}
        </ul>
      ) : (
        <p>No countries found matching your search criteria.</p>
      )}
    </div>
  );
};

export default CountryList;
