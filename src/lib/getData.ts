import axios from "axios";

export const getWeatherData = async (city: string = "dhaka") => {
  try {
    const WEATHER_API_BASE_URL = process.env.WEATHER_API_BASE_URL;
    const NEXT_PUBLIC_WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    const response = await axios.get(`${WEATHER_API_BASE_URL}/weather?q=${city}&appid=${NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`);
    const response2 = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${NEXT_PUBLIC_WEATHER_API_KEY}&cnt=5`);

    return {
      weatherDetails: response.data,
      foreCastWeatherDetails: response2.data,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error.message;
    }
    return "An unknown error occurred";
  }
};

export const getWeatherMapData = async (lat: number, lon: number) => {
  try {
    const WEATHER_MAP_API_BASE_URL = process.env.WEATHER_MAP_API_BASE_URL;
    const NEXT_PUBLIC_WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    if (!NEXT_PUBLIC_WEATHER_API_KEY) {
      console.error("Missing API Key");
      return;
    }

    await axios.get(`${WEATHER_MAP_API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error.message;
    }
    return "An unknown error occurred";
  }
};
