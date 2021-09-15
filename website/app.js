/* Global Variables */

const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&APPID=7d1deb7e68385fba8ab550bb9c3b2302";
const units = "&units=imperial";

async function getWeather(zip) {
  const response = await fetch(baseURL + zip + apiKey + units);
  return response.json();
}

async function postData(path, data) {
  var urlencoded = new URLSearchParams();
  urlencoded.append("temperature", data.temperature);
  urlencoded.append("date", data.date);
  urlencoded.append("userResponse", data.userResponse);

  return fetch(path, {
    method: "POST",
    body: urlencoded,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

function addEntry(temperature, date, userResponse) {
  const dateElement = document.querySelector("#date");
  dateElement.innerHTML = "Date: " + date;
  const temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = "Temperature: " + temperature + " Fahrenheit";
  const contentElement = document.querySelector("#content");
  contentElement.innerHTML = "Today I am Feeling: " + userResponse;
}

document
  .querySelector("#generate")
  .addEventListener("click", async function (event) {
    console.log(document.querySelector("#zip").value);
    const weatherResponse = await getWeather(
      document.querySelector("#zip").value
    );
    let d = new Date();
    let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
    const feelings = document.querySelector("#feelings").value;
    const postDataResponse = await postData("/project-data", {
      temperature: weatherResponse.main.temp,
      date: newDate,
      userResponse: feelings
    });
    const json = await postDataResponse.json();
    addEntry(json.temperature, json.date, json.userResponse);
  });
