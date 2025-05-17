"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        w-full fixed top-0 left-0 z-50
        backdrop-blur-md bg-black/60
        border-b border-white/10 transition-shadow duration-300
        ${hasShadow ? "shadow-lg shadow-black/30" : ""}
      `}
    >
      {/* Navbar content - full width with padding */}
      <div className="w-full px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold whitespace-nowrap">
          Walkman
          <span className="inline-block w-3 h-3 ml-1 bg-amber-400 rounded-full" />
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block lg:hidden text-white"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/" className="hover:text-amber-400 text-lg font-medium transition-colors">
            Home
          </Link>
          <Link href="/library" className="hover:text-amber-400 text-lg font-medium transition-colors">
            Library
          </Link>
          <Link href="/premium" className="hover:text-amber-400 text-lg font-medium transition-colors">
            Premium
          </Link>
          <Link href="/login">
            <Button className="bg-amber-400 hover:bg-amber-300 text-black text-lg px-4 rounded-full font-medium">
              Log in
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`
          lg:hidden w-full overflow-hidden 
          bg-black/10 backdrop-blur-,d border-t border-white/10
          transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"}
        `}
      >
        <div className="flex flex-col items-center space-y-4">
          <Link
            href="/"
            className="text-lg hover:text-amber-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/library"
            className="text-lg hover:text-amber-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Library
          </Link>
          <Link
            href="/premium"
            className="text-lg hover:text-amber-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Premium
          </Link>
          <Link href="/login" onClick={() => setIsOpen(false)} className="w-48">
            <Button className="bg-amber-400 hover:bg-amber-300 text-black text-lg px-4 rounded-full font-medium w-full">
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
