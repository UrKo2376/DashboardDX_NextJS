'use client'

import HeaderDate from "@/lib/formattedDate";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import NavLink from "@/lib/nav-link";

const formattedDate = HeaderDate();

export default function Top_Bar() {
    const pathname = usePathname();
    return(
        <div className="columns-2 w-385 h-10 bg-[var(--mainBGLighter)] text-black">
            <div className="h-full flex items-center justify-start">
                <h1 className="pl-4 font-semibold">{formattedDate}</h1>
            </div>
            
            <div className="h-full flex items-center justify-evenly">
                <NavLink 
                    href="/" 
                    exact
                    //className="font-semibold transition-all ease-in-out duration-[1s] hover:text-[#6078ff] [&.active]:text-shadow-md/60 [&.active]:text-shadow-[#444]"
                    className="main-nav"
                    >Home
                </NavLink> 
                <NavLink 
                    href="/about-us" 
                    className="main-nav"
                    >About Us
                </NavLink>
                <NavLink 
                    href="/terms" 
                    className="main-nav"
                    >Terms & Conditions
                </NavLink>
                <NavLink 
                    href="/contact-us" 
                    className="main-nav"
                    >Contact Us
                </NavLink>
            </div>
        </div>
    )
}