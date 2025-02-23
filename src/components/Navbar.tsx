"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import NavLink from "./NavLink"
import Link from "next/link"
// import logo from "/public/logo.png"
// import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
// import { FaUserCircle } from "react-icons/fa"
// import Loader from "./Loader"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  // const { isLoaded, user, isSignedIn } = useUser()
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname]) // Removed unnecessary pathname dependency

  // if (!isMounted) {
  //   return 
  // }

  return (
    <nav className=" border-b w-full border-primary-lighter h-16 z-50 text-white sticky top-0 bg-custom-white bg-gradient-to-br to-sky-500 from-indigo-700 ">
      <div className="max-w-7xl mx-auto px-[5vw] sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 focus:custom-shadow duration-300 transition-all focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  className={`transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
                <path
                  className={`transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"} absolute inset-0`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center sm:items-center sm:justify-start h-full">
            {/* <div className="flex-shrink-0">
              <Link href="/" className="block relative w-36">
                <Image src={logo || "/placeholder.svg"} alt="Logo" />
              </Link>
            </div> */}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4 items-center">
                <NavLink href="/">
                  <h2 className="hover:custom-shadow duration-300 transition-all px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </h2>
                </NavLink>
                <NavLink href="/notifications">
                  <h2 className="hover:custom-shadow duration-300 transition-all px-3 py-2 rounded-md text-sm font-medium">
                    Notifications
                  </h2>
                </NavLink>
                <NavLink href="/support-center">
                  <h2 className="hover:custom-shadow duration-300 transition-all px-3 py-2 rounded-md text-sm font-medium">
                    Support Center
                  </h2>
                </NavLink>
              </div>
            </div>
          </div>

          {/* {
            isMounted ? isLoaded && isSignedIn ? (
              <Link href='/Travel Advisory' className=" block relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={user?.imageUrl}
                  alt="user_image"
                  className=" w-full h-full"
                  fill
                />
              </Link>
            ) : (
              <Link href="/Travel Advisory">
                <FaUserCircle className="w-8 h-8 bg-secondary-light rounded-full text-custom-white p-[2px]" />
              </Link>
            ) : <Loader width="w-8" height="h-8" />
          } */}
        </div>
      </div>

      <div
        className={`${isOpen ? "h-screen" : "h-0"} bg-gradient-to-tr from-sky-500 to-blue-700 relative sm:hidden transition-[height] duration-500 overflow-hidden ease-in-out delay-0`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-primary-dark text-white">
          <NavLink href="/">
            <h2 className="block px-3 py-2 text-base font-semibold">Home</h2>
          </NavLink>
          <NavLink href="/notifications">
            <h2 className="block px-3 py-2 text-base font-semibold">Notifications</h2>
          </NavLink>
          <NavLink href="/support-center">
            <h2 className="block px-3 py-2 text-base font-semibold">Support Center</h2>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

