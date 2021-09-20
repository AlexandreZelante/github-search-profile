// import dependencies and initialize express
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const swaggerRoutes = require("./routes/swagger-route");
const devRoutes = require("./routes/dev");

const app = express();

app.use(express.static(path.join(__dirname, "..", "public", "build")));
app.use(cors());
// enable parsing of http request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes and api calls
app.use("/swagger", swaggerRoutes);
app.use("/dev", devRoutes);

// default path to serve up index.html (single page application)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "build", "index.html"));
});

// start node server
const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`App UI available http://localhost:${port}`);
  console.log(`Swagger UI available http://localhost:${port}/swagger/api-docs`);
});

module.exports = app;
