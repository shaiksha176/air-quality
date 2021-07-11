import React from "react";
import "./Container.css";
import { useHistory } from "react-router";
const Container = () => {
  const history = useHistory();
  return (
    <div className="container">
      <div className="left">
        <p className="title">Weather & Air</p>
        <p className="sub-title">Forecast</p>
        <p>
          <button className="faq" onClick={() => history.push("aqi-by-city")}>
            FInd Air Quality of your fav city here
          </button>
        </p>
      </div>
      <div className="right">
        <img src="./jack-finnigan-H8HvioFXi60-unsplash.jpg" alt="weather" />
      </div>
    </div>
  );
};

export default Container;
