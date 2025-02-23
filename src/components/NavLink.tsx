
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"


const NavLink = ({ children, href }: any) => {
  const pathname = usePathname()
  return (
    <Link href={href} className={` 
     ${href == '/' ? href == pathname ?
        'custom-shadow-white md:shadow-none rounded-md md:rounded-none md:border-primary-light md:text-primary-dark ' :
        '' : pathname.includes(href) ? 'custom-shadow-white md:shadow-none rounded-md md:rounded-none md:border-primary-light md:text-primary-dark ' : ''}
     block border-b md:border-b-2 md:text-secondary-dark border-transparent`} >
      {children}
    </Link>
  )
}

export default NavLink