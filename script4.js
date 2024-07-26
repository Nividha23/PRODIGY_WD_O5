const apiKey = 'YOUR_API_KEY';

async function fetchWeatherData(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayWeatherData(data);
}

function displayWeatherData(data) {
    document.getElementById('city').innerText = data.name;
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
}

function getWeatherByLocation() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
        fetchWeatherData(url);
    } else {
        alert('Please enter a location');
    }
}

function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
            fetchWeatherData(url);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

window.onload = getWeatherByGeolocation;
