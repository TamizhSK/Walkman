"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const genres = [
  { name: "Jazz", gradient: "from-pink-500 via-red-500 to-yellow-500" },
  { name: "Rock", gradient: "from-blue-500 via-purple-500 to-pink-500" },
  { name: "Pop", gradient: "from-teal-400 via-lime-400 to-yellow-300" },
  { name: "Hip-Hop", gradient: "from-red-400 via-amber-500 to-orange-500" },
  { name: "Indie", gradient: "from-cyan-500 via-blue-500 to-indigo-500" },
  { name: "EDM", gradient: "from-green-400 via-emerald-500 to-teal-500" },
];

export default function GenreScroll() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % genres.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[3.5rem] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={genres[currentIndex].name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className={`text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-tr ${genres[currentIndex].gradient}`}
        >
          {genres[currentIndex].name}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
