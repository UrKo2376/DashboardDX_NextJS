'use client'
import Image from "next/image";
import Link from "next/link";
import NavLink from "@/lib/nav-link";
import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";


import { useRouter } from "next/navigation"; 

export default function MainNav() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);



useEffect(() => {
  if (status === "loading") return; // do nothing while loading

  if (status === "unauthenticated") {
    console.log("User signed out");
    const timer = setTimeout(() => router.push("/"), 5000);
    return () => clearTimeout(timer); // cleanup timer on unmount or session change
  }

  if (status === "authenticated") {
    console.log("User signed in:", session.user);
  }
}, [status, session, router]);

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMsg("");
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setErrorMsg("Invalid username or password");
    } else {
      // Clear password field on successful login
      setPassword("");
      //setTimeout(()=> router.push("/my-account"), 1000)
      router.push("/my-account")
    }
  };

  return (
    <div className="h-40 flex flex-row justify-between items-center w-385 bg-[var(--navDark)]">
      {/* Logo section */}
      <div className="flex items-center w-2/5 bg-[var(--navDarker)] h-full pl-4">
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

      {/* Right section */}
      <div className="flex flex-col items-end py-4 pr-20 w-3/5 h-full justify-center bg-[var(--navDarker)]">
        {session && (
          <>
            <div className="flex w-4/5 justify-between py-4">
              <NavLink href="/my-account" className="main-nav">
                My Account
              </NavLink>
              <NavLink href="/calendar" className="main-nav">
                Calendar
              </NavLink>
              <NavLink href="/boards" className="main-nav">
                Boards
              </NavLink>
              <NavLink href="/workforce" className="main-nav">
                Workforce
              </NavLink>
              <NavLink href="/help" className="main-nav">
                Help & FAQ
              </NavLink>
            </div>
            <div className="flex w-4/5 justify-end py-4">
              <button
                type="button"
                onClick={() => signOut()}
                className="transition-all ease-in-out duration-[1s] h-10 rounded-sm bg-[#6078ff] px-4 py-1 text-l font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Out
              </button>
            </div>
          </>
        )}

        {!session && (
          <div className="flex items-center space-x-2 w-full justify-end py-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-10 rounded-sm px-3 text-white border-white border-1"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 rounded-sm px-3 pr-10 text-white border-white border-1 w-full bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center text-white hover:text-indigo-400 transition-colors duration-300"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeIcon className="h-5 w-5 transition-transform duration-300 rotate-0 scale-100" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5 transition-transform duration-300 rotate-0 scale-100" />
                )}
              </button>
            </div>    
            <button
              type="button"
              disabled={loading}
              onClick={handleSignIn}
              className="transition-all ease-in-out duration-[1s] h-10 rounded-sm bg-[#6078ff] px-4 py-1 text-l font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
          
        )}
        {errorMsg && (
          <p className="text-red-500 text-sm mt-1 w-4/5 text-right">{errorMsg}</p>
        )}
      </div>
    </div>
    
  );
}
