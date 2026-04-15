export const parseWeatherData = (apiData) => {
    if (!apiData || !apiData.main) return null;
    
    return {
      city: apiData.name,
      country: apiData.sys.country,
      temperature: Math.round(apiData.main.temp),
      description: apiData.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`
    };
  };