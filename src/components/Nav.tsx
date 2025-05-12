"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white w-full">
      {/* Top bar */}
      <div className="w-full px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold">
          Walkman
          <span className="inline-block w-3 h-3 ml-1 bg-amber-400 rounded-full"></span>
        </Link>

        {/* Mobile menu */}
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
            xmlns="http://www.w3.org/2000/svg"
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
          <Link href="/" className="hover:text-amber-400 text-lg transition-colors">
            Home
          </Link>
          <Link href="/library" className="hover:text-amber-400 text-lg transition-colors">
            Library
          </Link>
          <Link href="/premium" className="hover:text-amber-400 text-lg transition-colors">
            Premium
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-white text-sm px-4"
            >
              Log in
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile menu with centered content */}
      <div 
        className={`lg:hidden w-full bg-black border-t border-neutral-800 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 py-4">
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
            <Button
              variant="outline"
              className="w-full border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-white text-sm"
            >
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}