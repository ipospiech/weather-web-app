import { useState } from "react";
import useCoordinates from "../hooks/useCoordinates";
import { useDebounce } from "../hooks/useDebounce";

const SearchBar = ({ onSelectCity }) => {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  const debouncedQuery = useDebounce(query, 600);

  const { cities, loading, error } = useCoordinates(debouncedQuery);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedCity(null);
        }}
        placeholder="Enter city"
      />

      {loading && <p> Searching cities...</p>}
      {error && <p>{error.message}</p>}

      {cities.length > 0 && !selectedCity && (
        <ul>
          {cities.map((city, idx) => (
            <li
              key={idx}
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
