// components/Nav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Walkman<span className="inline-block w-2 h-2 ml-1 bg-orange-500 rounded-full"></span>
        </Link>
        
        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block lg:hidden text-white"
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
        <div className={`lg:flex items-center space-x-6 ${isOpen ? 'block absolute top-16 left-0 right-0 bg-black p-4 z-50' : 'hidden lg:flex'}`}>
          <Link 
            href="/" 
            className="hover:text-orange-500 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/library" 
            className="hover:text-orange-500 transition-colors"
          >
            Library
          </Link>
          <Link 
            href="/premium" 
            className="hover:text-orange-500 transition-colors"
          >
            Premium
          </Link>
          <Link href="/login">
            <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}