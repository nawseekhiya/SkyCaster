const apiKey = "ca650dc8bfaa45bd2db04b79b763033d"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const weatherIcon = document.querySelector("#weather-icon");
const searchBox = document.querySelector("#search-box");
const searchButton = document.querySelector("#search-button");
const searchErase = document.querySelector("#search-erase");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    if (response.status == 404) {
        document.querySelector(".error").style.display = "flex";
        document.querySelector(".temp-section").style.display = "none";
        document.querySelector(".humidity-wind-section").style.display = "none";
        document.querySelector(".app-title").style.display = "flex";
        
    }
    
    else {
        document.querySelector(".error").style.display = "none";
        document.querySelector(".temp-section").style.display = "flex";
        document.querySelector(".humidity-wind-section").style.display = "flex";
        document.querySelector(".app-title").style.display = "none";

    
        document.querySelector(".city-name").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity-percent").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind-speed").innerHTML = data.wind.speed + " Km/H";
    
        if (data.weather[0].main == 'Mist'){
            weatherIcon.src = "images/mist.png";
        }
        if (data.weather[0].main == 'Clouds'){
            weatherIcon.src = "images/clouds.png";
        }
        if (data.weather[0].main == 'Drizzle'){
            weatherIcon.src = "images/drizzle.png";
        }
        if (data.weather[0].main == 'Rain'){
            weatherIcon.src = "images/rain.png";
        }
        if (data.weather[0].main == 'Snow'){
            weatherIcon.src = "images/snow.png";
        }
        if (data.weather[0].main == 'Clear'){
            weatherIcon.src = "images/clear.png";
        }
    }

}

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

searchBox.addEventListener("input", () => {
    if (searchBox.value.length > 0) {
        searchErase.style.display = "block";
        searchButton.style.display = "none";
    } else {
        searchErase.style.display = "none";
        searchButton.style.display = "block";
    }
});

searchErase.addEventListener("click", ()=>{
    searchBox.value = "";
    searchErase.style.display = "none";
    searchButton.style.display = "block";
    document.querySelector(".error").style.display = "none";
});

