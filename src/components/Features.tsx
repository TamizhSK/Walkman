"use client";
import Image from 'next/image';

export default function Features() {
  return (
    <section className="py-12 md:py-14 lg:py-16 bg-black text-white">
      <div className="px-8 md:px-8">
        <div className="max-w-6xl mx-auto rounded-xl bg-white/5 border border-white/40 backdrop-blur-lg shadow-xl p-8 md:p-12 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Image Section */}
            <div className="md:w-1/2 w-full">
              <div className="w-full aspect-[3/2] relative overflow-hidden rounded-2xl">
                <Image
                  src="https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025585/img2_a5k4s1.jpg"
                  alt="Walkman device"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                  quality={90}
                  unoptimized
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 w-full lg:h-full">
              <p className="text-md text-justify md:text-xl md:text-justify-center lg:text-2xl leading-relaxed">
                The Sony Walkman revolutionized the way people enjoyed music on-the-go.
                With its sleek design and compact size, music lovers could carry their entire
                music library in their pocket!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
