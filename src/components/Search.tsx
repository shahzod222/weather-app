import { ChangeEvent } from "react";
import { useWeather } from "../context/WeatherContext";

const Search = () => {
  const { location, setLocation, getData } = useWeather();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleClick = () => {
    getData();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={location}
        onChange={handleChange}
        placeholder="Enter location..."
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default Search;
