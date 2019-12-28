const FEATURE = "forecast";
const CITY_ID = "6173331";
const API_KEY = "209216b63928f0f2398d2bfb876964b1";
const UNIT = "metric";
const WEATHER_API = `https://api.openweathermap.org/data/2.5/${FEATURE}?id=${CITY_ID}&appid=${API_KEY}&units=${UNIT}`;

let data;

const init = async () => {
  const response = await fetch(WEATHER_API);
  data = await response.json();
  console.log(data);
};

init();
