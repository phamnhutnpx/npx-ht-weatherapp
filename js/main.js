import config from "./config.js";

const APIkey = config.API_KEY;
const searchInput = document.querySelector('#search-input');
// console.log(searchInput);
// if (searchInput.value === "") {
//     searchInput.value = 'Bình Định';
// }
const DEFAULT_DATA = '--';
const cityName = document.querySelector('.city-name');
const idCountry = document.querySelector('.id-country');
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');

const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const speed = document.querySelector('.speed');

searchInput.addEventListener('change', (e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APIkey}&units=metric&lang=vi`)
        .then(async res => {
            const data = await res.json()
            // console.log(data);

            cityName.innerHTML = data.name || DEFAULT_DATA;
            idCountry.innerHTML = data.sys.country || DEFAULT_DATA;
            weatherState.innerHTML = data.weather[0].description || DEFAULT_DATA;
            weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` || DEFAULT_DATA;
            temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_DATA;

            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('LT') || DEFAULT_DATA;
            sunset.innerHTML = moment.unix(data.sys.sunset).format('LT') || DEFAULT_DATA;
            humidity.innerHTML = data.main.humidity || DEFAULT_DATA;
            speed.innerHTML = (data.wind.speed * 3.6).toFixed(1) || DEFAULT_DATA;
        })
        .catch((err) => console.log(err.message))
})