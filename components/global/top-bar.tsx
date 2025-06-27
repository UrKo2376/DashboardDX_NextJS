'use client'

import HeaderDate from "@/lib/formattedDate";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import NavLink from "@/lib/nav-link";

const formattedDate = HeaderDate();


export default function Top_Bar(){
    const pathname = usePathname();
    return(
        <div className="columns-2 h-10 bg-[var(--topBarBackground)] text-black">
            <div className="h-full flex items-center justify-start">
                <h1 className="pl-4 font-semibold">{formattedDate}</h1>
            </div>
            
            <div className="h-full flex items-center justify-evenly">
                <NavLink 
                    href="/" 
                    exact
                    className="font-semibold transition-all ease-in-out duration-[1s] hover:text-[#6078ff] [&.active]:text-red-600"
                    >Home
                </NavLink>
                <NavLink 
                    href="/about-us" 
                    className="font-semibold transition-all ease-in-out duration-[1s] hover:text-[#6078ff] [&.active]:text-red-600">
                    About Us
                </NavLink>
                <NavLink 
                    href="/terms" 
                    className="font-semibold transition-all ease-in-out duration-[1s] hover:text-[#6078ff] [&.active]:text-red-600"
                    >Terms & Conditions
                </NavLink>
                <NavLink 
                    href="/contact-us" 
                    className="font-semibold transition-all ease-in-out duration-[1s] hover:text-[#6078ff] [&.active]:text-red-600">Contact Us
                </NavLink>
            </div>
        </div>
    )
}