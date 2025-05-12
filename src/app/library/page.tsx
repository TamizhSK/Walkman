// app/library/page.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";

export default function Library() {
  const genres = ['Jazz', 'Rock', 'Pop', 'Hip-Hop', 'Indie', 'EDM'];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate genres
  useState(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % genres.length);
    }, 2000);
    return () => clearInterval(interval);
  });

  const genreCards = [
    { id: 1, title: 'Pop', image: '/library/1.png', audio: '/music/audio1.mp3' },
    { id: 2, title: 'Electronic', image: '/library/2.jpeg', audio: '/music/audio2.mp3' },
    { id: 3, title: 'Jazz', image: '/library/3.jpeg', audio: '/music/audio3.mp3' },
    { id: 4, title: 'Hip-Hop', image: '/library/4.jpg', audio: '/music/audio4.mp3' },
    { id: 5, title: 'Hard Rock', image: '/library/5.jpeg', audio: '/music/audio5.mp3' },
    { id: 6, title: 'Lo-Fi', image: '/library/6.jpg', audio: '/music/audio6.mp3' },
  ];

  // Audio handling
  const handleMouseEnter = (audioSrc: string) => {
    if (typeof window !== 'undefined' && !isTouchDevice()) {
      const audio = new Audio(audioSrc);
      audio.play().catch(e => console.log('Audio playback prevented:', e));
      return audio;
    }
  };

  const handleMouseLeave = (audio: HTMLAudioElement | undefined) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const isTouchDevice = () => {
    return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column */}
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold mb-4">Genres</h1>
              <p className="text-gray-300">
                The evolution of music genres throughout history reflects the changes in society, culture, and technology, showcasing the dynamic nature of art. The fusion of different genres has created exciting new sounds and subgenres, such as jazz-funk, country-rock, and electro-pop, among others.
              </p>
            </div>
            {/* Right Column */}
            <div className="md:w-1/2 flex justify-center items-center">
              <div className="text-4xl font-bold text-orange-500">
                {genres[currentIndex]}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {genreCards.map((genre) => (
            <Card 
              key={genre.id} 
              className="bg-gray-900 border-none overflow-hidden hover:shadow-lg transition-all duration-300"
              onMouseEnter={() => handleMouseEnter(genre.audio)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget as any)}
            >
              <div className="relative h-64">
                <Image 
                  src={genre.image} 
                  alt={`${genre.title} Music`} 
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold">{genre.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    </div>
  );
}