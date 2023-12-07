const cityInput = document.querySelector(".cityInput")
const searchButton = document.querySelector(".searchBtn")

const API_KEY = "2db7964af8d16ea2b73914d559f118f3";

getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`

    fetch(WEATHER_API_URL).then(res => res.json()).then(data =>{
        console.log(data)
    }).catch(() => {
        alert("Si è verificato un errore nel recuperare i dati sul meteo")
    })
}

const fetchCityCoordinates = () => {
    const cityName = cityInput.value.trim() //per acquisire il valore inserito dall'utente sottoforma di stringa, eliminando gli spazi
    if(!cityName) return //return se cityName è vuoto
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`

    // Trova le coordinate della città inserita (nome, latitudine, longitudine) dalla risposta API
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if(!data.length) return alert(`Nessun risultato trovato per ${cityName}`)
        const { name, lat, lon } = data[0]
    getWeatherDetails(name, lat, lon)
        console.log(data)
    }).catch(() => {
        alert("Si è verificato un errore nel recuperare le coordinate")
    })

    // console.log(cityName)
}
searchButton.addEventListener("click", fetchCityCoordinates)