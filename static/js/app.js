// Global variables
let currentCity = '';
let isLoading = false;

// DOM elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const weatherSection = document.getElementById('weatherSection');
const forecastSection = document.getElementById('forecastSection');
const errorMessage = document.getElementById('errorMessage');
const loadHistoryBtn = document.getElementById('loadHistoryBtn');
const loadPopularBtn = document.getElementById('loadPopularBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Event listeners
    searchBtn.addEventListener('click', handleSearch);
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    loadHistoryBtn.addEventListener('click', loadSearchHistory);
    loadPopularBtn.addEventListener('click', loadPopularCities);
    
    // Load initial data
    loadSearchHistory();
    loadPopularCities();
    
    // Focus on input
    cityInput.focus();
}

async function handleSearch() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    if (isLoading) {
        return;
    }
    
    await searchWeather(city);
}

async function searchWeather(city) {
    try {
        isLoading = true;
        showLoading();
        hideError();
        hideWeatherSections();
        
        // Fetch weather data
        const weatherResponse = await fetch(`/api/weather/${encodeURIComponent(city)}`);
        const weatherData = await weatherResponse.json();
        
        if (!weatherData.success) {
            throw new Error(weatherData.error || 'Failed to fetch weather data');
        }
        
        // Fetch forecast data
        const forecastResponse = await fetch(`/api/forecast/${encodeURIComponent(city)}`);
        const forecastData = await forecastResponse.json();
        
        // Update UI
        displayWeatherData(weatherData);
        
        if (forecastData.success) {
            displayForecastData(forecastData);
        }
        
        // Update current city
        currentCity = city;
        
        // Add success animation
        weatherSection.classList.add('success-animation');
        setTimeout(() => {
            weatherSection.classList.remove('success-animation');
        }, 600);
        
        // Refresh history
        loadSearchHistory();
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError(error.message || 'Failed to fetch weather data. Please try again.');
    } finally {
        isLoading = false;
        hideLoading();
    }
}

function displayWeatherData(data) {
    // Update location
    document.getElementById('cityName').textContent = data.city;
    document.getElementById('countryName').textContent = data.country;
    
    // Update weather icon
    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`;
    weatherIcon.alt = data.weather.description;
    
    // Update temperature
    document.getElementById('currentTemp').textContent = data.temperature.current;
    document.getElementById('feelsLike').textContent = data.temperature.feels_like;
    document.getElementById('minTemp').textContent = data.temperature.min;
    document.getElementById('maxTemp').textContent = data.temperature.max;
    
    // Update weather description
    document.getElementById('weatherDesc').textContent = data.weather.description;
    
    // Update details
    document.getElementById('humidity').textContent = data.humidity;
    document.getElementById('pressure').textContent = data.pressure;
    document.getElementById('windSpeed').textContent = data.wind.speed;
    document.getElementById('visibility').textContent = data.visibility;
    
    // Update timestamp
    const timestamp = new Date(data.timestamp);
    document.getElementById('timestamp').textContent = formatTimestamp(timestamp);
    
    // Show weather section
    weatherSection.style.display = 'block';
}

function displayForecastData(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    
    data.forecasts.forEach(forecast => {
        const forecastItem = createForecastItem(forecast);
        forecastContainer.appendChild(forecastItem);
    });
    
    // Show forecast section
    forecastSection.style.display = 'block';
}

function createForecastItem(forecast) {
    const item = document.createElement('div');
    item.className = 'forecast-item';
    
    const date = new Date(forecast.datetime);
    const formattedDate = formatForecastDate(date);
    
    item.innerHTML = `
        <div class="forecast-date">${formattedDate}</div>
        <div class="forecast-icon">
            <img src="https://openweathermap.org/img/wn/${forecast.weather.icon}@2x.png" 
                 alt="${forecast.weather.description}">
        </div>
        <div class="forecast-temp">${forecast.temperature.temp}°C</div>
        <div class="forecast-desc">${forecast.weather.description}</div>
        <div class="forecast-details">
            <small>💧 ${forecast.humidity}% | 💨 ${forecast.wind_speed} m/s</small>
        </div>
    `;
    
    return item;
}

async function loadSearchHistory() {
    try {
        const response = await fetch('/api/history');
        const data = await response.json();
        
        if (data.success) {
            displaySearchHistory(data.history);
        }
    } catch (error) {
        console.error('Error loading search history:', error);
    }
}

async function loadPopularCities() {
    try {
        const response = await fetch('/api/popular');
        const data = await response.json();
        
        if (data.success) {
            displayPopularCities(data.popular_cities);
        }
    } catch (error) {
        console.error('Error loading popular cities:', error);
    }
}

function displaySearchHistory(history) {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No search history yet</p>';
        return;
    }
    
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="city-info">${item.city}, ${item.country}</div>
            <div class="search-count">${item.search_count}</div>
        `;
        
        historyItem.addEventListener('click', () => {
            cityInput.value = item.city;
            searchWeather(item.city);
        });
        
        historyList.appendChild(historyItem);
    });
}

function displayPopularCities(cities) {
    const popularList = document.getElementById('popularList');
    popularList.innerHTML = '';
    
    if (cities.length === 0) {
        popularList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No popular cities yet</p>';
        return;
    }
    
    cities.forEach(city => {
        const cityItem = document.createElement('div');
        cityItem.className = 'popular-item';
        cityItem.innerHTML = `
            <div class="city-info">${city.city}, ${city.country}</div>
            <div class="search-count">${city.search_count}</div>
        `;
        
        cityItem.addEventListener('click', () => {
            cityInput.value = city.city;
            searchWeather(city.city);
        });
        
        popularList.appendChild(cityItem);
    });
}

function showLoading() {
    loadingSpinner.style.display = 'block';
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
}

function showError(message) {
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    errorMessage.style.display = 'block';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

function hideError() {
    errorMessage.style.display = 'none';
}

function hideWeatherSections() {
    weatherSection.style.display = 'none';
    forecastSection.style.display = 'none';
}

function formatTimestamp(date) {
    return date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'short'
    });
}

function formatForecastDate(date) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
    } else {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to clear search
    if (e.key === 'Escape') {
        cityInput.value = '';
        cityInput.focus();
        hideWeatherSections();
        hideError();
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        cityInput.focus();
        cityInput.select();
    }
});

// Handle online/offline status
window.addEventListener('online', function() {
    hideError();
    console.log('Back online');
});

window.addEventListener('offline', function() {
    showError('You are offline. Please check your internet connection.');
});

// Performance monitoring
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
        }
    }
});

if ('PerformanceObserver' in window) {
    observer.observe({ entryTypes: ['navigation'] });
}

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(registrationError) {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}