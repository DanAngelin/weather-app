// I use API from openweathermap.org

const keyApi = "e3e59ccb8a47bc1f943eaf0baa3ce684";

const getWeatherApp = async (weathercity) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${weathercity}&units=metric&appid=${keyApi}`
  );
  if (response.status == 404) {
    document.querySelector(".not-found").textContent = "No results found 😞!";
  } else {
    document.querySelector(".not-found").textContent = "";
  }

  const wheaterApp = await response.json();

  try {
    // Data Destructuring

    let {
      name: city,
      sys: { country, sunrise, sunset },
      main: { temp, temp_min, temp_max, feels_like, humidity, pressure },
      weather: [{ main: description, icon }],
      wind: { speed },
      dt,
      timezone,
    } = wheaterApp;

    // City

    document.querySelector(".city-name").textContent = `Weather in ${city}, ${country}`;

    // Temp

    document.querySelector(".temp").textContent = `${temp.toFixed(1)} °C`;

    // Temp Min - Max

    document.querySelector(".temp-min").textContent = `Min:${temp_min.toFixed(
      1
    )} °C`;
    document.querySelector(".temp-max").textContent = `Max:${temp_max.toFixed(
      1
    )} °C`;

    // Feels Like

    document.querySelector(
      ".feels-like"
    ).innerText = `Feels like ${feels_like.toFixed(1)} °C`;

    // Weather Description - Humidity - Pressure - Wind Speed
    document.querySelector(".description-weather").textContent = `${description}`;
    document.querySelector(".humidity-p").textContent = `${humidity}%`;
    document.querySelector(".pressure-p").textContent = `${pressure} hPa`;
    document.querySelector(".wind-p").textContent = `${speed} m/s`;
    document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${icon}.png`;

    // Timezone
    // I use this method from
    //https://stackoverflow.com/questions/62690963/how-can-i-get-the-current-time-using-timezone-offset-using-moment-js;
    const timezoneInMinutes = timezone / 60;
    const currentTime = moment().utcOffset(timezoneInMinutes).format("LLL");
    document.querySelector(".time").textContent = `${currentTime}`;

    // Sunrise - Sunset
    const sunriseTime = moment
      .unix(sunrise)
      .utcOffset(timezoneInMinutes)
      .format("LT");
    const sunsetTime = moment
      .unix(sunset)
      .utcOffset(timezoneInMinutes)
      .format("LT");
    document.querySelector(".sunrise p").textContent = `${sunriseTime}`;
    document.querySelector(".sunset p").textContent = `${sunsetTime}`;

    // Background Change by City or Country

    document.querySelector("body").style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${weathercity} ')`;
  } catch (error) {
    console.log(error);
  }
};
// Default city
getWeatherApp("Bucharest");

// BTN SEARCH

const btnSearch = document.querySelector(".btn-src");
const getValueSrc = () => {
  let inputValueSrc = document.querySelector(".input-src").value;
  return inputValueSrc;
};

btnSearch.addEventListener("click", () => getWeatherApp(getValueSrc()));

// Enter key event input

let inputEnter = document.querySelector(".input-src");
inputEnter.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    btnSearch.click();
  }
});

let date = new Date();
document.querySelector('.year').textContent = date.getFullYear()
