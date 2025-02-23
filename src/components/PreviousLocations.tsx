
// import { motion } from "framer-motion";
// import { MapPin, Clock } from "lucide-react";
// import { WeatherData } from "@/lib/api";

// interface PreviousLocationsProps {
//   // locations: WeatherData[];
//   // onLocationSelect: (cityName: string) => void;
  
// }

// export const PreviousLocations = ({ locations, onLocationSelect }: PreviousLocationsProps) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="w-full max-w-md mx-auto mt-8"
//     >
//       <div className="flex items-center mb-4">
//         <Clock className="w-5 h-5 text-white mr-2" />
//         <h2 className="text-xl font-semibold text-white">Previous Searches</h2>
//       </div>
//       <div className="space-y-3">
//         {locations.map((location, index) => (
//           <motion.div
//             key={`${location.name}-${index}`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="p-4 rounded-lg backdrop-blur-xl bg-white/10 border border-white/20 cursor-pointer hover:bg-white/20 transition-all"
//             onClick={() => onLocationSelect(location.name)}
//           >
//             <div className="flex items-center">
//               <MapPin className="w-5 h-5 text-white mr-2" />
//               <span className="text-white font-medium">{location.name}, {location.sys.country}</span>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };
