import React, { useState, useEffect } from "react";
import Forecast from "./Forecast.js";

const FEATURE = "forecast";
const CITY_ID = "6173331";
const API_KEY = "209216b63928f0f2398d2bfb876964b1";
const UNIT = "metric";
const WEATHER_API = `https://api.openweathermap.org/data/2.5/${FEATURE}?id=${CITY_ID}&appid=${API_KEY}&units=${UNIT}`;

function App() {
  const [city, setCity] = useState(null);
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    const init = async () => {
      const response = await fetch(WEATHER_API);
      const data = await response.json();

      if (!city) {
        setCity(data.city);
      }

      if (forecasts.length === 0) {
        const interval = data.list.length / 5;
        const reducer = (accu, curr, index) => {
          if (index % interval === 0) {
            accu.push(curr);
          }
          return accu;
        };
        const list = data.list.reduce(reducer, []);
        setForecasts(list);
      }
    };

    init();
  });

  return (
    <div className="App">
      <h1 className="visually-hidden">Forecast</h1>

      {city ? (
        <main>
          <h2 className="city">Vancouver</h2>

          <section className="today">
            <h3 className="visually-hidden">Today</h3>
            <p className="today__temp">40&deg;</p>
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
              {/*}
              <Forecast datetime="2020-12-27 00:00:00" temp="-12" pop="50" />
              <Forecast datetime="2020-12-28 00:00:00" temp="-15" pop="32" />
              <Forecast datetime="2020-12-29 00:00:00" temp="-10" pop="46" />
              <Forecast datetime="2020-12-30 00:00:00" temp="-18" pop="78" />
              <Forecast datetime="2020-12-31 00:00:00" temp="-20" pop="90" />\
              {*/}
            </div>
          </section>
        </main>
      ) : (
        <main>
          <h2>Loading...</h2>
        </main>
      )}
    </div>
  );
}

export default App;
