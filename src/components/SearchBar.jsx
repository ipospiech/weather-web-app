import { useState } from "react";
import useCoordinates from "../hooks/useCoordinates";
import { useDebounce } from "../hooks/useDebounce";

const SearchBar = ({ onSelectCity }) => {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  const debouncedQuery = useDebounce(query, 1000);
  const { cities, loading, error } = useCoordinates(debouncedQuery);

  const showDropdown = loading || error || (cities.length > 0 && !selectedCity);

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
          {loading && <li className="search-status">Searching cities...</li>}
          {error && (
            <li className="search-status">
              Something went wrong, please try later
            </li>
          )}
          {!loading &&
            !error &&
            cities.map((city, idx) => (
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
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
