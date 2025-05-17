"use client";
import Image from 'next/image';

export default function AlbumMarquee() {
  
  const albums = [
    { id: 1, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025687/6_zp76ek.jpg', alt: 'Album cover' },
    { id: 2, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025683/1_ooszgw.jpg', alt: 'Album cover' },
    { id: 3, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025683/2_gasv2h.jpg', alt: 'Album cover' },
    { id: 4, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025684/3_wo3ima.jpg', alt: 'Album cover' },
    { id: 5, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025686/5_ginrq3.jpg', alt: 'Album cover' },
    { id: 6, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025685/4_urh12d.jpg', alt: 'Album cover' },
  ];
  
  const albums2 = [
    { id: 7, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025688/7_rgvkjz.jpg', alt: 'Album cover' },
    { id: 8, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025691/10_wie70b.jpg', alt: 'Album cover' },
    { id: 9, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025689/8_ja3yre.jpg', alt: 'Album cover' },
    { id: 10, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025692/11_ciisl1.jpg', alt: 'Album cover' },
    { id: 11, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025690/9_wxmauy.jpg', alt: 'Album cover' },
    { id: 12, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025694/12_vg1hbi.jpg', alt: 'Album cover' },
  ];
  
  const albums3 = [
    { id: 13, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025696/14_hbruzf.jpg', alt: 'Album cover' },
    { id: 14, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025703/18_orsuzc.jpg', alt: 'Album cover' },
    { id: 15, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025698/15_plfqsy.jpg', alt: 'Album cover' },
    { id: 16, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025695/13_l3irc4.jpg', alt: 'Album cover' },
    { id: 17, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025699/16_kywpu6.jpg', alt: 'Album cover' },
    { id: 18, src: 'https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025702/17_xaf2ya.jpg', alt: 'Album cover' },
  ];

 return (
    <div className="overflow-hidden bg-black py-8 min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-3 gap-8 max-w-screen-xl w-full px-6">
        
        {/* Column 1 - Scrolling down */}
        <div className="relative overflow-hidden h-screen">
          {/* Top gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
          
          <div className="flex justify-center w-full h-full">
            <div className="animate-marquee-down w-full">
              <div className="flex flex-col gap-6 items-center">
                {[...albums, ...albums].map((album, index) => (
                  <div key={`${album.id}-${index}`} className="aspect-square w-4/5 rounded-lg overflow-hidden">
                    <Image 
                      src={album.src} 
                      alt={album.alt} 
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>  
            </div>
          </div>
          
          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
        </div>

        {/* Column 2 - Scrolling up */}
        <div className="relative overflow-hidden h-screen">
          {/* Top gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
          
          <div className="flex justify-center w-full h-full">
            <div className="animate-marquee-up w-full">
              <div className="flex flex-col gap-6 items-center">
                {[...albums2, ...albums2].map((album, index) => (
                  <div key={`${album.id}-${index}`} className="aspect-square w-4/5 rounded-lg overflow-hidden">
                    <Image 
                      src={album.src} 
                      alt={album.alt} 
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
        </div>

        {/* Column 3 - Scrolling down */}
        <div className="relative overflow-hidden h-screen">
          {/* Top gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
          
          <div className="flex justify-center w-full h-full">
            <div className="animate-marquee-down w-full">
              <div className="flex flex-col gap-6 items-center">
                {[...albums3, ...albums3].map((album, index) => (
                  <div key={`${album.id}-${index}`} className="aspect-square w-4/5 rounded-lg overflow-hidden">
                    <Image 
                      src={album.src} 
                      alt={album.alt} 
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
        </div>
      </div>
    </div>
  );
}