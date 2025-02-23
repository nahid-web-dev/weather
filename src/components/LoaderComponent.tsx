"use client"

import { Loader } from "lucide-react"

interface LoaderComponentProps {
  height?: string
  width?: string
}

const LoaderComponent: React.FC<LoaderComponentProps> = ({ height = 'h-16', width = 'w-16' }) => {
  return (
    <div className="flex bg-gray-100 backdrop-blur-xl opacity-30 justify-center items-center h-full w-full absolute top-0 left-0">
      <Loader className={` text-blue-500 animate-spin ${height} ${width} `} />
    </div>
  )
}

export default LoaderComponent
