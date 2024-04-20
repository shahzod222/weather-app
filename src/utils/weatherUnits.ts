import { Unit } from "../types";

const usUnit: Unit = {
  temp: "°F",
  wind: "ml/h",
};

const metricUnit: Unit = {
  temp: "°C",
  wind: "km/h",
};

const ukUnit: Unit = {
  temp: "°C",
  wind: "ml/h",
};

const baseUnit: Unit = {
  temp: "°K",
  wind: "mt/s",
};

export const selectUnits = (weatherUnit: string) => {
  switch (weatherUnit) {
    case "us":
      return usUnit;
    case "metric":
      return metricUnit;
    case "uk":
      return ukUnit;
    case "base":
      return baseUnit;
    default:
      return metricUnit;
  }
};
