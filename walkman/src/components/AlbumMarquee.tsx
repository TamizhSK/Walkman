// components/AlbumMarquee.tsx
"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AlbumMarquee() {
  // You'll need to set up actual image paths when you add them to your public folder
  const albums = [
    { id: 1, src: '/slider/1.jpg', alt: 'Album cover' },
    { id: 2, src: '/slider/2.jpg', alt: 'Album cover' },
    { id: 3, src: '/slider/3.jpg', alt: 'Album cover' },
    { id: 4, src: '/slider/4.jpg', alt: 'Album cover' },
    { id: 5, src: '/slider/5.jpg', alt: 'Album cover' },
    { id: 6, src: '/slider/6.jpg', alt: 'Album cover' },
  ];
  
  const albums2 = [
    { id: 7, src: '/slider/7.jpg', alt: 'Album cover' },
    { id: 8, src: '/slider/8.jpg', alt: 'Album cover' },
    { id: 9, src: '/slider/9.jpg', alt: 'Album cover' },
    { id: 10, src: '/slider/10.jpg', alt: 'Album cover' },
    { id: 11, src: '/slider/11.jpg', alt: 'Album cover' },
    { id: 12, src: '/slider/12.jpg', alt: 'Album cover' },
  ];
  
  const albums3 = [
    { id: 13, src: '/slider/13.jpeg', alt: 'Album cover' },
    { id: 14, src: '/slider/14.jpg', alt: 'Album cover' },
    { id: 15, src: '/slider/15.jpg', alt: 'Album cover' },
    { id: 16, src: '/slider/16.jpg', alt: 'Album cover' },
    { id: 17, src: '/slider/17.jpg', alt: 'Album cover' },
    { id: 18, src: '/slider/18.jpg', alt: 'Album cover' },
  ];

  return (
    <div className="overflow-hidden bg-black py-8">
      <div className="grid grid-cols-3 gap-2">
        {/* Column 1 - Scrolling down */}
        <div className="overflow-hidden">
          <div className="animate-marquee-down">
            <div className="flex flex-col gap-4">
              {[...albums, ...albums].map((album, index) => (
                <div key={`${album.id}-${index}`} className="h-48 w-full rounded-lg overflow-hidden">
                  <Image 
                    src={album.src} 
                    alt={album.alt} 
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2 - Scrolling up */}
        <div className="overflow-hidden">
          <div className="animate-marquee-up">
            <div className="flex flex-col gap-4">
              {[...albums2, ...albums2].map((album, index) => (
                <div key={`${album.id}-${index}`} className="h-48 w-full rounded-lg overflow-hidden">
                  <Image 
                    src={album.src} 
                    alt={album.alt} 
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3 - Scrolling down */}
        <div className="overflow-hidden">
          <div className="animate-marquee-down">
            <div className="flex flex-col gap-4">
              {[...albums3, ...albums3].map((album, index) => (
                <div key={`${album.id}-${index}`} className="h-48 w-full rounded-lg overflow-hidden">
                  <Image 
                    src={album.src} 
                    alt={album.alt} 
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}