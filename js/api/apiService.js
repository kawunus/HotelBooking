import { API_CONFIG } from './config.js';

export const fetchWeather = async (city) => {
  try {
    // Делаем GET-запрос, просим метрическую систему (Цельсии)
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/weather?q=${city}&appid=${API_CONFIG.API_KEY}&units=metric&lang=en`
    );
    
    if (!response.ok) {
      if (response.status === 404) throw new Error('Destination not found');
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error; // Перебрасываем ошибку для обработки в UI
  }
};