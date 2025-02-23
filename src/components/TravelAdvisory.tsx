"use client";

import React, { useState, useEffect } from "react";
import { Sun, Umbrella, CloudRain, CloudLightning, Wind, Snowflake, AlertTriangle, Info } from "lucide-react";
import axios from "axios";

interface WeatherDetails {
  main: { temp: number; humidity: number };
  weather: { description: string }[];
  wind: { speed: number };
}

interface TravelAdvisoryProps {
  weatherDetails?: WeatherDetails; // Make it optional to avoid errors if it's undefined initially
}

const TravelAdvisory: React.FC<TravelAdvisoryProps> = ({ weatherDetails }) => {
  // const [advisory, setAdvisory] = useState<string>(`Wear sunscreen and a hat. =devider= It's a warm, clear day with a temperature of 27.84°C 🌡️ and a light breeze of 2.38 m/s. Although the sky is clear, there's a 30% chance of precipitation. For adults, this is ideal weather for outdoor activities. For children, enjoy outdoor play, but remember to apply sunscreen ☀️ to protect their skin. Consider staying in shaded areas during peak sun hours to avoid overheating.`);
  const [advisory, setAdvisory] = useState<string>();

  useEffect(() => {
    if (!weatherDetails) return; // Avoid errors if data isn't ready

    const generateAdvisory = async () => {

      const model = 'google/gemini-2.0-flash-001';
      // const model = 'deepseek/deepseek-r1-distill-llama-8b';
      // const model = 'deepseek/deepseek-r1:free';
      // const model = 'openai/o3-mini-high';

      const prompt = `Given the following weather conditions:
      Temperature: ${weatherDetails.main.temp}°C
      Conditions: ${weatherDetails.weather[0].description}
      Wind Speed: ${weatherDetails.wind.speed} m/s
      Precipitation: ${weatherDetails.main.humidity}%
    
    Provide a two-part travel advisory in the following format:

    **Part 1: Immediate Recommendation**  
    - You will give an immediate recommendation based on the weather.  
    - I should take action based on this advice (e.g., carry an umbrella, wear a raincoat, dress in warm clothing).  
    - Keep this part brief and actionable.  

    =devider=  

    **Part 2: Detailed Advisory**  
    - You will describe the weather conditions and provide further advice.  
    - The response should be engaging with visuals (like ☀️, ☔, 🌡️).  

     **Formatting Constraint:**  
      - The response **must** follow this exact structure:  
        \`[Immediate Recommendation] =devider= [Detailed Advisory]\`  
      - No extra introductions, explanations, or labels like "Immediate Recommendation" or "Detailed Advisory"—just respond naturally.

    **For Adults:**  
    - If rainy and during work hours: light rain → carry an umbrella ☂️; heavy rain → wear a raincoat and waterproof shoes.  
    - If hot: over 35°C → wear light clothes and a hat; 30-35°C → wear a hat and carry an umbrella.  
    - If stormy, stay indoors.  
    - If wind speed > 30 km/h, secure loose items.  

    **For Children:**  
    - Good weather (20-30°C) → outdoor play with sunscreen ☀️; >30°C → indoor play or stay in shaded areas.  
    - Stormy or severe weather → stay indoors.  
    - Below 5°C → wear warm clothes and gloves; play indoors if too cold.  
    - Wind > 25 km/h → avoid outdoor activities.  

    Ensure the response is dynamic based on real-time conditions and time of day.`


      try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
          model: model,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        }, {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OR_API_KEY}`,
            "Content-Type": 'application/json',
            // 'HTTP-Referer': siteUrl, // Optional. Site URL for rankings on openrouter.ai.
            // 'X-Title': siteName, // Optional. Site title for rankings on openrouter.ai.
          }
        })

        setAdvisory(response?.data?.choices[0]?.message?.content)
        // Output the content of the response
        // console.log(response.data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("An unknown error occurred.");
        }
      }

    };

    generateAdvisory();
  }, [weatherDetails]); // Only re-run when `weatherDetails` updates

  return (
    <div className="w-[98%] sm:w-[80%] md:w-[600px] min-h-96 p-6 flex flex-col justify-evenly rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-700 border shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Outdoor Forecast Alert</h2>

      {weatherDetails ? (
        <div className="mb-4 space-y-2">
          <p>
            <strong>Temperature:</strong> {weatherDetails.main.temp}°C
          </p>
          <p>
            <strong>Conditions:</strong> {weatherDetails.weather[0].description}
          </p>
          <p>
            <strong>Wind Speed:</strong> {weatherDetails.wind.speed} m/s
          </p>
          <p>
            <strong>Precipitation:</strong> {weatherDetails.main.humidity}%
          </p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}

      {advisory ? (
        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="text-yellow-400" />
            <h3 className="text-xl font-semibold">{advisory?.split('=devider=')[0]}</h3>
          </div>
          <div className="flex items-start space-x-2">
            <Info className="text-blue-200 mt-1 flex-shrink-0" />
            <p className="text-sm">{advisory?.split('=devider=')[1]}</p>
          </div>
        </div>
      ) : (
        <p className="mt-4">Generating advisory...</p>
      )}

      <div className="mt-6 flex justify-around text-3xl">
        <Sun className="text-yellow-300" />
        <Umbrella className="text-blue-300" />
        <CloudRain className="text-gray-300" />
        <CloudLightning className="text-gray-300" />
        <Wind className="text-teal-300" />
        <Snowflake className="text-white" />
      </div>
    </div>
  );
};

export default TravelAdvisory;






// const prompt = `Given the following weather conditions:
//         Temperature: ${weatherDetails.main.temp}°C
//         Conditions: ${weatherDetails.weather[0].description}
//         Wind Speed: ${weatherDetails.wind.speed} m/s
//         Precipitation: ${weatherDetails.main.humidity}%

//     Please generate a travel advisory with the following conditions:
//     1. **Word Count**: The advisory should be between 200 and 400 words.
//     2. **Visuals**: If applicable, include suggestions for images or icons to accompany the advice. For example, use icons for clothing recommendations (e.g., umbrella for rain, sun hat for hot weather) or weather symbols (e.g., storm cloud for storms, sun for hot weather).

//     **For Adults:**
//     - If the weather is rainy and it's office or work time:
//         - If it's light rain, suggest carrying an umbrella.
//         - If it's heavy rain, suggest wearing a raincoat and waterproof footwear.
//         - Include a rain icon if necessary for visual representation.
//     - If the weather is hot and it's work time:
//         - If the temperature is over 35°C, suggest wearing light, breathable clothing and a wide-brimmed hat.
//         - If the temperature is between 30°C and 35°C, suggest wearing a hat and carrying an umbrella for sun protection.
//         - Use a sun icon to indicate hot weather and sun protection.
//     - If the weather is stormy, suggest staying indoors or postponing any outdoor activities.
//         - Include stormy cloud icons.
//     - If the wind speed is above 30 km/h, suggest securing any loose items and avoiding outdoor activities if necessary.

//     **For Children:**
//     - If the weather is good and it's playtime:
//         - If the temperature is moderate (20°C to 30°C), suggest outdoor playtime and bring sunscreen.
//         - If it's too hot (above 30°C), suggest playing indoors or seeking shaded areas.
//         - Use a playground icon for outdoor playtime.
//     - If the weather is stormy or has severe conditions (strong wind, heavy rain, or lightning), suggest staying indoors.
//         - Use storm cloud and lightning icons to represent severe weather.
//     - If the temperature is very low (below 5°C), suggest wearing warm clothes and gloves, and playing indoors if it's too cold outside.
//         - Add snowflake or cold weather icons to indicate freezing temperatures.
//     - If it's windy (over 25 km/h), advise caution at playgrounds or outdoor activities to avoid flying debris.

//     Please ensure the suggestions are dynamic and based on the specific weather conditions and time of day. Adjust the advisory to keep it fresh and relevant, providing the user with the most helpful and personalized advice. The response should be engaging, informative, and visually appealing, with the potential for relevant icons or images to enhance understanding.`