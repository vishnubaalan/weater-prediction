const apiKey = 'c71e58afd9823f95ca69f966cc82e06c'; // Replace with your OpenWeatherMap API key

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('locationInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            getWeather();
        }
    });
});

async function getWeather() {
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');

    if (locationInput.value.trim() === '') {
        alert('Please enter a location.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            const temperature = data.main.temp;
            const description = data.weather[0].description;

            weatherInfo.innerHTML = `<p>Temperature: ${temperature} &#8451;</p><p>Description: ${description}</p>`;
        } else {
            weatherInfo.innerHTML = '<p>Error retrieving weather data. Please try again.</p>';
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
    }
}
