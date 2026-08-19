const getWeather = async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({
            message: "Please provide a city"
        });
    }

    try {
        // Get coordinates for the destination
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        if (!geoResponse.ok) {
            throw new Error("Unable to find destination coordinates");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        const location = geoData.results[0];

        // Get current weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&timezone=auto`
        );

        if (!weatherResponse.ok) {
            throw new Error("Unable to fetch weather data");
        }

        const weatherData = await weatherResponse.json();

        const weatherCode = weatherData.current.weather_code;

        res.json({
            destination: city,
            temperature: weatherData.current.temperature_2m,
            temperatureUnit: weatherData.current_units.temperature_2m,
            weatherCode: weatherCode,
            condition: getWeatherCondition(weatherCode),
            humidity: weatherData.current.relative_humidity_2m,
            windSpeed: weatherData.current.wind_speed_10m,
            windSpeedUnit: weatherData.current_units.wind_speed_10m
        });

    } catch (error) {
        console.error("Weather error:", error);

        res.status(500).json({
            message: "Unable to fetch weather information"
        });
    }
};


const getWeatherCondition = (code) => {
    if (code === 0) return "Clear sky";
    if ([1, 2, 3].includes(code)) return "Partly cloudy";
    if ([45, 48].includes(code)) return "Foggy";
    if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
    if ([61, 63, 65, 66, 67].includes(code)) return "Rain";
    if ([71, 73, 75, 77].includes(code)) return "Snow";
    if ([80, 81, 82].includes(code)) return "Rain showers";
    if ([85, 86].includes(code)) return "Snow showers";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";

    return "Unknown";
};


module.exports = {
    getWeather
};