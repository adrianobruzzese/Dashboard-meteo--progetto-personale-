const cityInput = document.querySelector(".cityInput")
const searchButton = document.querySelector(".searchBtn")


const fetchCityCoordinates = () => {
    const cityName = cityInput.value.trim() //per acquisire il valore inserito dall'utente sottoforma di stringa, eliminando gli spazi
    if(!cityName) return
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`

    // console.log(cityName)
}
searchButton.addEventListener("click", fetchCityCoordinates)