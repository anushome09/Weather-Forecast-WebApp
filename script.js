const apiKey = "0145e3a7e674d92b7c6b384c172b9395"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const locationUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric"

const searchResult = document.querySelector("#search-space input");
const searchButton = document.querySelector("#search-space button");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404) {
        document.querySelector("#error").style.display = "block"
        document.querySelector("#search-space input").style.border = "3px solid rgba(250, 125, 125)"
    } else {
        document.querySelector("#error").style.display = "none"
        document.querySelector("#search-space input").style.border = "none"
        
        var data = await response.json();

        document.querySelector("#card-container").style.display = "flex";

    // Day of the week
    var dayname = new Date(data.dt * 1000).toLocaleDateString("en", {
        weekday: "long",
    });
    // Date of the year
    var date = new Date(data.dt * 1000).toLocaleDateString("en", {
       day: "numeric",
       month: "short",
       year: "numeric", 
    });
    // City Name
    var cityName = data.name + ", " + data.sys.country
    // Degree
    var degree = Math.round(data.main.temp) + "°C";
    // Weather
    var weather = data.weather[0].main;
    // weather background
    const weatherBackground = document.querySelector("#weather-background");
    if(weather == "Haze"){
        weatherBackground.src = "haze-back.jpg"
    } else if(weather == "Clouds") {
        weatherBackground.src = "cloud-back.jpg"
    } else if(weather == "Clear") {
        weatherBackground.src = "clear-back.jpg"
    } else if(weather == "Rain") {
        weatherBackground.src = "rain-back.jpg"
    } else if(weather == "Drizzle") {
        weatherBackground.src = "drizzle-back.jpg"
    } else if(weather == "Mist") {
        weatherBackground.src = "haze-back.jpg"
    } else if(weather == "Snow") {
        weatherBackground.src = "snow-back.jpg"
    }
    

    document.querySelector("#day").innerHTML = dayname;
    document.querySelector("#date").innerHTML = date;
    document.querySelector("#city").innerHTML = cityName;
    document.querySelector("#degree").innerHTML = degree;
    document.querySelector("#weathers").innerHTML = weather;


    //Humidity
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%"
    // wind
    document.querySelector("#wind").innerHTML = Math.round(data.wind.speed) + " km/h"
    // temp
    document.querySelector("#temp").innerHTML = degree
    // feel
    document.querySelector("#feel").innerHTML = Math.round(data.main.feels_like) + "°C"
    
    
    //sunrise and sunset
    var sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
        hour: "2-digit",
        minute: "2-digit"
    });
    var sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
        hour: "2-digit",
        minute: "2-digit"
    });

    document.querySelector("#sunrise").innerHTML = sunrise
    document.querySelector("#sunset").innerHTML = sunset
    }
}

searchButton.addEventListener("click", () => {
    checkWeather(searchResult.value)
})


navigator.geolocation.getCurrentPosition(getLocation);
// Getting the current city name
function getLocation(position) {
    var lati = position.coords.latitude; 
    var longi = position.coords.longitude;

    async function locationName() {
        const locationResponse = await fetch(locationUrl + `&lat=${lati}&lon=${longi}` + `&appid=${apiKey}`)
        var locationDetail = await locationResponse.json();
        checkWeather(locationDetail.name)
    }
    locationName();
}

    


