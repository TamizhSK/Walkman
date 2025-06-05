import { useState, useRef, useEffect } from "react";
import { Genre, Song } from "../data/GenreData";

export default function MusicPlayer() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);
  
  // Refs to store current state for event handlers (to avoid stale closures)
  const stateRef = useRef({
    isRepeat: false,
    isShuffle: false,
    currentSongIndex: 0,
    selectedGenre: null as Genre | null
  });

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update refs whenever state changes
  useEffect(() => {
    stateRef.current = {
      isRepeat,
      isShuffle,
      currentSongIndex,
      selectedGenre
    };
  }, [isRepeat, isShuffle, currentSongIndex, selectedGenre]);

  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, []);

  const cleanupAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeEventListener("timeupdate", updateTime);
      audioRef.current.removeEventListener("loadedmetadata", setAudioDuration);
      audioRef.current.removeEventListener("ended", handleSongEnd);
      audioRef.current = null;
    }
  };

  const handleGenreClick = (genre: Genre) => {
    console.log("Genre selected:", genre.name);
    setSelectedGenre(genre);
    setIsDialogOpen(true);
    resetPlayerState();
  };

  const resetPlayerState = () => {
    cleanupAudio();
    setCurrentSong(null);
    setCurrentSongIndex(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsShuffle(false);
    setIsRepeat(false);
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
    // Get current state values from refs to avoid stale closures
    const { isRepeat: currentRepeat, isShuffle: currentShuffle, currentSongIndex: currentIndex, selectedGenre: currentGenre } = stateRef.current;
    
    console.log("Song ended, repeat:", currentRepeat, "shuffle:", currentShuffle, "currentIndex:", currentIndex);
    
    if (currentRepeat) {
      // Repeat current song - restart from beginning
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.error);
      }
      return;
    }
    
    // Move to next song or stop if at end
    if (!currentGenre?.songs?.length) return;
    
    let nextIndex;
    if (currentShuffle) {
      nextIndex = getRandomSongIndex();
    } else {
      nextIndex = currentIndex + 1;
      // Stop playing if we've reached the end
      if (nextIndex >= currentGenre.songs.length) {
        console.log("Playlist ended, stopping playback");
        setIsPlaying(false);
        return;
      }
    }
    
    // Use a slight delay to ensure state is consistent
    setTimeout(() => {
      playSongAtIndex(nextIndex);
    }, 100);
  };

  const getRandomSongIndex = (): number => {
    const { selectedGenre: currentGenre, currentSongIndex: currentIndex } = stateRef.current;
    if (!currentGenre || currentGenre.songs.length <= 1) return 0;
    
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * currentGenre.songs.length);
    } while (newIndex === currentIndex && currentGenre.songs.length > 1);
    
    return newIndex;
  };

  const playSongAtIndex = (index: number) => {
    if (!selectedGenre?.songs?.[index]) return;
    
    const song = selectedGenre.songs[index];
    
    // Clean up existing audio first
    cleanupAudio();

    // Create new audio element
    const audio = new Audio(song.audio);
    audio.volume = isMuted ? 0 : volume;
    
    // Add event listeners
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("ended", handleSongEnd);
    
    audioRef.current = audio;

    // Update state
    setCurrentSong(song);
    setCurrentSongIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);

    // Scroll to player if first song
    if (!currentSong) {
      setTimeout(() => {
        playerRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }

    // Play audio
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    });
  };

  const handleSongSelect = (song: Song) => {
    if (!selectedGenre) return;

    const songIndex = selectedGenre.songs.findIndex(s => s.id === song.id);
    if (songIndex === -1) return;

    playSongAtIndex(songIndex);
  };

  const goToNextSong = () => {
    if (!selectedGenre?.songs?.length) return;
    
    let nextIndex;
    if (isShuffle) {
      nextIndex = getRandomSongIndex();
    } else {
      nextIndex = (currentSongIndex + 1) % selectedGenre.songs.length;
    }
    
    playSongAtIndex(nextIndex);
  };

  const goToPreviousSong = () => {
    if (!selectedGenre?.songs?.length) return;
    
    // If shuffle is on, get random song, otherwise go to previous
    let prevIndex;
    if (isShuffle) {
      prevIndex = getRandomSongIndex();
    } else {
      prevIndex = currentSongIndex === 0
        ? selectedGenre.songs.length - 1
        : currentSongIndex - 1;
    }
    
    playSongAtIndex(prevIndex);
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
    setIsRepeat(prev => {
      const newRepeat = !prev;
      console.log("Repeat toggled:", newRepeat);
      return newRepeat;
    });
  };

  const toggleShuffle = () => {
    setIsShuffle(prev => {
      const newShuffle = !prev;
      console.log("Shuffle toggled:", newShuffle);
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
    
    setIsMuted(prev => {
      const newMuted = !prev;
      audioRef.current!.volume = newMuted ? 0 : volume;
      return newMuted;
    });
  };

  const toggleLike = () => {
    setIsLiked(prev => !prev);
  };

  const togglePlayerExpanded = () => {
    setIsPlayerExpanded(prev => !prev);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

const getGridColumns = () => {
  if (windowWidth >= 1436) return "grid-cols-4";
  if (windowWidth >= 1280) return "grid-cols-3";
  if (windowWidth >= 1024) return "grid-cols-3";
  if (windowWidth >= 768) return "grid-cols-2";
  return "grid-cols-2"; 
};

  return {
    selectedGenre,
    setSelectedGenre,
    isDialogOpen,
    setIsDialogOpen,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLiked,
    isRepeat,
    isShuffle,
    isPlayerExpanded,
    windowWidth,
    audioRef,
    playerRef,
    handleGenreClick,
    handleSongSelect,
    togglePlayPause,
    goToNextSong,
    goToPreviousSong,
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