# Thinkific Take-Home Assignment

## Task

- [x] Use the [OpenWeatherMap](http://openweathermap.org/forecast5) 5 day weather forecast API to retrieve and display the current 5-day weather forecast for a city (ex. Vancouver)

## Stretch Goals

- [ ] Create a responsive version
- [ ] Add a feature to explore the weather information in other cities
- [x] Deploy your assignment somewhere and include the link in your README so we can try it out

Visit [jeffkamo.github.io/weather-assignment/](https://jeffkamo.github.io/weather-assignment/) for the deployed version.

## Assumptions

_Regarding today's temperature:_

I am assuming that the Noon time period is reasonably representative of today's temperature. I also currently hardcode which item from the data list is the noon time data point, but I'm not actually sure if that's true. Someting to improve later.

_Regarding which data to use for any given day:_

When you fetch the 5-day forecast data, it returns ~40 data points across those days, but I only want five. For an initial implementation, trim the list down to 5. The logic that picks the five does not include any thought around which part of the day the forecast should be taken from. That would be an improvement on the logic.
