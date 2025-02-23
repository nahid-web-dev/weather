import TravelAdvisory from "@/components/TravelAdvisory";
import WeatherCard from "@/components/WeatherCard";
import WeatherMap from "@/components/WeatherMap";
import { getWeatherData } from "@/lib/getData";

interface HomeProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function HomePage({ searchParams }: HomeProps) {
  const { city } = searchParams;

  const { weatherDetails }: any = await getWeatherData(city || "dhaka");

  const demoWeatherDetails = {
    coord: { lon: 0, lat: 0 },
    weather: [{ id: 0, main: "not found", description: "not found", icon: "***" }],
    base: "none",
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
      sea_level: 0,
      grnd_level: 0,
    },
    visibility: 0,
    wind: { speed: 0, deg: 0, gust: 0 },
    clouds: { all: 0 },
    dt: 0,
    sys: { country: ".*", sunrise: 0, sunset: 0 },
    timezone: 0,
    id: 0,
    name: "Not found",
    cod: 0,
  };

  return (
    <main className="w-full flex flex-col md:gap-10 gap-8 my-4 justify-center items-center flex-grow">
      <div className="flex flex-wrap md:gap-10 gap-8 my-4 justify-center items-center w-full">
        <WeatherCard weatherDetails={weatherDetails || demoWeatherDetails} />
        <WeatherMap weatherDetails={weatherDetails || demoWeatherDetails} />
      </div>

      <div className="flex flex-wrap md:gap-10 gap-8 my-4 justify-center items-center w-full">
        <TravelAdvisory weatherDetails={weatherDetails || demoWeatherDetails} />
      </div>
    </main>
  );
}
