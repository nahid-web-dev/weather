import { FileQuestion, Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="text-center px-4">
        <FileQuestion className="mx-auto text-white w-24 h-24 mb-8" />
        <h1 className="text-5xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl font-medium text-purple-100 mb-8">Oops! Page not found</p>
        <p className="text-lg text-purple-200 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 transition duration-150 ease-in-out"
        >
          <Home className="w-5 h-5 mr-2" />
          Go back home
        </Link>
      </div>
    </div>
  )
}

