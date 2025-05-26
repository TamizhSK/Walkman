"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward, 
  Heart, 
  Repeat, 
  Shuffle,
  ChevronUp,
  Clock
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DialogDescription } from "@radix-ui/react-dialog";

type Song = {
  id: string | number;
  title: string;
  artist: string;
  audio: string;
  image?: string;
};

type Genre = {
  id: string | number;
  name: string;
  description?: string;
  themeColor?: string;
  bannerImage?: string;
  songs: Song[];
};

export default function MusicGenreHub() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
const shuffleQueueRef = useRef<number[]>([]);
const currentShuffleIndexRef = useRef<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  

  const genreData: Genre[] = [
  {
    id: 1,
    name: "Pop",
    description: "Chart-topping hits and catchy melodies",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_800/v1747025638/1_ugmawr.png",
    themeColor: "from-pink-400 via-pink-500 to-pink-600",
    songs: [
      {
        id: 101,
        title: "Summer Feeling",
        artist: "Jessica Moore",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/1_ugmawr.png",
      },
      {
        id: 102,
        title: "Dance With Me",
        artist: "The Popstars",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/1_ugmawr.png",
      },
      {
        id: 103,
        title: "Heartbeat",
        artist: "Michael Stevens",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/1_ugmawr.png",
      },
            {
        id: 104,
        title: "Heartbeat",
        artist: "Michael Stevens",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/1_ugmawr.png",
      },
            {
        id: 105,
        title: "Heartbeat",
        artist: "Michael Stevens",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/1_ugmawr.png",
      },
            {
        id: 106,
        title: "Heartbeat",
        artist: "Michael Stevens",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/1_ugmawr.png",
      },
            {
        id: 107,
        title: "Heartbeat",
        artist: "Michael Stevens",
        audio: "https://res.cloudinary.com/dqcf0a6dk/video/upload/v1747504747/audio1_npwjvo.mp3",
        image: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_300/v1747025638/1_ugmawr.png",
      },
      
    ],
  },
  {
    id: 2,
    name: "Electronic",
    description: "Synthesized beats and digital soundscapes",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_800/v1747025638/2_jwf6qa.jpg",
    themeColor: "from-cyan-400 via-blue-500 to-purple-600",
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
    name: "Jazz",
    description: "Smooth improvisation and soulful rhythms",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_800/v1747025639/3_ap0tfa.jpg",
    themeColor: "from-yellow-200 via-amber-300 to-orange-400",
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
    name: "Hip-Hop",
    description: "Urban beats and powerful lyrics",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_800/v1747025639/4_qp4f5s.jpg",
    themeColor: "from-zinc-800 via-gray-700 to-black",
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
    name: "Hard Rock",
    description: "Heavy guitars and powerful drums",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_800/v1747025640/5_fo6vg1.jpg",
    themeColor: "from-red-700 via-orange-800 to-yellow-600",
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
    name: "Lo-Fi",
    description: "Chill vibes and relaxing atmospheres",
    bannerImage: "https://res.cloudinary.com/dqcf0a6dk/image/upload/q_auto,f_auto,w_800/v1747025641/6_gjaigz.jpg",
    themeColor: "from-purple-200 via-indigo-300 to-indigo-400",
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
    name: "Classical",
    description: "Timeless orchestral masterpieces",
    bannerImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop&crop=center",
    themeColor: "from-amber-100 via-yellow-200 to-white",
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
    name: "R&B",
    description: "Smooth vocals and groove-heavy rhythms",
    bannerImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
    themeColor: "from-rose-500 via-fuchsia-500 to-pink-500",
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
    name: "R&B",
    description: "Smooth vocals and groove-heavy rhythms",
    bannerImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
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
    name: "R&B",
    description: "Smooth vocals and groove-heavy rhythms",
    bannerImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
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
    name: "R&B",
    description: "Smooth vocals and groove-heavy rhythms",
    bannerImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
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
    name: "R&B",
    description: "Smooth vocals and groove-heavy rhythms",
    bannerImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
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
];


const handleGenreClick = (genre: Genre) => {
  setSelectedGenre(genre);
  setIsDialogOpen(true);

  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current = null;
  }
  setCurrentSong(null);
  setIsPlaying(false);
  setCurrentTime(0);
  setDuration(0);
  
  // Reset shuffle and repeat states when switching genres
  setIsShuffle(false);
  setIsRepeat(false);
  shuffleQueueRef.current = [];
  currentShuffleIndexRef.current = 0;
};

