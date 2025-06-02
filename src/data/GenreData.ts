export type Song = {
  id: string | number;
  title: string;
  artist: string;
  audio: string;
  image?: string;
};

export type Genre = {
  id: string | number;
  name: string;
  description?: string;
  themeColor?: string;
  bannerImage?: string;
  songs: Song[];
};

export const genreData: Genre[] = [
  {
    id: 1,
    name: "Pop",
    description: "Chart-topping hits and catchy melodies",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882240/1_xqlkdw.jpg",
    themeColor: "from-pink-400 via-pink-500 to-pink-600",
    songs: [
      {
        id: 101,
        title: "A",
        artist: "Jessica Moore",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/1_ugmawr.png",
      },
      {
        id: 102,
        title: "B",
        artist: "The Popstars",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/1_ugmawr.png",
      },
      {
        id: 103,
        title: "C",
        artist: "Michael Stevens",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/1_ugmawr.png",
      },
            {
        id: 104,
        title: "D",
        artist: "Michael Stevens",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/1_ugmawr.png",
      },
            {
        id: 105,
        title: "E",
        artist: "Michael Stevens",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/1_ugmawr.png",
      },
            {
        id: 106,
        title: "F",
        artist: "Michael Stevens",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/1_ugmawr.png",
      },
            {
        id: 107,
        title: "G",
        artist: "Michael Stevens",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/1_ugmawr.png",
      },
      
    ],
  },
  {
    id: 2,
    name: "R&B",
    description: "Smooth vocals and groove-heavy rhythms",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882238/2_slekch.jpg",
    themeColor: "from-brown-400 via-orange-500 to-red-600",
    songs: [
      {
        id: 201,
        title: "Digital Dreams",
        artist: "Synthwave",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/2_jwf6qa.jpg",
      },
      {
        id: 202,
        title: "Neon Lights",
        artist: "Electro Beat",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/2_jwf6qa.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "Hip-Hop",
    description: "Urban beats with powerful lyrics",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882238/3_q5aiu7.jpg",
    themeColor: "from-zinc-400 via-slate-300 to-black-400",
    songs: [
      {
        id: 301,
        title: "Midnight Blues",
        artist: "Jazz Quartet",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504738/audio3_ic5drk.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025639/3_ap0tfa.jpg",
      },
      {
        id: 302,
        title: "Smooth Saxophone",
        artist: "Eddie Collins",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504738/audio3_ic5drk.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025639/3_ap0tfa.jpg",
      },
    ],
  },
  {
    id: 4,
    name: "Alternative R&B",
    description: "Atmospheric R&B with experimental sounds",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882237/4_eixeod.jpg",
    themeColor: "from-blue-800 via-pink-700 to-violet-900",
    songs: [
      {
        id: 401,
        title: "Urban Flow",
        artist: "MC Rhythm",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504633/audio4_ni7kzv.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025639/4_qp4f5s.jpg",
      },
      {
        id: 402,
        title: "Street Beats",
        artist: "Flow Masters",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504633/audio4_ni7kzv.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025639/4_qp4f5s.jpg",
      },
    ],
  },
  {
    id: 5,
    name: "Electronic",
    description: "Synth beats and digital soundscapes",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882258/5_dkknwd.jpg",
    themeColor: "from-green-800 via-cyan-700 to-blue-800",
    songs: [
      {
        id: 501,
        title: "Electric Thunder",
        artist: "Rock Giants",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504758/audio5_fwf5rp.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025640/5_fo6vg1.jpg",
      },
      {
        id: 502,
        title: "Guitar Legends",
        artist: "Metal Heads",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504758/audio5_fwf5rp.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025640/5_fo6vg1.jpg",
      },
    ],
  },
  {
    id: 6,
    name: "Rock",
    description: "Guitar-driven anthems with high energy",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882238/6_vz3wzd.jpg",
    themeColor: "from-red-900 via-orange-700 to-orange-200",
    songs: [
      {
        id: 601,
        title: "Chill Study Beats",
        artist: "Lo-Fi Producer",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504633/audio6_l3zfhr.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025641/6_gjaigz.jpg",
      },
      {
        id: 602,
        title: "Rainy Day",
        artist: "Mellow Tones",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504633/audio6_l3zfhr.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025641/6_gjaigz.jpg",
      },
    ],
  },
  {
    id: 7,
    name: "Indie",
    description: "Quirky, artistic pop with uniqueness",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882237/7_pfmpe5.jpg",
    themeColor: "from-emerald-400 via-blue-700 to-red-400",
    songs: [
      {
        id: 701,
        title: "Symphony No. 9",
        artist: "Orchestra Ensemble",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
      },
      {
        id: 702,
        title: "Piano Concerto",
        artist: "Classical Masters",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
      },
    ],
  },
  {
    id: 8,
    name: "Country",
    description: "Heartland storytelling with pop",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882238/8_hingqx.jpg",
    themeColor: "from-amber-500 via-yellow-500 to-orange-900",
    songs: [
      {
        id: 801,
        title: "Smooth Love",
        artist: "R&B Sensation",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
      {
        id: 802,
        title: "Groove Tonight",
        artist: "Soulful Artist",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
    ],
  },

    {
    id: 9,
    name: "Reggaeton",
    description: "Latin beats blended with modernism",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882237/9_wucilq.jpg",
    themeColor: "from-emerald-500 via-yellow-500 to-green-300",
    songs: [
      {
        id: 801,
        title: "Smooth Love",
        artist: "R&B Sensation",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
      {
        id: 802,
        title: "Groove Tonight",
        artist: "Soulful Artist",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
    ],
  },

    {
    id: 10,
    name: "Jazz",
    description: "Smooth improvisation with contemporary flair",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882236/10_vuicwt.jpg",
    themeColor: "from-red-500 via-yellow-500 to-purple-600",
    songs: [
      {
        id: 801,
        title: "Smooth Love",
        artist: "R&B Sensation",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
      {
        id: 802,
        title: "Groove Tonight",
        artist: "Soulful Artist",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
    ],
  },

    {
    id: 11,
    name: "Lo-Fi",
    description: "Ambient, mellow tones for relaxation",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882247/11_rozhlt.png",
    themeColor: "from-rose-500 via-indigo-500 to-pink-500",
    songs: [
      {
        id: 801,
        title: "Smooth Love",
        artist: "R&B Sensation",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
      {
        id: 802,
        title: "Groove Tonight",
        artist: "Soulful Artist",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
    ],
  },

    {
    id: 12,
    name: "Funk",
    description: "Groovy rhythms with retro throwbacks",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/v1748882237/12_fytawc.jpg",
    themeColor: "from-red-500 via-pink-600 to-violet-500",
    songs: [
      {
        id: 801,
        title: "Smooth Love",
        artist: "R&B Sensation",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504754/audio2_dmbaxy.mp3",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      },
    ],
  },
];