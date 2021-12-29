const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temp');
const temperatureMin = document.querySelector('.temp-min');
const temperatureMax = document.querySelector('.temp-max');
const feelsLike = document.querySelector('.feels-like');
const time = document.querySelector('.time');
const descriptionWeather = document.querySelector('.description-weather');
const humidityApp = document.querySelector('.humidity-p');
const pressureApp = document.querySelector('.pressure-p')



const keyApi = 'e3e59ccb8a47bc1f943eaf0baa3ce684';

const getWeatherApp = async querry => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=bucharest&appid=${keyApi}`);
    const wheaterApp = await response.json();
    console.log(wheaterApp);

    try {
        let {name: city, sys: {country}, main: {temp, temp_min, temp_max, feels_like, humidity, pressure},
            weather: [{description}]} = wheaterApp;
        console.log(city);

        cityName.innerText = `Weather in ${city}, ${country}`;
        temperature.innerHTML = `${(temp - 273.15).toFixed(1)}&deg;C`;
        temperatureMin.innerHTML = `Min:${(temp_min - 273.15).toFixed(1)}&deg;C`;
        temperatureMax.innerHTML = `Max:${(temp_max - 273.15).toFixed(1)}&deg;C`;
        feelsLike.innerHTML = `Feels like ${(feels_like - 273.15).toFixed(1)}&deg;C`;
        descriptionWeather.innerText = `${description.toUpperCase()}`;
        humidityApp.innerText = `Humidity: ${humidity}%`;
        pressureApp.innerText = `Pressure: ${pressure} hPa`;
    } catch (error) {
        console.log(error);
    }
}

getWeatherApp();

const getTime = new Date();
let month = getTime.getMonth();
let monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
month = monthsArray[month];
let hour = getTime.getHours();
let minute = getTime.getMinutes();
hour = (hour < 10 ? "0" : "") + hour;
minute = (minute < 10 ? "0" : "") + minute;
console.log(month)
// const year = getTime.getFullYear
time.innerText = `${getTime.getDate()} ${month} ${getTime.getFullYear()}, ${hour}:${minute}`;