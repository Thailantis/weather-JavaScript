const apiKey = 'eec65b0805dd455abd6a84cbc85caf8d';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={apiKey}';

function convertKelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
}

function displayWeatherData(data) {
    const cityNameElem = document.querySelector('.city-name');
    const temperature = document.querySelector('.temperature');
    const forecast = document.querySelector('.forecast');
    const humidityElem = document.querySelector('.humidity');

    const cityName = data.name;
    const {temp_max, temp_min, humidity} = data.main;
    const weatherDescription = data.weather[0].description;

    const highTemp = convertKelvinToFahrenheit(temp_max).toFixed(2);
    const lowTemp = convertKelvinToFahrenheit(temp_min).toFixed(2);

    cityNameElem.textContent = cityName;
    temperature.textContent = `Temperature: ${highTemp}°F/${lowTemp}°F`;
    forecast.textContent = `Forecast: ${weatherDescription}`;
    humidityElem.textContent = `Humidity: ${humidity}%`;

    const highTempBar = document.querySelector('.high-temp-bar');
    highTempBar.style.height = `${highTemp}px`;

    const lowTempBar = document.querySelector('.low-temp-bar');
    lowTempBar.style.height = `${lowTemp}px`;

    const forecastBar = document.querySelector('.forecast-bar');
    forecastBar.style.height = `${data.weather[0].id * 2}px`;

    const humidityBar = document.querySelector('.humidity-bar');
    humidityBar.style.height = `${humidity}%`
}

function fetchWeatherData(cityName) {
    const formattedCityName = cityName.trim().toLowerCase();
    const url = apiUrl.replace('{CITY_NAME}', formattedCityName);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeatherData(data);
            } else {
                const weatherInfo = document.getElementById('weather-info');
                weatherInfo.innerHTML = 'City not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = 'Failed to fetch weather data due to invalid info';
        });
}
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', () => {
        const cityInput = document.getElementById('city-input');
        const city = cityInput.value.trim();
        if (city !== '') {
            fetchWeatherData(city);
            cityInput.value = '';
        }
    });
