"use client"
import { Search, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-yellow-300 p-4 text-white text-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Cihuy Komik</h1>

        <div className="hidden md:flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/">Popular</Link>
          <Link href="/">Daftar Komik</Link>
        </div>

        <div className="relative w-32 sm:w-40 md:w-60">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-1.5 pl-3 pr-8 text-sm text-white bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
        </div>

        <button className="md:hidden ml-4" onClick={() => setMenuOpen(!isMenuOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-3 flex flex-col items-center bg-yellow-400 p-3 rounded-md shadow-md">
          <Link href="/" className="py-2 w-full text-center">Home</Link>
          <Link href="/" className="py-2 w-full text-center">Popular</Link>
          <Link href="/" className="py-2 w-full text-center">Daftar Komik</Link>
        </div>
      )}
    </nav>
  );
}
