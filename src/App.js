import React, { useState } from "react";
import "./App.css";

function WeatherApp() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  // Fetch weather data
  const getWeather = async () => {
    try {
      setError(null);
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=6558ec05502844d7990130658251908&q=${query}&days=5&aqi=no&alerts=no`
      );

      const data = await res.json();
      if (data.error) {
        setError(data.error.message);
        setWeather(null);
        setForecast([]);
      } else {
        setWeather(data.current);
        setCity(query);
        setForecast(data.forecast.forecastday || []);
      }
    } catch (err) {
      setError("⚠ Something went wrong!");
      setWeather(null);
      setForecast([]);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">🌤 Weather App</h1>

      {/* Search Box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={getWeather} className="search-btn">
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Current Weather */}
      {weather && (
        <div className="weather-card">
          <h2>{city.charAt(0).toUpperCase()+city.slice(1).toLowerCase()}</h2>
          <p className="temp">{weather.temp_c}°C</p>
          <p>{weather.condition.text}</p>
          <img
            src={weather.condition.icon}
            alt="Weather icon"
            className="weather-icon"
          />
          <p>💨 {weather.wind_kph} kph | 💧 {weather.humidity}%</p>
        </div>
      )}

      {/* Forecast */}
      {forecast.length > 0 && (
        <div className="forecast-container">
          <h3>Next {forecast.length} Days</h3>
          <div className="forecast-grid">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-card">
                <h4>{day.date}</h4>
                <img
                  src={day.day.condition.icon}
                  alt="Forecast icon"
                  className="forecast-icon"
                />
                <p>{day.day.avgtemp_c}°C</p>
                <p>{day.day.condition.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;