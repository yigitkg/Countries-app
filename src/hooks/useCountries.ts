// src/hooks/useCountries.ts
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../graphql/queries';

interface Country {
  code: string;
  name: string;
  continent: { name: string };
  languages: { name: string }[];
}

interface UseCountriesProps {
  filter: string;
  group: string;
}

const selectionColors = [
  'lightblue',
  'lightgreen',
  'lightcoral',
  'lightgoldenrodyellow',
  'lightpink',
];

export const useCountries = ({ filter, group }: UseCountriesProps) => {
  const { data, loading, error } = useQuery(GET_COUNTRIES);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );

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

  const handleCountrySelect = (code: string) => {
    setSelectedCountryCode(code);
  };

  const getCountryStyle = (code: string, index: number) => {
    return selectedCountryCode === code
      ? { backgroundColor: selectionColors[index % selectionColors.length] }
      : undefined;
  };

  return {
    displayedCountries,
    loading,
    error,
    handleCountrySelect,
    getCountryStyle,
    selectedCountryCode,
  };
};
