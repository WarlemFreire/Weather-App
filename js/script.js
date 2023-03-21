const apiKey = "d75548fe85e4950f25cb3d41825ef766";
const unsplashKey = "JQU2FUQWZr03meeQpKj6T5whptJKKnQ2jX5spjzJ1GY"
const apiCountryURL = "https://flagsapi.com/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")
const weatherContainer = document.querySelector("#weather-data")


//funções
const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

        const res = await fetch (apiWeatherURL)
        const data = await res.json()

        return data;

}
const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    countryElement.setAttribute("src", `${apiCountryURL}${data.sys.country}/flat/64.png` )
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
    getCityImage(city).then((imageUrl) => {
        document.body.style.backgroundImage = `url('${imageUrl}')`;
      });

}

const getCityImage = async (city) => {
    const query = `${city} landscape `;
    const url = `https://api.unsplash.com/photos/random?query=${query}
    &orientation=landscape&client_id=${unsplashKey}&auto=format&fit=crop&w=1920&q=10
    &order_by=popular&content_filter=high`;
    const response = await fetch(url);
    const data = await response.json();
    return data.urls.full;
}


//eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    showWeatherData(city);
    
    
})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value

        showWeatherData(city)
    }
})