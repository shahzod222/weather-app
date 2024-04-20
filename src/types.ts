export type ContextType = {
  location: string;
  setLocation: (location: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  information: WeatherInformation | null;
  setInformation: (information: WeatherInformation) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  weatherUnit: string;
  setWeatherUnit: (weatherUnit: string) => void;
  getData: () => void;
};

export type WeatherInformation = {
  resolvedAddress: string;
  currentConditions: {
    icon: string;
    windspeed: number;
    temp: number;
    sunrise: string;
    sunset: string;
    humidity: number;
    conditions: string;
  };
  days: {
    datetime: string;
    tempmax: number;
    tempmin: number;
    windspeed: string;
    icon: string;
    humidity: number;
    hours: {
      datetime: string;
      icon: string;
      temp: number;
    }[];
  }[];
};

export type Unit = {
  temp: string;
  wind: string;
};
