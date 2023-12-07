const cityInput = document.querySelector('.cityInput');
const searchButton = document.querySelector('.searchBtn');
const currentWeatherDiv = document.querySelector('.currentWeather');
const weatherCardsDiv = document.querySelector('.weatherCards');

const API_KEY = '2db7964af8d16ea2b73914d559f118f3';

const createWeatherCard = (cityName, weatherItem, index) => {
  if (index === 0) { //HTML per la scheda centrale
    return `<div class="details">
    <h2>${cityName} (${weatherItem.dt_txt.split(' ')[0]})</h2>
    <h4>Temperatura: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
        <h4>Vento: ${weatherItem.wind.speed} m/s</h4>
        <h4>Umidità: ${weatherItem.main.humidity}%</h4>
  </div>
  <div class="icon">
    <img
      src="https://openweathermap.org/img/wn/${
        weatherItem.weather[0].icon
      }@4x.png"
      alt="icona del meteo"
    />
    <h4>${weatherItem.weather[0].description}</h4>
  </div>`;
  } else { //HTML per le schede più piccole
    return `<li class="card">
        <h3>(${weatherItem.dt_txt.split(' ')[0]})</h3>
        <img
        src="https://openweathermap.org/img/wn/${
          weatherItem.weather[0].icon
        }@2x.png"
        alt="icona del meteo"
      />
        <h4>Temperatura: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
        <h4>Vento: ${weatherItem.wind.speed} m/s</h4>
        <h4>Umidità: ${weatherItem.main.humidity}%</h4>
      </li>`;
  }
};

getWeatherDetails = (cityName, lat, lon) => {
  const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      const uniqueForecastDays = [];
      const fiveDaysForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });

      cityInput.value = '';
      currentWeatherDiv.innerHTML = '';
      weatherCardsDiv.innerHTML = '';

      console.log(fiveDaysForecast);
      fiveDaysForecast.forEach((weatherItem, index) => {
        if (index === 0) {
          currentWeatherDiv.insertAdjacentHTML(
            'beforeend',
            createWeatherCard(cityName, weatherItem, index)
          );
        } else {
          weatherCardsDiv.insertAdjacentHTML(
            'beforeend',
            createWeatherCard(cityName, weatherItem, index)
          );
        }
      });
    })
    .catch(() => {
      alert('Si è verificato un errore nel recuperare i dati sul meteo');
    });
};

const fetchCityCoordinates = () => {
  const cityName = cityInput.value.trim(); //per acquisire il valore inserito dall'utente sottoforma di stringa, eliminando gli spazi
  if (!cityName) return; //return se cityName è vuoto
  const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  // Trova le coordinate della città inserita (nome, latitudine, longitudine) dalla risposta API
  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      if (!data.length)
        return alert(`Nessun risultato trovato per ${cityName}`);
      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
      console.log(data);
    })
    .catch(() => {
      alert('Si è verificato un errore nel recuperare le coordinate');
    });

  // console.log(cityName)
};
searchButton.addEventListener('click', fetchCityCoordinates);
