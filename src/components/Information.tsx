import { useWeather } from "../context/WeatherContext";

const Information = () => {
  const { information, loading, errorMessage } = useWeather();

  return (
    <div className="info">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {errorMessage && <h1>{errorMessage}</h1>}
          {information !== null && (
            <table className="info-table">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{information.resolvedAddress}</td>
                </tr>
                <tr>
                  <td>Weather</td>
                  <td>{information.description}</td>
                </tr>
                <tr>
                  <td>Temperature</td>
                  <td>{information.currentConditions.temp}°</td>
                </tr>
                <tr>
                  <td>Humidity</td>
                  <td>{information.currentConditions.humidity}%</td>
                </tr>
                <tr>
                  <td>Cloud Cover</td>
                  <td>{information.currentConditions.cloudcover}%</td>
                </tr>
                <tr>
                  <td>Wind</td>
                  <td>{information.currentConditions.windspeed}m/s</td>
                </tr>
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default Information;
