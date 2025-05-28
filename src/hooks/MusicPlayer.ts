import { useState, useRef, useEffect } from "react";
import { Genre, Song } from "../data/GenreData";

export default function MusicPlayer() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Track current song index
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
  const [shuffleQueue, setShuffleQueue] = useState<number[]>([]); // Track shuffle queue
  const [shuffleIndex, setShuffleIndex] = useState(0); // Track position in shuffle queue
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);


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

  
const handleGenreClick = (genre: Genre) => {
  console.log("Genre selected:", genre.name);
  setSelectedGenre(genre);
  setIsDialogOpen(true);

  // Stop current audio
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current = null;
  }

  // Reset all states
  setCurrentSong(null);
  setCurrentSongIndex(0);
  setIsPlaying(false);
  setCurrentTime(0);
  setDuration(0);
  setIsShuffle(false);
  setIsRepeat(false);
  setShuffleQueue([]);
  setShuffleIndex(0);
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

const createShuffleQueue = (currentIndex: number, totalSongs: number) => {
  const allIndices = Array.from({ length: totalSongs }, (_, i) => i);
  const otherIndices = allIndices.filter(i => i !== currentIndex);
  const shuffled = shuffleArray(otherIndices);
  setShuffleQueue(shuffled);
  setShuffleIndex(0);
};

const handleSongSelect = (song: Song) => {
  if (!selectedGenre) return;

  const songIndex = selectedGenre.songs.findIndex(s => s.id === song.id);
  if (songIndex === -1) return;

  // Clean up previous audio
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.removeEventListener("timeupdate", updateTime);
    audioRef.current.removeEventListener("loadedmetadata", setAudioDuration);
    audioRef.current.removeEventListener("ended", handleSongEnd);
    audioRef.current = null;
  }

  const audio = new Audio(song.audio);
  audio.volume = isMuted ? 0 : volume;
  audio.addEventListener("timeupdate", updateTime);
  audio.addEventListener("loadedmetadata", setAudioDuration);
  audio.addEventListener("ended", handleSongEnd);
  audioRef.current = audio;

  setCurrentSong(song);
  setCurrentSongIndex(songIndex);
  setIsPlaying(true);

  if (isShuffle && selectedGenre.songs.length > 1) {
    createShuffleQueue(songIndex, selectedGenre.songs.length);
  }

  setTimeout(() => {
    playerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 100);

  audio.play().catch((error) => {
    console.error("Error playing audio:", error);
    setIsPlaying(false);
  });
};

const handleSongEnd = () => {
  console.log("Song ended. Current:", currentSong?.title);

  if (!selectedGenre?.songs?.length || !currentSong) {
    setIsPlaying(false);
    return;
  }

  if (isRepeat) {
    console.log("Repeating song");
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
    return;
  }

  const nextIndex = getNextSongIndex();
  if (nextIndex !== null) {
    const nextSong = selectedGenre.songs[nextIndex];
    handleSongSelect(nextSong);
  } else {
    console.log("No next song available");
    setIsPlaying(false);
  }
};

// ONLY return next index. Song switching happens in handleSongEnd.
const getNextSongIndex = (): number | null => {
  if (!selectedGenre?.songs?.length) return null;

  const songs = selectedGenre.songs;

  if (isShuffle) {
    if (shuffleQueue.length === 0 || shuffleIndex >= shuffleQueue.length) {
      createShuffleQueue(currentSongIndex, songs.length);
      if (shuffleQueue.length === 0) return null;
      setShuffleIndex(1);
      return shuffleQueue[0];
    } else {
      const nextIndex = shuffleQueue[shuffleIndex];
      setShuffleIndex(shuffleIndex + 1);
      return nextIndex;
    }
  }

  if (currentSongIndex < songs.length - 1) {
    return currentSongIndex + 1;
  }

  return null; // End of playlist
};

const playNextSong = () => {
  if (!selectedGenre?.songs?.length || currentSongIndex === null) return;

  const nextIndex = currentSongIndex + 1;
  if (nextIndex < selectedGenre.songs.length) {
    const nextSong = selectedGenre.songs[nextIndex];
    handleSongSelect(nextSong);
  }
};

const playPreviousSong = () => {
  if (!selectedGenre?.songs?.length || currentSongIndex === null) return;

  const prevIndex = currentSongIndex - 1;
  if (prevIndex >= 0) {
    const prevSong = selectedGenre.songs[prevIndex];
    handleSongSelect(prevSong);
  }
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
    audioRef.current.play()
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
      setIsShuffle(false);
      setShuffleQueue([]);
      setShuffleIndex(0);
    }
    return newRepeat;
  });
};

const toggleShuffle = () => {
  if (!selectedGenre || selectedGenre.songs.length <= 1) return;

  setIsShuffle((prev) => {
    const newShuffle = !prev;
    if (newShuffle) {
      setIsRepeat(false);
      if (currentSong) {
        createShuffleQueue(currentSongIndex, selectedGenre.songs.length);
      }
    } else {
      setShuffleQueue([]);
      setShuffleIndex(0);
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
  }


  const togglePlayerExpanded = () => {
    setIsPlayerExpanded((prev) => !prev);
  }

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds === Infinity) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }


  const getGridColumns = () => {
    if (windowWidth >= 1436) return "grid-cols-4";
    if (windowWidth >= 1280) return "grid-cols-3";
    if (windowWidth >= 1024) return "grid-cols-3";
    if (windowWidth >= 768) return "grid-cols-2";
    return "grid-cols-1";
  };


   return {
    selectedGenre, setSelectedGenre,
    isDialogOpen, setIsDialogOpen,
    currentSong, setCurrentSong,
    currentSongIndex, setCurrentSongIndex,
    isPlaying, setIsPlaying,
    currentTime, setCurrentTime,
    duration, setDuration,
    volume, setVolume,
    isMuted, setIsMuted,
    isLiked, setIsLiked,
    isRepeat, setIsRepeat,
    isShuffle, setIsShuffle,
    isPlayerExpanded, setIsPlayerExpanded,
    windowWidth, setWindowWidth,
    shuffleQueue, setShuffleQueue,
    shuffleIndex, setShuffleIndex,
    audioRef, playerRef,
    handleGenreClick,
    updateTime,
    setAudioDuration,
    createShuffleQueue,
    handleSongSelect,
    handleSongEnd,
    getNextSongIndex,
    playNextSong,
    playPreviousSong,
    shuffleArray,
    togglePlayPause,
    toggleRepeat,
    toggleShuffle,
    handleTimeChange,
    handleVolumeChange,
    toggleMute,
    toggleLike,
    togglePlayerExpanded,
    formatTime,
    getGridColumns,
  };
}