"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, ChevronDown } from "lucide-react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut({ 
        callbackUrl: "/",
        redirect: true 
      });
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback: force redirect to home
      router.push("/");
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserDisplayName = () => {
    if (session?.user?.name) return session.user.name;
    if (session?.user?.username) return session.user.username;
    if (session?.user?.email) return session.user.email.split("@")[0];
    return "User";
  };

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
          
          {/* Conditional rendering based on session */}
          {status === "loading" ? (
            <div className="w-10 h-10 rounded-full bg-gray-600 animate-pulse" />
          ) : session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 rounded-full p-0 bg-transparent hover:bg-white/10 flex items-center gap-2 px-3"
                >
                  <Avatar className="h-8 w-8 border-2 border-amber-400">
                    <AvatarImage 
                      src={session.user.image || ""} 
                      alt={getUserDisplayName()} 
                    />
                    <AvatarFallback className="bg-amber-400 text-black font-semibold text-sm">
                      {getInitials(getUserDisplayName())}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white text-sm font-medium">
                    {getUserDisplayName()}
                  </span>
                  <ChevronDown className="h-4 w-4 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-700" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={session.user.image || ""} 
                      alt={getUserDisplayName()} 
                    />
                    <AvatarFallback className="bg-amber-400 text-black font-semibold">
                      {getInitials(getUserDisplayName())}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-white">{getUserDisplayName()}</p>
                    {session.user.email && (
                      <p className="w-[200px] truncate text-sm text-gray-400">
                        {session.user.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-zinc-700" />
                <DropdownMenuItem asChild className="text-white hover:bg-zinc-800">
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-700" />
                <DropdownMenuItem
                  className="cursor-pointer text-red-400 hover:bg-zinc-800 hover:text-red-300"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="bg-amber-400 hover:bg-amber-300 text-black text-lg px-4 rounded-full font-medium">
                Log in
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`
          lg:hidden w-full overflow-hidden 
          bg-black/90 backdrop-blur-md border-t border-white/10
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
          
          {/* Mobile auth section */}
          {status === "loading" ? (
            <div className="w-12 h-12 rounded-full bg-gray-600 animate-pulse" />
          ) : session?.user ? (
            <div className="flex flex-col items-center space-y-3 w-48 pt-2">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 border-2 border-amber-400">
                  <AvatarImage 
                    src={session.user.image || ""} 
                    alt={getUserDisplayName()} 
                  />
                  <AvatarFallback className="bg-amber-400 text-black font-semibold">
                    {getInitials(getUserDisplayName())}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-white font-medium">{getUserDisplayName()}</span>
                  {session.user.email && (
                    <span className="text-gray-300 text-sm truncate max-w-[120px]">
                      {session.user.email}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full space-y-2">

                <Button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </div>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)} className="w-48">
              <Button className="bg-amber-400 hover:bg-amber-300 text-black text-lg px-4 rounded-full font-medium w-full">
                Log in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}