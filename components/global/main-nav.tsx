'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavLink from "@/lib/nav-link";

export default function MainNav() {
  
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Replace with your actual login API call
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      setIsSignedIn(true);
      setUsername('');
      setPassword('');
    } else {
      alert('Invalid login');
    }
  };

  const handleLogout = () => {
    // Optional: call /api/auth/logout here
    setIsSignedIn(false);
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
            priority
          />
        </Link>
      </div>

      {/* Right section */}
      <div className="flex flex-col items-end justify-center pr-20 w-3/5 h-full bg-[var(--navDarker)]">
        {isSignedIn ? (
          <>
            <div className="flex w-full justify-between py-4">
              <NavLink href="/my-account" className="menu-links">My Account</NavLink>
              <NavLink href="/calendar" className="menu-links">Calendar</NavLink>
              <NavLink href="/boards" className="menu-links">Boards</NavLink>
              <NavLink href="/workforce" className="menu-links">Workforce</NavLink>
              <NavLink href="/help-faq" className="menu-links">Help & FAQ</NavLink>
            </div>
            <button
              onClick={handleLogout}
              className="transition-all ease-in-out duration-1000 h-10 rounded-sm bg-red-600 px-4 py-1 text-l font-semibold text-white shadow-xs hover:bg-red-700"
            >
              Sign Out
            </button>
          </>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-row gap-2">
            <input
              type="text"
              placeholder="Username"
              className="px-2 py-1 rounded-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="px-2 py-1 rounded-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="transition-all ease-in-out duration-1000 h-10 rounded-sm bg-[#6078ff] px-4 py-1 text-l font-semibold text-white shadow-xs hover:bg-indigo-500"
            >
              Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
