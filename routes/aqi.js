const router = require("express").Router();
const axios = require("axios");

const send_options = (inp) => {
  var options = {
    method: "GET",
    url: `https://api.ambeedata.com/latest/${inp}`,
    headers: {
      "x-api-key":
        " 544a9cb2560bab6235869111c8428da29a56b7299dd879fe4987b07bc80ae4aa",
      "Content-type": "application/json",
    },
  };
  return options;
};

router.get("/", (req, res) => {
  const received = send_options("by-lat-lng");
  received.params = { lat: "12.9889055", lng: "77.574044" };
  axios
    .request(received)
    .then(function (response) {
      //  console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.get("/:bycity", (req, res) => {
  const cityname = req.params.bycity.slice(1, req.params.bycity.length);
  const received = send_options("by-city");
  received.params = { city: cityname };
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
