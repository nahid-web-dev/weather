'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface WeatherData {
  name: string;
  main: { temp: number };
  weather: { description: string }[];
  coord: { lon: number; lat: number };
  id: string
}

interface WeatherMapProps {
  weatherDetails: WeatherData;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ weatherDetails }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeatherData = async (lat: number, lon: number) => {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    if (!apiKey) {
      console.error('Missing API Key');
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData(weatherDetails.coord.lat, weatherDetails.coord.lon);
  }, [weatherDetails.coord.lat, weatherDetails.coord.lon]);

  // Create a custom icon for the marker
  const customIcon = new Icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png', // Replace with your icon URL
    iconSize: [40, 40],
    iconAnchor: [15, 30],
  });



  return (
    <div className="md:w-1/2 max-w-[600px] w-[95%] sm:w-[80%]">
      <div className="w-full h-[400px] p-2 border-2 rounded-2xl bg-white border-indigo-400">

        {
          !weatherDetails.id || weatherDetails.id == '0' ?
            <div className=' h-full w-full flex justify-center items-center bg-indigo-300 opacity-30'>
              <h2 className=' text-red-600 text-2xl font-semibold text-center'>City not found!</h2>
            </div>
            :

            <MapContainer
              center={[weatherDetails.coord.lat, weatherDetails.coord.lon]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%', zIndex: 20, borderRadius: '8px' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[weatherDetails.coord.lat, weatherDetails.coord.lon]}
                icon={customIcon}
              >
                <Popup>
                  <div>
                    <h3>{weatherDetails.name}</h3>
                    <p>{weatherData ? `${weatherData.main.temp}°C` : 'Loading...'}</p>
                    <p>{weatherData ? weatherData.weather[0].description : ''}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
        }
      </div>
    </div>
  );
};

export default WeatherMap;



// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import { MapPin } from 'lucide-react';

// interface WeatherData {
//   name: string;
//   main: { temp: number };
//   weather: { description: string }[];
//   coord: { lon: number; lat: number };
// }

// interface WeatherMapProps {
//   weatherDetails: WeatherData;
// }

// const WeatherMap: React.FC<WeatherMapProps> = ({ weatherDetails }) => {
//   const mapContainerRef = useRef<HTMLDivElement | null>(null);
//   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

//   const fetchWeatherData = async (lat: number, lon: number) => {
//     const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
//     if (!apiKey) {
//       console.error('Missing API Key');
//       return;
//     }

//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

//     try {
//       const response = await axios.get(url);
//       setWeatherData(response.data);
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//     }
//   };

//   useEffect(() => {
//     let map: any;
//     let L: any;

//     const initializeMap = async () => {
//       L = await import('leaflet'); // ✅ Dynamically import Leaflet (fixes SSR issue)

//       if (mapContainerRef.current) {
//         map = L.map(mapContainerRef.current).setView([weatherDetails.coord.lat, weatherDetails.coord.lon], 13);
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//         // ✅ Convert Lucide MapPin to SVG String
//         const mapPinSVG = `
//           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="red" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//             <path d="M12 21s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10z"></path>
//             <circle cx="12" cy="11" r="2"></circle>
//           </svg>`;

//         const customIcon = L.divIcon({
//           html: mapPinSVG,
//           className: 'custom-marker-icon',
//           iconSize: [30, 30],
//           iconAnchor: [15, 30],
//         });

//         const marker = L.marker([weatherDetails.coord.lat, weatherDetails.coord.lon], { icon: customIcon }).addTo(map);

//         fetchWeatherData(weatherDetails.coord.lat, weatherDetails.coord.lon);

//         marker.on('click', (e: L.LeafletMouseEvent) => {
//           const lat = e.latlng.lat;
//           const lon = e.latlng.lng;
//           fetchWeatherData(lat, lon);
//         });
//       }
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//       // ✅ Convert Lucide MapPin to SVG String
//       const mapPinSVG = `
//           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="red" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//             <path d="M12 21s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10z"></path>
//             <circle cx="12" cy="11" r="2"></circle>
//           </svg>`;

