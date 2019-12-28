import React, { useState, useEffect } from "react";
import Forecast from "./Forecast.js";

const FEATURE = "forecast";
const API_KEY = "209216b63928f0f2398d2bfb876964b1";
const UNIT = "metric";
const COUNTRY_CODE = "ca";

function App() {
  const [cityName, setCityName] = useState("Vancouver");
  const [today, setToday] = useState(null);
  const [forecasts, setForecasts] = useState([]);

  const WEATHER_API = `https://api.openweathermap.org/data/2.5/${FEATURE}?q=${cityName},${COUNTRY_CODE}&appid=${API_KEY}&units=${UNIT}`;
  let force = false;

  useEffect(() => {
    const init = async () => {
      const response = await fetch(WEATHER_API);
      const data = await response.json();
      const list = data.list || [null, null, { main: { temp: null } }];

      const temp = Math.floor(list[2].main.temp);

      if (temp !== today) {
        // I'm assuming that index 2 is the current day's Noon time...
        setToday(temp);
      }

      if (force || forecasts.length === 0) {
        const interval = list.length / 5;
        const reducer = (accu, curr, index) => {
          index++;
          if (index % interval === 0) {
            accu.push(curr);
          }
          return accu;
        };
        setForecasts(list.reduce(reducer, []));
      }
    };

    init();
  });

  const handleCity = event => {
    force = true;
    setCityName(event.target.value);
  };

  return (
    <div className="App">
      <h1 className="visually-hidden">Forecast</h1>

      <main>
        <h2 className="city">
          <input
            className="city__input"
            type="text"
            name="city"
            value={cityName}
            onChange={handleCity}
          />
        </h2>

        <section className="today">
          <h3 className="visually-hidden">Today</h3>
          <p className="today__temp">{today}&deg;</p>
        </section>

        <section>
          <h3 className="visually-hidden">5-Day Forecast</h3>

          <div className="forecasts">
            {forecasts.map(({ main, weather, dt_txt, dt }) => (
              <Forecast
                key={dt}
                datetime={dt_txt}
                temp={main.temp}
                icon={weather[0].icon}
                description={weather[0].description}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
