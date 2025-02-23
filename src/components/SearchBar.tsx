'use client'

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import LoaderComponent from "./LoaderComponent";

const SearchBar = () => {

  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()

  console.log(searchParams)

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    router.push(`/?city=${city}`)
    // setIsLoading(false)
  };

  useEffect(() => {
    setIsLoading(false)
  }, [searchParams])

  return (
    <>
      {isLoading ?
        <LoaderComponent /> : null
      }
      <motion.form
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full relative max-w-md border-none mx-auto mb-8 flex flex-col justify-center items-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="w-full text-white border-b placeholder:text-white px-4 py-3 bg-transparent backdrop-blur-lg outline-none font-semibold transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      </motion.form>
    </>
  );
};

export default SearchBar