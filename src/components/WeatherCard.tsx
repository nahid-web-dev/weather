"use client"

import { useState } from "react"
import { Cloud, Droplets, Wind } from "lucide-react"
import SearchBar from "./SearchBar"
import { motion } from 'framer-motion'

interface WeatherweatherDetails {
  name: string
  sys: {
    country: string
  }
  weather: Array<{
    description: string
  }>
  main: {
    temp: number
    humidity: number
    feels_like: number
  }
  wind: {
    speed: number
  }
}

interface WeatherCardProps {
  weatherDetails: WeatherweatherDetails
}



const WeatherCard: React.FC<WeatherCardProps> = ({ weatherDetails }) => {



  const [isCelsius, setIsCelsius] = useState(true)

  const convertTemp = (temp: number) => {
    if (!isCelsius) {
      return ((temp * 9) / 5 + 32).toFixed(1) + "°F"
    }
    return temp.toFixed(1) + "°C"
  }

  return (

    <div
      className=" w-[98%] relative sm:w-[80%] md:w-[400px] min-h-96 p-6 flex flex-col justify-evenly rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-700 border border-white/20 shadow-lg"
    >
      <SearchBar />

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, }}
        className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-1">
          {weatherDetails?.name}, {weatherDetails?.sys.country}
        </h2>
        <p className="text-sm text-white/80 capitalize">{weatherDetails?.weather[0].description}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, }}
        className="flex justify-center mb-6">
        <div
          className="text-6xl font-bold text-white cursor-pointer transition-all hover:scale-110"
          onClick={() => setIsCelsius(!isCelsius)}
        >
          {weatherDetails?.main?.temp && convertTemp(weatherDetails?.main.temp)}
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 text-white/90">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, }}
          className="flex flex-col items-center space-y-1">
          <Droplets className="w-6 h-6" />
          <span className="text-sm">Humidity</span>
          <span className="font-medium">{weatherDetails?.main.humidity}%</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, }}
          className="flex flex-col items-center space-y-1">
          <Wind className="w-6 h-6" />
          <span className="text-sm">Wind</span>
          <span className="font-medium">{weatherDetails?.wind.speed} m/s</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, }}
          className="flex flex-col items-center space-y-1">
          <Cloud className="w-6 h-6" />
          <span className="text-sm">Feels Like</span>
          <span className="font-medium">{convertTemp(weatherDetails?.main.feels_like)}</span>
        </motion.div>
      </div>
    </div>
  )
}

export default WeatherCard

