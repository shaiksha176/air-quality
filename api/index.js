const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 8000;
var axios = require("axios");
const weather_router = require("./routes/weather");
const aqi_router = require("./routes/aqi");

app.use("/api/weather", weather_router);
app.use("/api/aqi/latest", aqi_router);

app.listen(port, () => console.log("server is running on port " + port));
