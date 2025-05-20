"use client";

import { useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function SongGrid() {
  const genreCards = [
    {
      id: 1,
      title: "Pop",
      image:
        "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_600/v1747025638/1_ugmawr.png",
      audio:
        "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
    },
    {
      id: 2,
      title: "Electronic",
      image:
        "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_600/v1747025638/2_jwf6qa.jpg",
      audio:
        "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
    },
    {
      id: 3,
      title: "Jazz",
      image:
        "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_600/v1747025639/3_ap0tfa.jpg",
      audio:
        "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504738/audio3_ic5drk.mp3",
    },
    {
      id: 4,
      title: "Hip-Hop",
      image:
        "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_600/v1747025639/4_qp4f5s.jpg",
      audio:
        "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504633/audio4_ni7kzv.mp3",
    },
    {
      id: 5,
      title: "Hard Rock",
      image:
        "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_600/v1747025640/5_fo6vg1.jpg",
      audio:
        "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504758/audio5_fwf5rp.mp3",
    },
    {
      id: 6,
      title: "Lo-Fi",
      image:
        "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_600/v1747025641/6_gjaigz.jpg",
      audio:
        "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504633/audio6_l3zfhr.mp3",
    },
  ];

  // Store currently playing audio instances in a ref to avoid re-renders
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});

  const isTouchDevice = () =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const handleMouseEnter = (id: number, audioSrc: string) => {
    if (!isTouchDevice()) {
      // Pause any other playing audios first (optional)
      Object.entries(audioRefs.current).forEach(([key, audio]) => {
        if (audio && +key !== id) {
          audio.pause();
          audio.currentTime = 0;
        }
      });

      if (!audioRefs.current[id]) {
        audioRefs.current[id] = new Audio(audioSrc);
      }
      audioRefs.current[id]!
        .play()
        .catch((e) => console.warn("Audio playback prevented:", e));
    }
  };

  const handleMouseLeave = (id: number) => {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

return (
  <div className="container mx-auto px-4 py-16">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {genreCards.map((genre) => (
        <Card
          key={genre.id}
          className="
            bg-gray-900 
            border-none 
            overflow-hidden 
            cursor-pointer 
            aspect-square
            relative
            transition-transform 
            duration-300 
            hover:shadow-lg 
            hover:scale-[1.02]"
          onMouseEnter={() => handleMouseEnter(genre.id, genre.audio)}
          onMouseLeave={() => handleMouseLeave(genre.id)}
        >
          {/* Image fills the card */}
          <Image
            src={genre.image}
            alt={`${genre.title} Music`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized
            loading="lazy"
            priority={false}
          />

          {/* Mobile gradient (bottom to top) */}
          <div
            className="
              sm:hidden
              pointer-events-none 
              absolute 
              bottom-0 left-0 w-full h-24
              z-10
            "
            style={{
              background: `
                linear-gradient(
                  to top,
                  rgba(0, 0, 0, 0.85),
                  rgba(0, 0, 0, 0.6) 40%,
                  rgba(0, 0, 0, 0)
                )
              `,
            }}
          />

          {/* Desktop gradient (bottom-left to top-right) */}
          <div
            className="
              hidden sm:block
              pointer-events-none 
              absolute 
              bottom-0 left-0 w-2/5 h-2/5
              z-10
            "
            style={{
              background: `
                linear-gradient(
                  45deg,
                  rgba(0, 0, 0, 0.9) 0%,
                  rgba(0, 0, 0, 0.7) 10%,
                  rgba(0, 0, 0, 0.4) 30%,
                  rgba(0, 0, 0, 0) 50%
                )
              `,
            }}
          />

          {/* Genre label positioned over image */}
          <h3
            className="
              absolute 
              bottom-4 
              left-4
              sm:left-4 
              sm:bottom-4
              sm:text-left 
              text-white 
              text-2xl 
              font-bold
              pointer-events-none
              select-none
              z-20
            "
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
          >
            {genre.title}
          </h3>
        </Card>
      ))}
    </div>

    <div className="text-center mt-12">
     <p className="font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-b from-stone-300 via-stone-500 to-stone-700">Loading...</p></div>
  </div>
);
}