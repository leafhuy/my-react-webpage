import { useState, useEffect } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import './WeatherWidget.css'

function WeatherWidget() {
    const [weather, setWeather] = useState(null)
    const [location, setLocation] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    function getWeatherIcon(code) {
        // WMO Weather interpretation codes
        if (code === 0) return '☀️'
        if (code === 1 || code === 2 || code === 3) return '⛅'
        if (code >= 45 && code <= 48) return '🌫️'
        if (code >= 51 && code <= 57) return '🌧️'
        if (code >= 61 && code <= 67) return '🌧️'
        if (code >= 71 && code <= 77) return '❄️'
        if (code >= 80 && code <= 82) return '🌦️'
        if (code >= 85 && code <= 86) return '🌨️'
        if (code >= 95 && code <= 99) return '⛈️'
        return '🌤️'
    }

    function getWeatherDescription(code) {
        if (code === 0) return 'Clear'
        if (code === 1) return 'Clear'
        if (code === 2) return 'Cloudy'
        if (code === 3) return 'Overcast'
        if (code >= 45 && code <= 48) return 'Foggy'
        if (code >= 51 && code <= 57) return 'Drizzle'
        if (code >= 61 && code <= 67) return 'Rain'
        if (code >= 71 && code <= 77) return 'Snow'
        if (code >= 80 && code <= 82) return 'Showers'
        if (code >= 85 && code <= 86) return 'Snow'
        if (code >= 95 && code <= 99) return 'Storm'
        return 'Unknown'
    }

    async function fetchLocationName(latitude, longitude) {
        try {
            // Using BigDataCloud Reverse Geocoding API (free, no API key required)
            const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            )

            if (response.ok) {
                const data = await response.json()
                // Try to get city name, fallback to locality or country
                const cityName = data.city || data.locality || data.principalSubdivision || data.countryName
                setLocation(cityName)
            }
        } catch (err) {
            // Silently fail - location name is optional
            console.log('Could not fetch location name')
        }
    }

    async function fetchWeather(latitude, longitude) {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            )

            if (!response.ok) {
                throw new Error('Weather data unavailable')
            }

            const data = await response.json()

            setWeather({
                temperature: Math.round(data.current_weather.temperature),
                weatherCode: data.current_weather.weathercode,
                windSpeed: data.current_weather.windspeed
            })

            // Fetch location name
            fetchLocationName(latitude, longitude)

            setLoading(false)
        } catch (err) {
            setError('Weather unavailable')
            setLoading(false)
        }
    }

    function handleGetLocation() {
        setLoading(true)
        setError(null)

        if (!navigator.geolocation) {
            setError('No geolocation')
            setLoading(false)
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                fetchWeather(latitude, longitude)
            },
            (err) => {
                setError('Location denied')
                setLoading(false)
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000
            }
        )
    }

    function handleRetry() {
        handleGetLocation()
    }

    useEffect(() => {
        handleGetLocation()
    }, [])

    if (loading) {
        return (
            <div className="weather-widget">
                <div className="weather-loading">
                    <div className="weather-loading-spinner"></div>
                    <span>Loading...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="weather-widget">
                <div className="weather-error">
                    <span className="weather-error-icon">📍</span>
                    <span className="weather-error-text">{error}</span>
                    <button className="weather-retry" onClick={handleRetry}>
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="weather-widget">
            <div className="weather-content">
                <span className="weather-icon">
                    {getWeatherIcon(weather.weatherCode)}
                </span>
                <div className="weather-info">
                    <div className="weather-temp">{weather.temperature}°C</div>
                    <div className="weather-desc">
                        {getWeatherDescription(weather.weatherCode)}
                    </div>
                </div>
                {location && (
                    <div className="weather-location">
                        <FaMapMarkerAlt className="weather-location-icon" />
                        <span>{location}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WeatherWidget
