import React from "react";

function Forecast({ datetime, temp, icon, description }) {
  const date = new Date(datetime);
  const [day, month] = date.toString().split(" ");

  temp = Math.floor(temp);

  return (
    <article className="forecast">
      <h4 className="forecast__date">
        <span className="forecast__day">{day}</span>
        <span className="forecast__month-day">
          {month} {date.getDate()}
        </span>
      </h4>

      <img
        className="forecast__weather-icon"
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        height="100"
        width="100"
      />

      <p>
        <span className="visually-hidden">Temperature</span>
        <span className="forecast__temp">{temp}&deg;</span>
      </p>
    </article>
  );
}

export default Forecast;
