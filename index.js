const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 8000;
var axios = require("axios");
const weather_router = require("./routes/weather");
const aqi_router = require("./routes/aqi");

app.use("/api/weather", weather_router);
app.use("/api/aqi/latest", aqi_router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, () => console.log("server is running on port " + port));
