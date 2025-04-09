"use client";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    window.location.href = `/search/?s=${encodeURIComponent(search)}`;
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Anime", href: "/anime" },
    { name: "Manga", href: "/manga" },
    { name: "Manhua", href: "/manhua" },
    { name: "Bookmark", href: "/bookmark" },
    { name: "Genre", href: "/genre" },
  ];

  const linkStyle = (href: string) =>
    pathname === href
      ? "text-white font-semibold underline underline-offset-4"
      : "hover:text-gray-200 transition";

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide hover:opacity-80 transition">
          Cihuy Komik
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-lg font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkStyle(link.href)}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-40 md:w-60">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full py-2 pl-4 pr-10 text-sm text-white bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search className="text-gray-400 hover:text-white transition" size={18} />
          </button>
        </form>

        {/* Mobile Menu Button */}
        <button className="md:hidden ml-4" onClick={() => setMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 flex flex-col items-center bg-blue-500 p-3 rounded-md shadow-lg transition-all">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-2 w-full text-center rounded-md ${pathname === link.href ? "bg-blue-700 font-semibold" : "hover:bg-blue-700"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
