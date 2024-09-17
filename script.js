const apikey = "da3c5cae30bfe1f448b7cbee82360dcb";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchcity = document.querySelector("#searchinput");
const searchbtn = document.querySelector(".btn");
const weatherIcon = document.querySelector("#weather_icon");


async function fetchWeather(city) {
  try {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    if (!response.ok) {
      throw new Error("City not found or network error occurred");
    }

    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    alert("Please enter a valid city");
    console.error("Error fetching weather data:", error);
    clearWeatherData();
  }
}


async function fetchWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apikey}`);
    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }

    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    alert("Error fetching weather data for your location.");
    console.error("Error fetching weather data:", error);
    clearWeatherData();
  }
}


function displayWeatherData(data) {
  const locationName = document.querySelector("#location_name");
  const currentDatetime = document.querySelector("#current_datetime");
  const temp = document.querySelector("#temp");
  const mintemp = document.querySelector("#mintemp");
  const maxtemp = document.querySelector("#maxtemp");
  const humidity = document.querySelector("#humidity");
  const dewpoint = document.querySelector("#dewpoint");
  const pressure = document.querySelector("#pressure");
  const windspeed = document.querySelector("#windspeed");
  const winddirection = document.querySelector("#winddirection");
  const sunriseTime = document.querySelector("#sunrise_time");
  const sunsetTime = document.querySelector("#sunset_time");


  locationName.innerHTML = data.name;


  const now = new Date();
  currentDatetime.innerHTML = now.toLocaleString();


  temp.innerHTML = data.main.temp;
  mintemp.innerHTML = data.main.temp_min;
  maxtemp.innerHTML = data.main.temp_max;
  humidity.innerHTML = data.main.humidity;
  dewpoint.innerHTML = (data.main.temp - (100 - data.main.humidity) / 5).toFixed(1);
  pressure.innerHTML = data.main.pressure;
  windspeed.innerHTML = data.wind.speed;
  winddirection.innerHTML = data.wind.deg;


  const sunriseDate = new Date(data.sys.sunrise * 1000);
  const sunsetDate = new Date(data.sys.sunset * 1000);

  sunriseTime.innerHTML = sunriseDate.toLocaleTimeString();
  sunsetTime.innerHTML = sunsetDate.toLocaleTimeString();



  const layers = document.querySelectorAll('.layer');
  layers.forEach(layer => {
    layer.classList.add('expanded');
    setTimeout(() => {
      layer.classList.remove('expanded');
    }, 5000);
  });
}


function clearWeatherData() {
  const locationName = document.querySelector("#location_name");
  const currentDatetime = document.querySelector("#current_datetime");
  const temp = document.querySelector("#temp");
  const mintemp = document.querySelector("#mintemp");
  const maxtemp = document.querySelector("#maxtemp");
  const humidity = document.querySelector("#humidity");
  const dewpoint = document.querySelector("#dewpoint");
  const pressure = document.querySelector("#pressure");
  const windspeed = document.querySelector("#windspeed");
  const winddirection = document.querySelector("#winddirection");
  const sunriseTime = document.querySelector("#sunrise-time");
  const sunsetTime = document.querySelector("#sunset-time");
  const weatherIcon = document.querySelector("#weather_icon");

  locationName.innerHTML = "N/A";
  currentDatetime.innerHTML = "N/A";
  temp.innerHTML = "N/A";
  mintemp.innerHTML = "N/A";
  maxtemp.innerHTML = "N/A";
  humidity.innerHTML = "N/A";
  dewpoint.innerHTML = "N/A";
  pressure.innerHTML = "N/A";
  windspeed.innerHTML = "N/A";
  winddirection.innerHTML = "N/A";
  sunriseTime.innerHTML = "N/A";
  sunsetTime.innerHTML = "N/A";
  weatherIcon.src = "";
}


window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByCoords(lat, lon);
      },
      (error) => {
        alert("Could not get your location. Please allow location access or enter a city manually.");
        console.error("Error getting location:", error);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});


searchbtn.addEventListener("click", () => {
  const city = searchcity.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name");
  }
});