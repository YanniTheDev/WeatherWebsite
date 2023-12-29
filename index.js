const searchButton = document.querySelector(".search-button");
const searchBox = document.querySelector(".search-box");

searchButton.addEventListener("click", () => {
    checkWeather();
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkWeather();
    }
});

function checkWeather() {
    let city = searchBox.value;
    requestWeatherData(city);
}

const apiKey = "86144f14aadb733dc5697687a9a0ec11";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const loadingScreen = document.querySelector(".loading-screen");

const displayStyles = {
    FLEX: "flex",
    NONE: "none"
}

async function requestWeatherData (city) {
    loadingScreen.style.display = displayStyles.FLEX;
    try {
        const response = await fetch(`${apiURL}${city}&appid=${apiKey}`);

        searchBox.value = ""; //Clears search box
        loadingScreen.style.display = displayStyles.NONE;
    
        let data = await response.json();
        
        console.log(data);
        setWeatherDetails(data);
    }
    catch (error) {
        displayError();
    }
}

const temperatureDisplay = document.querySelector(".temperature");
const cityNameDisplay = document.querySelector(".city");
const humidityDisplay = document.querySelector(".humidity-text");
const windSpeedDisplay = document.querySelector(".wind-text");

function setWeatherDetails(weatherData) {
    let temperature = Math.round(weatherData.main.temp);
    let cityName = weatherData.name;
    let humidity = weatherData.main.humidity;
    let windSpeed = Math.round(weatherData.wind.speed);

    temperatureDisplay.textContent = `${temperature}°C`;
    cityNameDisplay.textContent = cityName;
    humidityDisplay.textContent = `${humidity}%`;
    windSpeedDisplay.textContent = `${windSpeed} KM/H`;

    setWeatherIcon(weatherData);
}

// CSS styling as strings stored in objects
const weatherStatus = {
    CLEAR: "Clear",
    CLOUDS: "Clouds",
    RAIN: "Rain",
    DRIZZLE: "Drizzle",
    MIST: "Mist"
};
const weatherIconImagePaths = {
    CLEAR: "images/clear.png",
    CLOUDS: "images/clouds.png",
    RAIN: "images/rain.png",
    DRIZZLE: "images/drizzle.png",
    MIST: "images/mist.png",
    ERROR: "images/Error.png"
}
const cardColorGradients = {
    CLEAR: "linear-gradient(135deg, orange, red)",
    CLOUDS: "linear-gradient(135deg, rgb(204, 204, 204), rgb(68, 68, 68))",
    RAIN: "linear-gradient(135deg, #00feba, #5b548a)",
    MIST: "linear-gradient(135deg, #7de9ff, #0051ff)",
    ERROR: "linear-gradient(135deg, pink, red)"
}

const weatherIcon = document.querySelector(".weather-icon");
const weatherCard = document.querySelector(".card");

function setWeatherIcon(weatherData) {
   switch (weatherData.weather[0].main) {
        case weatherStatus.CLEAR:
            weatherIcon.src = weatherIconImagePaths.CLEAR;
            weatherCard.style.background = cardColorGradients.CLEAR;
            break;
        case weatherStatus.CLOUDS:
            weatherIcon.src = weatherIconImagePaths.CLOUDS;
            weatherCard.style.background = cardColorGradients.CLOUDS;
            break;
        case weatherStatus.RAIN:
            weatherIcon.src = weatherIconImagePaths.RAIN;
            weatherCard.style.background = cardColorGradients.RAIN;
            break;
        case weatherStatus.DRIZZLE:
            weatherIcon.src = weatherIconImagePaths.DRIZZLE;
            weatherCard.style.background = cardColorGradients.RAIN;
            break;
        case weatherStatus.MIST:
            weatherIcon.src = weatherIconImagePaths.MIST;
            weatherCard.style.background = cardColorGradients.MIST;
            break;
   }
   weatherCard.style.boxShadow = "0px 0px 20px rgb(94, 94, 94)";
}

function displayError() {
    temperatureDisplay.textContent = "?°C";
    cityNameDisplay.textContent = "Invalid City";
    humidityDisplay.textContent = "?%";
    windSpeedDisplay.textContent = "? KM/H";

    weatherIcon.src = weatherIconImagePaths.ERROR;
    weatherCard.style.background = cardColorGradients.ERROR;
}

requestWeatherData("new york")