'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function MainNav() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    console.log(isSignedIn ? "User signed in" : "User signed out");
  }, [isSignedIn]);

  return (
    <div className="h-40 flex flex-row justify-between items-center w-385 bg-[var(--navDark)]">
      {/* Logo section */}
      <div className="flex items-center w-2/5 bg-[var(--navDarker)] h-full pl-20">
        <Link href="/">
            <Image
            src="/Images/Logo.png"
            width={350}
            height={50}
            alt="Dashboard DX Logo"
            priority={true}
            />
        </Link>
      </div>

      {/* Button section */}
      <div className="flex items-center pr-20 w-3/5 h-full flex justify-end bg-[var(--navDarker)]">
        <button
          type="button"
          onClick={() => setIsSignedIn((prev) => !prev)}
          className="transition-all ease-in-out duration-[1s] h-10 rounded-sm bg-[#6078ff] px-4 py-1 text-l font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isSignedIn ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </div>
  );
}
