import axios from "axios";
import { useEffect, useState } from "react";
const Weather = ({ capital }) => {
  const key = import.meta.env.REACT_APP_API_KEY;
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric&q=${capital}`;

  const [weather, setWeather] = useState({
    temperature: "",
    icon: "",
    windSpeed: "",
  });

  useEffect(() => {
    axios.get(`${baseUrl}`).then((response) => {
      const weatherObject = {
        temperature: `${response.data.main.temp}`,
        icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        windSpeed: `${response.data.wind.speed}`,
      };
      setWeather(weatherObject);
    });
  }, [baseUrl]);

  return (
    <>
      <h2>Weather in {capital}</h2>
      <p>temperature {weather.temperature} Celcius</p>
      <img src={weather.icon} alt="weather icon" />
      <p>wind {weather.windSpeed} m/s</p>
    </>
  );
};

export default Weather;
