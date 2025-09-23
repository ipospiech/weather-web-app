import { useState } from "react";
import useCoordinates from "../hooks/useCoordinates";
import { useDebounce } from "../hooks/useDebounce";

const SearchBar = ({ onSelectCity }) => {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  const debouncedQuery = useDebounce(query, 1000);
  const { cities, loading, error } = useCoordinates(debouncedQuery);

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

      {/* {loading && <p className="search-status">Searching cities...</p>} */}
      {error && <p className="search-status text-error">{error.message}</p>}

      {cities.length > 0 && !selectedCity && (
        <ul className="search-results">
          {cities.map((city, idx) => (
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
