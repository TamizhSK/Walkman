"use client";

import GenreScroll from "@/components/Genre";
import SongGrid from "@/components/Song";

export default function Library() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Background section with overlay and text */}
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025733/img3_vd7x1j.jpg')",
          height: "500px",
        }}
      >
        {/* Dark gradient from bottom only */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-black/100 via-black/60 to-transparent z-0" />

        {/* Centered content */}
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="max-w-6xl w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 sm:p-4 md:p-10 flex flex-col md:flex-row items-center gap-6">
            {/* Text Column */}
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold mb-4">Genres</h1>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                The evolution of music genres throughout history reflects the changes in
                society, culture, and technology, showcasing the dynamic nature of art.
                The fusion of different genres has created exciting new sounds and
                subgenres, such as jazz-funk, country-rock, and electro-pop, among others.
              </p>
            </div>

            {/* Genre Scroll */}
            <div className="md:w-1/2 flex justify-center items-center">
              <GenreScroll />
            </div>
          </div>
        </div>
      </div>

      {/* Song Card Grid */}
      <SongGrid />
    </div>
  );
}
