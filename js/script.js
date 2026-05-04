import { initFilters } from './components/filters.js';
import { initCalculator } from './components/calculator.js';

import { fetchWeather } from './api/apiService.js';
import { storageHelper } from './storage/localStorage.js';
import { parseWeatherData } from './utils/dataParser.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded. Initializing JS components...');
  initFilters();
  initCalculator();

  const searchForm = document.querySelector('.search-form');
  const weatherWidget = document.getElementById('weather-widget'); 
  const destinationInput = document.getElementById('destination');

  const lastSearch = storageHelper.load('lastDestination');
  if (lastSearch && destinationInput) {
    destinationInput.value = lastSearch;
  }

  if (searchForm) {
    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const destination = destinationInput.value.trim();

      if (!destination) {
        alert('Please enter a destination.');
        return;
      }

      // Сохраняем в LocalStorage
      storageHelper.save('lastDestination', destination);
      weatherWidget.innerHTML = `<p style="color: white; margin-top: 15px;">Loading weather for ${destination}...</p>`;

      try {
        const rawData = await fetchWeather(destination);
        const weather = parseWeatherData(rawData);

        // Отрисовка
        weatherWidget.innerHTML = `
          <div class="weather-card">
            <img src="${weather.icon}" alt="${weather.description}">
            <div>
              <h3>${weather.city}, ${weather.country}</h3>
              <p>${weather.temperature}°C, ${weather.description}</p>
            </div>
          </div>
        `;
      } catch (error) {
        weatherWidget.innerHTML = `<p style="color: #ef4444; margin-top: 15px;">Error: ${error.message}. Try another city.</p>`;
      }
    });
  }
});