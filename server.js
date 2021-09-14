// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes

const express = require("express");

const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website", { cacheControl: false }));

app.get("/project-data", function (req, res) {
  res.send(projectData);
});

app.post("/project-data", function (req, res) {
  projectData.temperature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.userResponse = req.body.userResponse;
  console.log(projectData);
  res.send(projectData);
});

// Setup Server

const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}
