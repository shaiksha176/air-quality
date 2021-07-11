import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Air.css";
const Air = () => {
  const [aqiInfo, setAqiInfo] = useState({
    category: "Moderate",
    pollutant: "PM10",
    concentration: 59.913,
    placeName: "Race Course",
    city: "Bangalore",
    updatedAt: "2021-9-9",
    aqi: 52,
  });
  const [city, setCity] = useState("");
  const [gases, setGases] = useState({
    CO: 0.593,
    NO: 25,
    ozone: 21,
    pm10: 59.913,
    pm25: 11.466,
    so: 2.21,
  });

  const fetchDataByCity = async (city) => {
    try {
      const { data } = await axios.get(`/api/aqi/latest/:${city}`);
      console.log(data.stations[0]);
      setAqiInfo({
        category: data.stations[0].aqiInfo.category,
        pollutant: data.stations[0].aqiInfo.pollutant,
        concentration: data.stations[0].aqiInfo.concentration,
        placeName: data.stations[0].placeName,
        city:
          data.stations[0].city.length > 0
            ? data.stations[0].city
            : data.stations[0].division,
        updatedAt: data.stations[0].updatedAt,
        aqi: data.stations[0].AQI,
      });
      setGases({
        CO: data.stations[0].CO,
        NO: data.stations[0].NO2,
        ozone: data.stations[0].OZONE,
        pm10: data.stations[0].PM10,
        pm25: data.stations[0].PM25,
        so: data.stations[0].SO2,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlesearch = () => {
    //  console.log(city);
    fetchDataByCity(city);
    setCity("");
  };
  const gaseous = [
    {
      title: "CO",
      value: gases.CO + "ppm",
    },
    {
      title: "Ozone",
      value: gases.ozone + "ppb",
    },
    {
      title: "PM10",
      value: gases.pm10 + "ug/m3",
    },
    {
      title: "PM25",
      value: gases.pm25 + "ug/m3",
    },
  ];
  const aqi = [
    {
      title: "Pollutant",
      value: aqiInfo.pollutant,
    },
    {
      title: "Concentration",
      value: aqiInfo.concentration,
    },
    {
      title: "Category",
      value: aqiInfo.category,
    },
    {
      title: "Updated at",
      value: aqiInfo.updatedAt.slice(0, 10),
    },
  ];
  return (
    <div className="air-container">
      <p className="title">Search AQI by City </p>

      <Link to="/aqi">GO BACK</Link>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name e.g. Bangalore"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handlesearch}>search</button>
      </div>
      <div className="inner-container">
        <div className="aqiInfo">
          <p>{aqiInfo.aqi}</p>
          <p>
            {aqiInfo.placeName}, {aqiInfo.city}
          </p>
          {aqi.map((a, index) => (
            <p key={index}>
              {a.title} : {a.value}
            </p>
          ))}
        </div>
        <div className="stations">
          {gaseous.map((gas, index) => (
            <p key={index}>
              {gas.title} : {gas.value}
            </p>
          ))}
          <p>
            NO <sub>2</sub>: {gases.NO} ppb{" "}
          </p>
          <p>
            SO <sub>2</sub> : {gases.so} ppb
          </p>
        </div>
      </div>
    </div>
  );
};

export default Air;