const updateTime = () => {
  if (audioRef.current) {
    setCurrentTime(audioRef.current.currentTime);
  }
};

const setAudioDuration = () => {
  if (audioRef.current) {
    setDuration(audioRef.current.duration);
  }
};

const handleSongEnd = () => {
  if (!currentSong || !selectedGenre) return;

  const songs = selectedGenre.songs;

  // REPEAT LOGIC - highest priority
  if (isRepeat) {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error("Error replaying audio:", error);
        setIsPlaying(false);
      });
      return;
    }
  }

  // If only one song and no repeat, stop playing
  if (songs.length === 1) {
    setIsPlaying(false);
    return;
  }

  // SHUFFLE LOGIC - only if shuffle is enabled and more than 1 song
  if (isShuffle && songs.length > 1) {
    if (
      shuffleQueueRef.current.length === 0 ||
      currentShuffleIndexRef.current >= shuffleQueueRef.current.length
    ) {
      createShuffleQueue(currentSong.id);
    }

    const nextIndex = shuffleQueueRef.current[currentShuffleIndexRef.current];
    currentShuffleIndexRef.current++;

    const nextSong = songs[nextIndex];
    handleSongSelect(nextSong);
    return;
  }

  // SEQUENTIAL FALLBACK - only if more than 1 song
  if (songs.length > 1) {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    handleSongSelect(songs[nextIndex]);
  } else {
    setIsPlaying(false);
  }
};


const handleSongSelect = (song: Song) => {
  // Clean up previous audio
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.removeEventListener("timeupdate", updateTime);
    audioRef.current.removeEventListener("loadedmetadata", setAudioDuration);
    audioRef.current.removeEventListener("ended", handleSongEnd);
    audioRef.current = null;
  }

  // Create new audio instance
  const audio = new Audio(song.audio);
  audio.volume = isMuted ? 0 : volume;
  audio.addEventListener("timeupdate", updateTime);
  audio.addEventListener("loadedmetadata", setAudioDuration);
  audio.addEventListener("ended", handleSongEnd);

  audioRef.current = audio;
  setCurrentSong(song);
  setIsPlaying(true);
  
  // Initialize shuffle queue only if shuffle is enabled and we have multiple songs
  if (isShuffle && selectedGenre && selectedGenre.songs.length > 1) {
    createShuffleQueue(song.id);
  }
  
  audio.play().catch((error) => {
    console.error("Error playing audio:", error);
    setIsPlaying(false);
  });
};

//helper function
const createShuffleQueue = (currentSongId: string | number) => {
  if (!selectedGenre) return;

  const songs = selectedGenre.songs;
  const currentIndex = songs.findIndex(s => s.id === currentSongId);

  if (currentIndex !== -1) {
    const otherIndices = songs.map((_, i) => i).filter(i => i !== currentIndex);
    shuffleQueueRef.current = shuffleArray(otherIndices);
    currentShuffleIndexRef.current = 0;
  }
};


