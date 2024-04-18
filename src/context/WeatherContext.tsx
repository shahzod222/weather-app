import { createContext, useContext, useState, PropsWithChildren } from "react";

type ContextType = {
  location: string;
  setLocation: (location: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  information: WeatherInformation | null;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  setInformation: (information: WeatherInformation) => void;
  getData: () => void;
};

type WeatherInformation = {
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
  name: string;
};

const API_KEY = import.meta.env.VITE_API_KEY;

const WeatherContext = createContext<ContextType | null>(null);

export const WeatherProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [location, setLocation] = useState("");
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
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setInformation(data);
        setLoading(false);
      } else {
        setErrorMessage(`Error fetching weather data: ${response.statusText}`);
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
