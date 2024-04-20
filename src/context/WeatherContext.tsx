import { createContext, useContext, useState, PropsWithChildren } from "react";
import { ContextType, WeatherInformation } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;

const WeatherContext = createContext<ContextType | null>(null);

export const WeatherProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [location, setLocation] = useState("");
  const [weatherUnit, setWeatherUnit] = useState("us");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [information, setInformation] = useState<WeatherInformation | null>(
    null
  );

  const getData = async () => {
    try {
      setErrorMessage("");
      setInformation(null);
      setLoading(true);
      console.log(weatherUnit);
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}&unitGroup=${weatherUnit}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setInformation(data);
        setLoading(false);
      } else {
        setErrorMessage("Please enter valid location");
      }
    } catch (error) {
      setErrorMessage(`Error fetching weather data: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        location,
        setLocation,
        getData,
        information,
        setInformation,
        loading,
        setLoading,
        errorMessage,
        setErrorMessage,
        weatherUnit,
        setWeatherUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }

  return context;
};
