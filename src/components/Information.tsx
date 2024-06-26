import { useWeather } from "../context/WeatherContext";
import {
  formatDateLong,
  formatTimeShort,
  formatDayAbbrev,
  formatDateNumeric,
} from "../utils/formatDate";
import { selectUnits } from "../utils/weatherUnits";

const Information = () => {
  const { information, loading, errorMessage, weatherUnit } = useWeather();
  const units = selectUnits(weatherUnit);

  return (
    <div className="weather-information">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="weather">
          {errorMessage && <h1 className="error-message">{errorMessage}</h1>}
          {information !== null && (
            <>
              <div className="current-weather">
                <div className="location">
                  <h2>{information.resolvedAddress}</h2>
                  <h3>{formatDateLong(information.days[0].datetime)}</h3>
                </div>
                <div className="weather-details">
                  <div className="weather-details-part1">
                    <img
                      src={`/assets/icons/${information.currentConditions.icon}.png`}
                      alt="Weather Icon"
                      className="weather-icon"
                    />
                    <h1>
                      {information.currentConditions.temp}
                      {units.temp}
                    </h1>
                    <p>{information.currentConditions.conditions}</p>
                  </div>
                  <div className="weather-details-part2">
                    <div>
                      <div>
                        <h2>
                          {information.days[0].tempmax}
                          {units.temp}
                        </h2>
                        <p>High</p>
                      </div>
                      <div>
                        <h2>
                          {information.days[0].tempmin}
                          {units.temp}
                        </h2>
                        <p>Low</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <h2>
                          {information.currentConditions.windspeed}
                          {units.wind}
                        </h2>
                        <p>Wind</p>
                      </div>
                      <div>
                        <h2>{information.currentConditions.humidity}%</h2>
                        <p>Humidity</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <h2>
                          {information.currentConditions.sunrise.slice(0, 5)}
                        </h2>
                        <p>Sunrise</p>
                      </div>
                      <div>
                        <h2>
                          {information.currentConditions.sunset.slice(0, 5)}
                        </h2>
                        <p>Sunset</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3>Todays weather</h3>
              <div className="todays-weather">
                {[3, 6, 9, 12, 15, 18, 21].map((el) => {
                  return (
                    <div className="todays-weather-element" key={el}>
                      <p>
                        {formatTimeShort(
                          information.days[0].hours[el].datetime
                        )}
                      </p>
                      <img
                        src={`/assets/icons/${information.days[0].hours[el].icon}.png`}
                      />
                      <p>
                        {information.days[0].hours[el].temp}
                        {units.temp}
                      </p>
                    </div>
                  );
                })}
              </div>
              <h3>Next 5 days</h3>
              <div className="next-days">
                {[1, 2, 3, 4, 5].map((el) => {
                  return (
                    <div className="next-days-element" key={el}>
                      <div>
                        <h4>
                          {formatDayAbbrev(information.days[el].datetime)}
                        </h4>
                        <p>
                          {formatDateNumeric(information.days[el].datetime)}
                        </p>
                      </div>
                      <img
                        src={`/assets/icons/${information.days[el].icon}.png`}
                      />
                      <div>
                        <h4>
                          {information.days[el].tempmin}
                          {units.temp}
                        </h4>
                        <p>Low</p>
                      </div>
                      <div>
                        <h4>
                          {information.days[el].tempmax}
                          {units.temp}
                        </h4>
                        <p>High</p>
                      </div>
                      <div>
                        <h4>
                          {information.days[el].windspeed}
                          {units.wind}
                        </h4>
                        <p>Wind</p>
                      </div>
                      <div>
                        <h4>{information.days[el].humidity}</h4>
                        <p>Humidity</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Information;