const playNextSong = () => {
  if (!selectedGenre || !currentSong) return;

  const songs = selectedGenre.songs;
  
  // If only one song, handle repeat or restart
  if (songs.length === 1) {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      }
    } else {
      // Just restart the song without repeat
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        if (!isPlaying) {
          audioRef.current.play().catch((error) => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
          });
          setIsPlaying(true);
        }
      }
    }
    return;
  }

  const currentIndex = songs.findIndex(song => song.id === currentSong.id);
  if (currentIndex === -1) return;

  let nextIndex: number;

  // SHUFFLE LOGIC - only if enabled
  if (isShuffle) {
    // Check if we need to create/recreate shuffle queue
    if (shuffleQueueRef.current.length === 0 || 
        currentShuffleIndexRef.current >= shuffleQueueRef.current.length) {
      createShuffleQueue(currentSong.id);
    }
    
    // Get next song from shuffle queue
    nextIndex = shuffleQueueRef.current[currentShuffleIndexRef.current];
    currentShuffleIndexRef.current++;
  } else {
    // SEQUENTIAL MODE
    nextIndex = (currentIndex + 1) % songs.length;
  }

  const nextSong = songs[nextIndex];
  handleSongSelect(nextSong);
};

const playPreviousSong = () => {
  if (!selectedGenre || !currentSong) return;

  const songs = selectedGenre.songs;
  
  // If only one song, just restart it
  if (songs.length === 1) {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (!isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }
    return;
  }

  const currentIndex = songs.findIndex(song => song.id === currentSong.id);
  if (currentIndex === -1) return;

  let prevIndex: number;

  // SHUFFLE LOGIC - only if enabled
  if (isShuffle) {
    // Pick a random previous song (not current)
    const otherIndices = songs.map((_, i) => i).filter(i => i !== currentIndex);
    const randomIndex = Math.floor(Math.random() * otherIndices.length);
    prevIndex = otherIndices[randomIndex];
    
    // Recreate shuffle queue for the new current song
    createShuffleQueue(songs[prevIndex].id);
  } else {
    // SEQUENTIAL MODE
    prevIndex = (currentIndex - 1 + songs.length) % songs.length;
  }

  const prevSong = songs[prevIndex];
  handleSongSelect(prevSong);
};

const shuffleArray = (array: number[]): number[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const togglePlayPause = () => {
  if (!audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
  } else {
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
  }
};

const toggleRepeat = () => {
  setIsRepeat((prev) => {
    const newRepeat = !prev;
    if (newRepeat) {
      // When enabling repeat, disable shuffle and clear shuffle queue
      setIsShuffle(false);
      shuffleQueueRef.current = [];
      currentShuffleIndexRef.current = 0;
    }
    return newRepeat;
  });
};

const toggleShuffle = () => {
  // Disable shuffle if there's only one song or no genre selected
  if (!selectedGenre || selectedGenre.songs.length <= 1) return;

  setIsShuffle((prev) => {
    const newShuffle = !prev;
    if (newShuffle) {
      // When enabling shuffle, disable repeat
      setIsRepeat(false);
      // Create shuffle queue for current song if one is playing
      if (currentSong) {
        createShuffleQueue(currentSong.id);
      }
    } else {
      // When disabling shuffle, clear the queue
      shuffleQueueRef.current = [];
      currentShuffleIndexRef.current = 0;
    }
    return newShuffle;
  });
};


const handleTimeChange = (value: number | number[]) => {
  const newTime = Array.isArray(value) ? value[0] : value;
  if (audioRef.current) {
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }
};

const handleVolumeChange = (value: number | number[]) => {
  const newVolume = Array.isArray(value) ? value[0] : value;
  setVolume(newVolume);
  if (audioRef.current) {
    audioRef.current.volume = isMuted ? 0 : newVolume;
  }
};

const toggleMute = () => {
  if (!audioRef.current) return;

  const newMuteState = !isMuted;
  audioRef.current.volume = newMuteState ? 0 : volume;
  setIsMuted(newMuteState);
};

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };


  const togglePlayerExpanded = () => {
    setIsPlayerExpanded((prev) => !prev);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds === Infinity) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


  const getGridColumns = () => {
    if (windowWidth >= 1436) return "grid-cols-4";
    if (windowWidth >= 1280) return "grid-cols-3";
    if (windowWidth >= 1024) return "grid-cols-3";
    if (windowWidth >= 768) return "grid-cols-2";
    return "grid-cols-1";
  };