//       const customIcon = L.divIcon({
//         html: mapPinSVG,
//         className: 'custom-marker-icon',
//         iconSize: [30, 30],
//         iconAnchor: [15, 30],
//       });

//       const marker = L.marker([weatherDetails.coord.lat, weatherDetails.coord.lon], { icon: customIcon }).addTo(map);

//       fetchWeatherData(weatherDetails.coord.lat, weatherDetails.coord.lon);

//       marker.on('click', (e: L.LeafletMouseEvent) => {
//         const lat = e.latlng.lat;
//         const lon = e.latlng.lng;
//         fetchWeatherData(lat, lon);
//       });
//     };

//     initializeMap();

//     return () => {
//       if (map) {
//         map.remove();
//       }
//     };
//   }, [weatherDetails.coord.lat, weatherDetails.coord.lon]);

//   return (
//     <div className="md:w-1/2 max-w-[600px] w-[95%] sm:w-[80%]">
//       <div className=' w-full h-[400px] p-2 border-2 rounded-2xl bg-white border-indigo-400'>
//         <div ref={mapContainerRef} className=' z-10 h-full w-full rounded-xl'></div>
//       </div>
//     </div>
//   );
// };

// export default WeatherMap;

// "use client"

// import { useEffect, useRef, useState } from "react"
// import axios from "axios"
// import "leaflet/dist/leaflet.css"
// import L, { Map, Layer } from "leaflet"
// import "leaflet.heat"

// interface WeatherData {
//   name: string
//   main: { temp: number }
//   weather: { description: string }[]
//   coord: { lon: number; lat: number }
// }

// interface WeatherMapProps {
//   weatherDetails: WeatherData
// }

// const WeatherMap: React.FC<WeatherMapProps> = ({ weatherDetails }) => {
//   const mapContainerRef = useRef<HTMLDivElement | null>(null)
//   const [weatherData, setWeatherData] = useState<WeatherData[]>([])
//   const [mapInstance, setMapInstance] = useState<Map | null>(null)
//   const [heatLayerInstance, setHeatLayerInstance] = useState<Layer | null>(null)

//   const fetchWeatherData = async (lat: number, lon: number, radius = 50) => {
//     const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY
//     if (!apiKey) {
//       console.error("Missing API Key")
//       return
//     }

//     const url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=${radius}&appid=${apiKey}&units=metric`

//     try {
//       const response = await axios.get(url)
//       setWeatherData(response.data.list)
//     } catch (error) {
//       console.error("Error fetching weather data:", error)
//     }
//   }

//   useEffect(() => {
//     if (mapContainerRef.current && !mapInstance) {
//       const map = L.map(mapContainerRef.current).setView([weatherDetails.coord.lat, weatherDetails.coord.lon], 8)
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)

//       setMapInstance(map)

//       fetchWeatherData(weatherDetails.coord.lat, weatherDetails.coord.lon)

//       map.on("moveend", () => {
//         const center = map.getCenter()
//         fetchWeatherData(center.lat, center.lng)
//       })
//     }
//   }, [weatherDetails.coord.lat, weatherDetails.coord.lon])

//   useEffect(() => {
//     if (weatherData.length > 0 && mapInstance) {
//       // Remove previous heat layer if it exists
//       if (heatLayerInstance) {
//         mapInstance.removeLayer(heatLayerInstance)
//       }

//       const heatData = weatherData.map((data) => [data.coord.lat, data.coord.lon, data.main.temp])

//       const heatLayer = (L as any).heatLayer(heatData, {
//         radius: 25,
//         blur: 15,
//         maxZoom: 10,
//         max: 40,
//         gradient: { 0.4: "blue", 0.6: "lime", 0.8: "yellow", 1: "red" },
//       }).addTo(mapInstance)

//       setHeatLayerInstance(heatLayer)
//     }
//   }, [weatherData, mapInstance])

//   return (
//     <div className=" w-1/2">
//       <div className="w-full h-[400px] p-2 border-2 rounded-2xl bg-white border-primary">
//         <div ref={mapContainerRef} className="h-full w-full rounded-xl"></div>
//       </div>
//     </div>
//   )
// }

// export default WeatherMap
