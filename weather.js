const apiKey = 'eec65b0805dd455abd6a84cbc85caf8d'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={apiKey}'

function convertKelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
}

function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weather-info');

    const cityName = data.name;
    const {temp_max, temp_min, humidity} = data.main;
    const weatherDescription = data.weather[0].description;

    const highTemp = convertKelvinToFahrenheit(temp_max).toFixed(2);
    const lowTemp = convertKelvinToFahrenheit(temp_min).toFixed(2);

    const weatherHtml = `
    <h2>${cityName}</h2>
    <p><strong>High:</strong> ${highTemp}°F</p>
    <p><strong>Low:</strong> ${lowTemp}°F</p>
    <p><strong>Forecast:</strong>${weatherDescription}</p>
    <p>strong>Humidity:</strong> ${humidity}</p>
    `;

    weatherInfo.innerHTML = weatherHtml;
}

function fetchWeatherData(cityName) {
    const url = api.Url.replace('{CITY_NAME}', cityName);

    fetch(url)
    .then(response => response.json())
    .then(data => displayWeatherData(data))
    .catch(error => {
        console.error('Error', error);
        weatherInfo.innerHTML = 'Failed to fetch weather data due to invalid information.';
    });
}

const city = 'New York';
fetchWeatherData(city);