return (
  <div className="p-10 sm:p-30 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen text-white">
    {/* Genre Banners */}
    <div className={`grid ${getGridColumns()} gap-3 sm:gap-6 transition-all duration-300`}>
      {genreData.map((genre) => (
        <motion.div
          key={genre.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleGenreClick(genre)}
          className={`rounded-xl sm:rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br ${genre.themeColor} cursor-pointer transition hover:shadow-2xl`}
        >
          <div className="relative w-full h-32 sm:h-48">
            <img
              src={genre.bannerImage}
              alt={genre.name}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="absolute bottom-0 p-2 sm:p-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-white drop-shadow-sm">{genre.name}</h3>
              <p className="hidden md:block text-xs sm:text-sm text-gray-300 mt-1 line-clamp-2 drop-shadow-sm">{genre.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Dialog for Song List and Player */}
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        setIsDialogOpen(isOpen);
        if (!isOpen && audioRef.current && isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }}
    >

      <DialogContent className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl sm:rounded-2xl max-w-xs sm:max-w-4xl mx-2 sm:mx-auto max-h-[90vh] overflow-y-auto  overflow-x-hidden custom-scrollbar">
        <DialogHeader className="px-2 sm:px-0">
          <DialogTitle className="text-white text-lg sm:text-xl font-bold">{selectedGenre?.name}</DialogTitle>
          <DialogDescription className="text-gray-300 text-sm">{selectedGenre?.description}</DialogDescription>
        </DialogHeader>
        
        {/* Songs List - Mobile Optimized */}
        <div className="my-2 sm:my-4 px-2 sm:px-0">
          <h4 className="text-base sm:text-lg text-white font-semibold mb-2 px-1">Songs</h4>
            <div className="border border-white/10 rounded-lg sm:rounded-xl overflow-y-auto custom-scrollbar1 overflow-x-hidden h-[200px] sm:h-[300px] lg:h-[400px]">
            {selectedGenre?.songs.map((song, index) => (
              <div key={song.id}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSongSelect(song)}
                  className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 py-2 sm:py-3 bg-white/5 hover:bg-white/10 transition cursor-pointer"
                >
                  <span className="text-xs sm:text-sm text-gray-400 w-3 sm:w-5">{index + 1}</span>
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-8 h-8 sm:w-12 sm:h-12 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white truncate font-medium text-sm sm:text-base">{song.title}</p>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">{song.artist}</p>
                  </div>
                </motion.div>
                {index < selectedGenre.songs.length - 1 && <Separator className="bg-white/10" />}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Music Player */}
        {currentSong && (
          <Card className="mt-3 sm:mt-6 mx-2 sm:mx-0 bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
            <CardContent className="p-2 sm:p-4">
            {/* Expanded Player View */}
            {isPlayerExpanded ? (
              <div className="space-y-4 sm:space-y-6 flex flex-col items-center text-center">
                {/* Song Info */}
                <div className="flex flex-col items-center gap-4 sm:gap-6">
                  <img
                    src={currentSong.image}
                    className="sm:w-38 sm:h-38 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-lg object-cover"
                    alt={currentSong.title}
                  />
                  <div>
                    <div className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                      {currentSong.title}
                    </div>
                    <div className="text-base sm:text-xl text-gray-300 mb-2 sm:mb-4">
                      {currentSong.artist}
                    </div>
                    <div className="text-sm sm:text-base text-gray-400">
                      {selectedGenre?.name}
                    </div>
                  </div>
                </div>

                  {/* Progress Bar */}
                  <div className="w-full flex flex-col items-center">
                    <div className="flex items-center w-full max-w-md gap-2 sm:gap-4 text-sm text-gray-400">
                      <span className="w-12 text-right">{formatTime(currentTime)}</span>
                      <Slider
                        value={[currentTime]}
                        max={duration}
                        step={1}
                        onValueChange={handleTimeChange}
                        className="flex-1"
                      />
                      <span className="w-12">{formatTime(duration)}</span>
                    </div>
                  </div>

                    {/* Control Buttons - Responsive */}
                    <div className="flex justify-center items-center gap-2 sm:gap-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={toggleShuffle}
                              disabled={!selectedGenre || selectedGenre.songs.length <= 1}
                              className={`${
                                (!selectedGenre || selectedGenre.songs.length <= 1) 
                                  ? 'text-gray-600 cursor-not-allowed opacity-50' 
                                  : isShuffle 
                                    ? 'text-green-400 bg-green-400/20' 
                                    : 'text-gray-400'
                              } hover:text-black transition-colors w-8 h-8 sm:w-10 sm:h-10`}
                            >
                              <Shuffle size={16} className="sm:w-5 sm:h-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {(!selectedGenre || selectedGenre.songs.length <= 1) 
                              ? 'Shuffle disabled (need 2+ songs)' 
                              : isShuffle 
                                ? 'Disable Shuffle' 
                                : 'Enable Shuffle'}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={playPreviousSong} 
                              className="w-8 h-8 sm:w-10 sm:h-10"
                            >
                              <SkipBack size={18} className="sm:w-6 sm:h-6" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Previous</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <Button
                        variant="default"
                        size="icon"
                        onClick={togglePlayPause}
                        className="bg-white text-black hover:bg-gray-200 w-10 h-10 sm:w-14 sm:h-14"
                      >
                        {isPlaying ? <Pause size={20} className="sm:w-7 sm:h-7" /> : <Play size={20} className="sm:w-7 sm:h-7" />}
                      </Button>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={playNextSong} 
                              className="w-8 h-8 sm:w-10 sm:h-10"
                            >
                              <SkipForward size={18} className="sm:w-6 sm:h-6" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Next</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={toggleRepeat}
                              className={`${isRepeat ? 'text-green-400 bg-green-400/20' : 'text-gray-400'} hover:text-black transition-colors w-8 h-8 sm:w-10 sm:h-10`}
                            >
                              <Repeat size={16} className="sm:w-5 sm:h-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {isRepeat ? 'Disable Repeat' : 'Enable Repeat'}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    {/* Secondary Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={toggleLike}
                          className={`${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-400 transition-colors w-8 h-8 sm:w-10 sm:h-10`}
                        >
                          <Heart size={16} className={`sm:w-5 sm:h-5 ${isLiked ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={toggleMute} className="w-8 h-8 sm:w-10 sm:h-10">
                          {isMuted ? <VolumeX size={16} className="sm:w-5 sm:h-5" /> : <Volume2 size={16} className="sm:w-5 sm:h-5" />}
                        </Button>
                        <Slider
                          value={[isMuted ? 0 : volume]}
                          max={1}
                          step={0.01}
                          onValueChange={handleVolumeChange}
                          className="w-16 sm:w-24 md:w-32"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Compact Player View - Mobile Optimized
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <img
                        src={currentSong.image}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-md sm:rounded-lg object-cover flex-shrink-0"
                        alt={currentSong.title}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm sm:text-lg font-bold text-white truncate">{currentSong.title}</div>
                        <div className="text-xs sm:text-sm text-gray-300 truncate">{currentSong.artist}</div>
                      </div>

                      {/* Desktop Controls */}
                      <div className="hidden sm:flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={toggleShuffle}
                                disabled={!selectedGenre || selectedGenre.songs.length <= 1}
                                className={`${
                                  (!selectedGenre || selectedGenre.songs.length <= 1)
                                    ? 'text-gray-600 cursor-not-allowed opacity-50'
                                    : isShuffle 
                                      ? 'text-green-400 bg-green-400/20' 
                                      : 'text-gray-400'
                                } hover:text-black transition-colors`}
                              >
                                <Shuffle size={16} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {(!selectedGenre || selectedGenre.songs.length <= 1) 
                                ? 'Shuffle disabled (need 2+ songs)' 
                                : isShuffle ? 'Disable Shuffle' : 'Enable Shuffle'}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={playPreviousSong}>
                                <SkipBack size={18} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Previous</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <Button
                          variant="default"
                          size="icon"
                          onClick={togglePlayPause}
                          className="bg-white text-black hover:bg-gray-200"
                        >
                          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                        </Button>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={playNextSong}>
                                <SkipForward size={18} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Next</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={toggleRepeat}
                                className={`${isRepeat ? 'text-green-400 bg-green-400/20' : 'text-gray-400'} hover:text-black transition-colors`}
                              >
                                <Repeat size={16} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {isRepeat ? 'Disable Repeat' : 'Enable Repeat'}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      {/* Mobile Play Button Only */}
                      <div className="flex sm:hidden">
                        <Button
                          variant="default"
                          size="icon"
                          onClick={togglePlayPause}
                          className="bg-white text-black hover:bg-gray-200 w-10 h-10"
                        >
                          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                      <span className="text-xs w-8 sm:w-10 text-right">{formatTime(currentTime)}</span>
                      <Slider
                        value={[currentTime]}
                        max={duration}
                        step={1}
                        onValueChange={handleTimeChange}
                        className="flex-1"
                      />
                      <span className="text-xs w-8 sm:w-10">{formatTime(duration)}</span>
                    </div>

                    {/* Mobile Controls Row */}
                    <div className="flex sm:hidden justify-center items-center gap-3">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={playPreviousSong}
                        className="w-8 h-8"
                      >
                        <SkipBack size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={toggleShuffle}
                        disabled={!selectedGenre || selectedGenre.songs.length <= 1}
                        className={`${
                          (!selectedGenre || selectedGenre.songs.length <= 1)
                            ? 'text-gray-600 cursor-not-allowed opacity-50'
                            : isShuffle 
                              ? 'text-green-400 bg-green-400/20' 
                              : 'text-gray-400'
                        } w-8 h-8`}
                      >
                        <Shuffle size={14} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={toggleRepeat}
                        className={`${isRepeat ? 'text-green-400 bg-green-400/20' : 'text-gray-400'} w-8 h-8`}
                      >
                        <Repeat size={14} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={toggleLike}
                        className={`${isLiked ? 'text-red-500' : 'text-gray-400'} w-8 h-8`}
                      >
                        <Heart size={14} className={isLiked ? 'fill-current' : ''} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={toggleLike}
                        className={`${isLiked ? 'text-red-500' : 'text-gray-400'} w-8 h-8`}
                      >
                        <Heart size={14} className={isLiked ? 'fill-current' : ''} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={playNextSong}
                        className="w-8 h-8"
                      >
                        <SkipForward size={16} />
                      </Button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex justify-center sm:justify-end items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={toggleMute} className="w-8 h-8">
                        {isMuted ? <VolumeX size={14} className="sm:w-4 sm:h-4" /> : <Volume2 size={14} className="sm:w-4 sm:h-4" />}
                      </Button>
                      <Slider
                        value={[isMuted ? 0 : volume]}
                        max={1}
                        step={0.01}
                        onValueChange={handleVolumeChange}
                        className="w-16 sm:w-24"
                      />
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>
        )}

        {/* Enhanced Expand/Collapse Toggle Button */}
        <div className="flex justify-center mt-2 sm:mt-4 pb-2">
          <Button
            variant="ghost"
            onClick={togglePlayerExpanded}
            className="text-white hover:text-gray-200 flex items-center gap-2 text-sm sm:text-base px-3 py-2"
          >
            <ChevronUp 
              className={`transition-transform duration-200 ${isPlayerExpanded ? 'rotate-180' : ''}`} 
              size={14} 
            />
            <span className="hidden sm:inline">
              {isPlayerExpanded ? "Collapse Player" : "Expand Player"}
            </span>
            <span className="sm:hidden">
              {isPlayerExpanded ? "Less" : "More"}
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
);
}