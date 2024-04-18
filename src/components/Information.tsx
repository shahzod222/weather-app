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
                  <td>{information.name}</td>
                </tr>
                <tr>
                  <td>Weather</td>
                  <td>{information.weather[0].main}</td>
                </tr>
                <tr>
                  <td>Temperature</td>
                  <td>{information.main.temp}°</td>
                </tr>
                <tr>
                  <td>Humidity</td>
                  <td>{information.main.humidity}%</td>
                </tr>
                <tr>
                  <td>Pressure</td>
                  <td>{information.main.pressure}in</td>
                </tr>
                <tr>
                  <td>Wind</td>
                  <td>{information.wind.speed}m/s</td>
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
