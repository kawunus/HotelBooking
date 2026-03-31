import { initFilters } from './components/filters.js';
import { initCalculator } from './components/calculator.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded. Initializing JS components...');

  initFilters();

  initCalculator();

  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const destination = document.getElementById('destination').value;
      console.log(`Searching for: ${destination}`);
      alert(`Ищем отели по направлению: ${destination || 'Везде'}`);
    });
  }
});
