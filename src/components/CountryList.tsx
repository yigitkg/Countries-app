import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../graphql/queries';

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

  useEffect(() => {
    if (data?.countries?.length) {
      const autoSelectIndex = Math.min(10, data.countries.length) - 1;
      setSelectedCountryCode(data.countries[autoSelectIndex].code);
      setSelectedColorIndex(autoSelectIndex % selectionColors.length);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let displayedCountries = data.countries;
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
      const groupLower = group.toLowerCase();
      isContinentGroup = continents.includes(groupLower);
      // If group is a string, assume it's a continent name and filter by it
      displayedCountries = displayedCountries.filter(
        (country: Country) =>
          (isContinentGroup
            ? country.continent.name
            : country.languages[0].name
          ).toLowerCase() === group.toLowerCase()
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
        <ul>
          {displayedCountries.map((country: Country, index: number) => (
            <li
              key={country.code}
              onClick={() => handleCountryClick(country.code)}
              style={{
                backgroundColor:
                  selectedCountryCode === country.code
                    ? selectionColors[selectedColorIndex]
                    : 'transparent',
                cursor: 'pointer',
                padding: '5px',
                margin: '2px 0',
              }}
            >
              {country.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No countries found matching your search criteria.</p> // This line provides feedback when no countries match the search.
      )}
    </div>
  );
};

export default CountryList;
