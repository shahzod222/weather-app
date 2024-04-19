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
  resolvedAddress: string;
  description: string;
  currentConditions: {
    cloudcover: number;
    windspeed: number;
    humidity: number;
    temp: number;
  };
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
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}&unitGroup=metric`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setInformation(data);
        setLoading(false);
      } else {
        setErrorMessage("Bad API Request: Invalid location parameter value.");
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
