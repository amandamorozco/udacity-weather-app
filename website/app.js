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

async function addEntry(temperature, date, userResponse) {
  const response = await fetch("/project-data");
  try {
    const allData = await response.json();
    const dateElement = document.querySelector("#date");
    dateElement.innerHTML = "Date: " + allData.date;
    const temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML =
      "Temperature: " + allData.temperature + " Fahrenheit";
    const contentElement = document.querySelector("#content");
    contentElement.innerHTML = "Today I am Feeling: " + allData.userResponse;
  } catch (error) {}
}

document
  .querySelector("#generate")
  .addEventListener("click", async function (event) {
    console.log(document.querySelector("#zip").value);
    getWeather(document.querySelector("#zip").value)
      .then((response) => {
        let d = new Date();
        let newDate =
          d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
        const feelings = document.querySelector("#feelings").value;
        return postData("/project-data", {
          temperature: response.main.temp,
          date: newDate,
          userResponse: feelings
        });
      })
      .then((response) => {
        addEntry();
      });
  });
