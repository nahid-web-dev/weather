import axios from "axios"


export const getWeatherData = async (city: any = 'dhaka') => {

  try {
    const WEATHER_API_BASE_URL = process.env.WEATHER_API_BASE_URL
    const NEXT_PUBLIC_WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY
    // const response = await axios.get(`${WEATHER_API_BASE_URL}/weather?q=${city}&appid=${NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`)
    // return response.data
    const response = await axios.get(`${WEATHER_API_BASE_URL}/weather?q=${city}&appid=${NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`)
    const response2 = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${NEXT_PUBLIC_WEATHER_API_KEY}&cnt=5`)

    return {
      weatherDetails: response.data,
      foreCastWeatherDetails: response2.data
    }
  } catch (error: any) {
    console.log(error?.message)
    return error?.message
  }
}

export const getWeatherMapData = async (lat: number, lon: number) => {
  try {
    const WEATHER_MAP_API_BASE_URL = process.env.WEATHER_MAP_API_BASE_URL
    const NEXT_PUBLIC_WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY// Ensure this is accessible in the client
    if (!NEXT_PUBLIC_WEATHER_API_KEY) {
      console.error('Missing API Key');
      return;
    }

    const response = await axios.get(`${WEATHER_MAP_API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`)

    // return response.data

  } catch (error: any) {
    console.log(error?.message)
    return error?.message
  }
}