const router = require("express").Router();
const axios = require("axios");

const send_options = (inp) => {
  var options = {
    method: "GET",
    url: `https://api.ambeedata.com/weather/${inp}/by-lat-lng`,
    params: { lat: "12.9889055", lng: "77.574044" },
    headers: {
      "x-api-key":
        "544a9cb2560bab6235869111c8428da29a56b7299dd879fe4987b07bc80ae4aa",
      "Content-type": "application/json",
    },
  };
  return options;
};

router.get("/latest", (req, res) => {
  const received = send_options("latest");
  axios
    .request(received)
    .then(function (response) {
      res.json({
        weather: response.data,
        icon: `https://assetambee.s3-us-west-2.amazonaws.com/weatherIcons/PNG/${response.data.data.icon}.png`,
      });
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    });
});

router.get("/forecast", (req, res) => {
  const received = send_options("forecast");
  received.params.filter = "{minutely}";
  axios
    .request(received)
    .then(function (response) {
      // console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

module.exports = router;
