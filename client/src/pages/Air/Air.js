import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Air.css";
import { useHistory } from "react-router-dom";
const Air = () => {
  const history = useHistory();
  const [aqiInfo, setAqiInfo] = useState({
    category: "Moderate",
    pollutant: "PM10",
    concentration: 59.913,
    placeName: "Race Course",
    city: "Bangalore",
    updatedAt: "2021-9-9",
    aqi: 52,
  });

  const [gases, setGases] = useState({
    CO: 0.593,
    NO: 25,
    ozone: 21,
    pm10: 59.913,
    pm25: 11.466,
    so: 2.21,
  });
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/aqi/latest");
      console.log(data.stations[0]);
      setAqiInfo({
        category: data.stations[0].aqiInfo.category,
        pollutant: data.stations[0].aqiInfo.pollutant,
        concentration: data.stations[0].aqiInfo.concentration,
        placeName: data.stations[0].placeName,
        city: data.stations[0].city,
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

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1000 * 60 * 5);
    return () => clearInterval(interval);
  });
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
      <p className="title">Air Quality </p>
      <div id="btn-container">
        <button onClick={() => history.push("/aqi-by-city")}>
          search aqi by city
        </button>
        <button onClick={fetchData}>Fetch DATA</button>
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
          {gaseous.map((gas, i) => (
            <p key={i}>
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
