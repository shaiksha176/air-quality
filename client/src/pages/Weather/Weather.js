import React, { useState, useEffect } from "react";
import "./Weather.css";
import axios from "axios";
const Weather = () => {
  const [icon, setIcon] = useState(
    "https://assetambee.s3-us-west-2.amazonaws.com/weatherIcons/PNG/cloudy.png"
  );
  const [weather, setWeather] = useState({
    time: 2754846,
    summary: "Cloudy",
    latitude: 21.458,
    longitude: 25.54795,
    temperature: 72.2,
    apparentTemperature: 72.256,
    dewPoint: 10,
    humidity: 50,
    pressure: 2.0,
    windSpeed: 0.54,
    windGust: 0.5,
    windBearing: 10,
    cloudCover: 10,
    uvIndex: 50,
    visibility: 80,
    ozone: 250,
  });

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/weather/latest`);
      console.log(data.icon);
      setIcon(data.icon);
      setWeather({
        time: data.weather.data.time,
        summary: data.weather.data.summary,
        latitude: data.weather.data.lat,
        longitude: data.weather.data.lng,
        temperature: data.weather.data.temperature,
        dewPoint: data.weather.data.dewPoint,
        humidity: data.weather.data.humidity,
        pressure: data.weather.data.pressure,
        windSpeed: data.weather.data.windSpeed,
        windGust: data.weather.data.windGust,
        windBearing: data.weather.data.windBearing,
        cloudCover: data.weather.data.cloudCover,
        uvIndex: data.weather.data.uvIndex,
        visibility: data.weather.data.visibility,
        ozone: data.weather.data.ozone,
        apparentTemperature: data.weather.data.apparentTemperature,
      });

      console.log(weather);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1000 * 60 * 5);
    return () => clearInterval(interval);
  });

  function convertTimestamptoTime(uni) {
    const unixTimestamp = uni;

    const milliseconds = unixTimestamp * 1000; // 1575909015000

    const dateObject = new Date(milliseconds);

    const humanDateFormat = dateObject.toLocaleString();
    console.log(humanDateFormat);
    return humanDateFormat;
  }
  // convertTimestamptoTime();

  //Humidity, ozone,uvindex,visibility
  const houv = [
    {
      title: "Latitude",
      value: weather.latitude.toFixed(2),
    },
    {
      title: "Longitude",
      value: weather.longitude.toFixed(2),
    },
    {
      title: "Humidity",
      value: weather.humidity,
    },
    {
      title: "Ozone",
      value: weather.ozone,
    },
    {
      title: "UV Index",
      value: weather.uvIndex,
    },
    {
      title: "Visibility",
      value: weather.visibility,
    },
  ];

  //temperature, apparent temperature, dew point
  const tad = [
    {
      title: "Temperature",
      value: weather.temperature.toFixed(1),
    },
    {
      title: "Apparent Temperature",
      value: weather.apparentTemperature.toFixed(1),
    },
    {
      title: "Dew Point",
      value: weather.dewPoint,
    },
  ];

  //wind gust, wind speed

  const wind = [
    {
      title: "Wind Gust",
      value: weather.windGust,
    },
    {
      title: "Wind Speed",
      value: weather.windSpeed,
    },
  ];

  return (
    <>
      <div className="weather-container">
        <p className="title">Current Weather</p>
        <div className="time">
          <p className="summary">
            Fetched at : {convertTimestamptoTime(weather.time)}
          </p>
        </div>
        <div className="weather-summary">
          <div className="icon">
            <img src={icon} alt="" />
          </div>
          <div className="summary">{weather.summary}</div>
        </div>
      </div>
      <div className="card-container">
        {houv.map((ho, index) => (
          <div className="card" key={index}>
            <div className="card-head">{ho.title}</div>
            <div className="card-body">{ho.value}</div>
          </div>
        ))}
        <div className="card">
          <div className="card-head">Wind Bearing</div>
          <div className="card-body">
            {weather.windBearing} <sup>0</sup>North
          </div>
        </div>
        {wind.map((w, index) => (
          <div className="card" key={index}>
            <div className="card-head">{w.title}</div>
            <div className="card-body">{w.value} miles/hour</div>
          </div>
        ))}

        {tad.map((t, index) => (
          <div className="card" key={index}>
            <div className="card-head">{t.title}</div>
            <div className="card-body">
              {t.value} <sup>0</sup>F
            </div>
          </div>
        ))}
      </div>{" "}
    </>
  );
};

export default Weather;
