import { createContext, useContext, useState, PropsWithChildren } from "react";

type ContextType = {
  location: string;
  setLocation: (location: string) => void;
};

const WeatherContext = createContext<ContextType | null>(null);

export const WeatherProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [location, setLocation] = useState("");

  return (
    <WeatherContext.Provider value={{ location, setLocation }}>
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
