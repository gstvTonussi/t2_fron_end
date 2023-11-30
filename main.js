const axios = require("axios");
const apiKey = "046ddbc7c90ec04c5733d48ebcc7753d";
const city = "Mauá";
const count = "1";
const countryCode = 55;

const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=${count}&appid=${apiKey}`;

async function getCoordinates(url) {
  try {
    const { data } = await axios.get(url);
    const latitude = data[0].lat;
    const longitude = data[0].lon;

    console.log(`A atitude de ${city} é ${latitude} e longitude é ${longitude}.`);
    return { lat: latitude, lon: longitude };
  } catch (error) {
    throw new Error(error);
  }
}

async function getWeatherInfo(lat, lon) {
  try {
    const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const { data } = await axios.get(weatherApiUrl);

    const feelsLike = (data.main.feels_like - 273.15).toFixed(2);
    const description = data.weather[0].description;

    console.log(`A sensação térmica é de: ${feelsLike} graus Celsius, a descrição é: ${description}`);
  } catch (error) {
    throw new Error(error);
  }
}

async function main() {
  const { lat, lon } = await getCoordinates(geoApiUrl);
  await getWeatherInfo(lat, lon);
}

main();