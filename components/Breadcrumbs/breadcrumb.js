"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function Breadcrumb() {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) {
    return (
      <nav className="flex items-center space-x-2 text-gray-700 text-sm font-medium">
        <Link href="/" className="flex items-center space-x-1 hover:text-blue-600">
          <HomeIcon className="h-5 w-5" aria-hidden="true" />
          <span>DashboardDX</span>
        </Link>
      </nav>
    );
  }

  const currentPage = parts[parts.length - 1]
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <nav className="flex items-center space-x-2 text-gray-700 text-sm font-medium" aria-label="Breadcrumb">
      <Link href="/" className="flex items-center space-x-1 hover:text-blue-600">
        <HomeIcon className="h-5 w-5" aria-hidden="true" />
        <span>Home</span>
      </Link>
      <span className="text-gray-400 select-none">/</span>
      <span aria-current="page">{currentPage}</span>
    </nav>
  );
}
