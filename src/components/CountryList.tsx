// src/components/CountryList.tsx
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../graphql/queries';

interface Props {
  filter: string;
}

const CountryList: React.FC<Props> = ({ filter }) => {
  const { data, loading, error } = useQuery(GET_COUNTRIES);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );

  useEffect(() => {
    // This effect will run every time `filteredCountries` changes,
    // which includes the initial data loading as well as any subsequent filter updates.
    const autoSelectIndex = Math.min(10, data?.countries?.length || 0) - 1;
    if (data?.countries?.length) {
      setSelectedCountryCode(data.countries[autoSelectIndex].code);
    }
  }, [data]); // Dependency on `data` because it's what we're checking to update the selected country

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const filteredCountries = data.countries.filter((country: { name: string }) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCountryClick = (code: string) => {
    setSelectedCountryCode(selectedCountryCode === code ? null : code);
  };

  return (
    <ul>
      {filteredCountries.map((country: { code: string; name: string }) => (
        <li
          key={country.code}
          onClick={() => handleCountryClick(country.code)}
          style={{
            backgroundColor:
              selectedCountryCode === country.code
                ? 'lightgray'
                : 'transparent',
          }}
        >
          {country.name}
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
