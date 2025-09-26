import React from 'react';
import { useState } from 'react';
import { useCoordinates } from '../hooks/useCoordinates.js';
import { useDebounce } from '../hooks/useDebounce.js';
import type { CityCoordinates } from '../types/index.js';

interface SearchBarProps {
  onSelectCity: (city: CityCoordinates) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectCity }) => {
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<CityCoordinates | null>(
    null
  );
  const debouncedQuery = useDebounce(query, 1000);
  const {
    data: cities = [],
    isLoading,
    error
  } = useCoordinates(debouncedQuery);

  // Show dropdown if loading, error, cities exist, or query typed
  const showDropdown =
    isLoading || error || (!selectedCity && (cities.length > 0 || query));

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedCity(null);
        }}
        placeholder="Enter city"
        className="search-input"
      />

      {showDropdown && (
        <ul className="search-results">
          {isLoading && <li className="search-status">Searching cities...</li>}
          {!!error && (
            <li className="search-status">
              Something went wrong, please try later
            </li>
          )}
          {!isLoading && !error && cities.length > 0
            ? cities.map((city, idx) => (
                <li
                  key={idx}
                  className="search-item"
                  onClick={() => {
                    setSelectedCity(city);
                    onSelectCity(city);
                  }}
                >
                  {city.name}
                </li>
              ))
            : !isLoading &&
              !error &&
              debouncedQuery && (
                <li className="search-status">City not found</li>
              )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
