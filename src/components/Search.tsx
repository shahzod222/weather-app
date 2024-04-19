import { ChangeEvent, FormEvent } from "react";
import { useWeather } from "../context/WeatherContext";

const Search = () => {
  const { location, setLocation, getData } = useWeather();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getData();
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
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
