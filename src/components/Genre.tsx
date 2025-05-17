
"use client";

import { useEffect, useState } from "react";

const genres = ['Jazz', 'Rock', 'Pop', 'Hip-Hop', 'Indie', 'EDM'];

export default function GenreScroll() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % genres.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-4xl font-bold text-orange-500">
      {genres[currentIndex]}
    </div>
  );
}
