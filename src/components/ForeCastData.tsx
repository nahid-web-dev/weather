"use client"
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Droplets, Thermometer } from "lucide-react"

const ForeCastData = ({ foreCastWeatherDetails }: any) => {
  const getWeatherIcon = (description: string) => {
    switch (description.toLowerCase()) {
      case "clear sky":
        return <Sun size={48} className="text-yellow-400" />
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return <Cloud size={48} className="text-gray-400" />
      case "shower rain":
      case "rain":
        return <CloudRain size={48} className="text-blue-400" />
      case "thunderstorm":
        return <CloudLightning size={48} className="text-yellow-600" />
      case "snow":
        return <CloudSnow size={48} className="text-blue-200" />
      default:
        return <Cloud size={48} className="text-gray-400" />
    }
  }

  return (
    <div className=" w-[96%] sm:w-[90%] rounded-lg md:rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gradient-to-tr from-sky-600 to-indigo-600 min-h-screen">
      {foreCastWeatherDetails?.list && foreCastWeatherDetails?.list?.map((element: any, idx: number) => (
        <div
          key={idx}
          className="bg-gradient-to-tr from-transparent to-blue-400 bg-opacity-10 backdrop-blur-2xl rounded-lg p-6 shadow-lg transition-all  hover:shadow-[0_0_5px_rgba(255,255,255,1)]"
        >
          <h2 className="text-xl font-semibold text-center text-white mb-4">
            {new Date(element?.dt_txt).toLocaleString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </h2>

          <div className="flex justify-center my-6">{getWeatherIcon(element?.weather[0].description)}</div>

          <div className="text-center mb-6">
            <p className="text-4xl font-bold text-white">{Math.round(element?.main.temp)}°F</p>
            <p className="text-lg text-gray-200 capitalize">{element?.weather[0].description}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center">
                <Thermometer size={20} className="mr-2" />
                <p className="text-sm">Feels Like:</p>
              </div>
              <p className="text-sm font-semibold">{Math.round(element?.main.feels_like)}°F</p>
            </div>
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center">
                <Droplets size={20} className="mr-2" />
                <p className="text-sm">Humidity:</p>
              </div>
              <p className="text-sm font-semibold">{element?.main.humidity}%</p>
            </div>
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center">
                <Wind size={20} className="mr-2" />
                <p className="text-sm">Wind Speed:</p>
              </div>
              <p className="text-sm font-semibold">{element?.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ForeCastData
