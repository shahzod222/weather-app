import { ChangeEvent, FormEvent, useEffect } from "react";
import { useWeather } from "../context/WeatherContext";

const Search = () => {
  const { location, setLocation, getData, weatherUnit, setWeatherUnit } =
    useWeather();

  useEffect(() => {
    if (location) {
      getData();
    }
  }, [weatherUnit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getData();
  };

  const handleUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setWeatherUnit(e.target.value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={location}
        onChange={handleChange}
        placeholder="Enter location..."
        required
      />
      <select
        id="selectOption"
        value={weatherUnit}
        onChange={handleUnitChange}
        required
      >
        <option value="us">US</option>
        <option value="metric">Metric</option>
        <option value="uk">UK</option>
        <option value="base">Base</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
