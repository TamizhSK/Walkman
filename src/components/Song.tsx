"use client";


import MusicPlayer from "../hooks/MusicPlayer";
import { genreData } from "../data/GenreData";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Heart, Repeat, Shuffle, ChevronUp, Download, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Progress } from "@/components/ui/progress";
import { useEffect} from "react";

export default function MusicGenreHub() {
  const player = MusicPlayer();
  const {
    selectedGenre, isDialogOpen, currentSong, isPlaying,
    currentTime, duration, volume, isMuted,
    isLiked, isRepeat, isShuffle, isPlayerExpanded,
    isDownloading, downloadProgress, setIsDownloading,
    handleGenreClick, handleSongSelect, togglePlayPause, goToNextSong,
    goToPreviousSong, toggleShuffle, toggleRepeat, toggleLike,
    toggleMute, handleVolumeChange, handleTimeChange, togglePlayerExpanded,
    getGridColumns, audioRef, playerRef, formatTime, downloadGenreAsZip, cleanupAudio, downloadSong,
  } = player;

  // Helper function to truncate text
  interface TruncateText {
    (text: string, maxLength: number): string;
  }

  const truncateText: TruncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

    useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, []);



return (
<div className="p-5 sm:p-8 md:p-10 lg:p-12 xl:p-20 bg-gradient-to-t from-slate-900/30 to-black min-h-screen text-white">
    {/* Genre Banners */}
    <div className={`grid ${getGridColumns()} gap-4 sm:gap-6 transition-all duration-300`}>
      {genreData.map((genre) => (
        <motion.div
          key={genre.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleGenreClick(genre)}
          className={`rounded-xl sm:rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br ${genre.themeColor} transition hover:shadow-2xl`}
        >
          {/* Square aspect ratio on mobile, rectangular on medium+ screens */}
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[3/2]">
            <img
              src={genre.bannerImage}
              alt={genre.name}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="absolute bottom-0 p-2 sm:p-4">
              <h3 className="text-lg sm:text-2xl font-semibold text-white drop-shadow-sm">
                <span className="md:hidden">{genre.shortName || genre.name}</span>
                <span className="hidden md:inline">{genre.name}</span>
              </h3>
              <p className="hidden md:block text-xs sm:text-sm text-gray-300 mt-1 line-clamp-2 drop-shadow-sm">
                {genre.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

        <Dialog 
          open={isDialogOpen} 
          onOpenChange={(isOpen) => { 
            if (typeof player.setIsDialogOpen === "function") { 
              player.setIsDialogOpen(isOpen); 
            } 
            if (!isOpen && audioRef.current && isPlaying) { 
              audioRef.current.pause(); 
            } 
          }} 
        >
          
<DialogContent className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl sm:rounded-2xl max-w-[90vw] sm:max-w-[95vw] md:max-w-2xl lg:max-w-4xl mx-auto max-h-[85vh] overflow-y-auto overflow-x-hidden custom-scrollbar p-3 sm:p-4 md:p-6">
  <DialogHeader className="mb-2 sm:mb-4 text-center">
    <DialogTitle className="text-white text-base sm:text-lg md:text-xl font-bold">{selectedGenre?.name}</DialogTitle>
    <DialogDescription className="text-gray-300 text-xs sm:text-sm">{selectedGenre?.description}</DialogDescription>
  </DialogHeader>
  
  {/* Download Section */}
  <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
    <div className="flex items-center gap-2">
      <h4 className="text-sm sm:text-base md:text-lg text-white font-semibold">Songs</h4>
      <span className="text-xs sm:text-sm text-gray-400">
        ({selectedGenre?.songs?.length || 0} tracks)
      </span>
    </div>
    
    {/* Download Button */}
    <div className="flex flex-col items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={downloadGenreAsZip}
              disabled={isDownloading || !selectedGenre?.songs?.length}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                  <span className="hidden sm:inline">Downloading...</span>
                  <span className="sm:hidden">DL...</span>
                </>
              ) : (
                <>
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Download All</span>
                  <span className="sm:hidden">DL All</span>
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download all songs from this genre as a ZIP file</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {/* Download Progress */}
      {isDownloading && (
        <div className="w-full sm:w-32 md:w-40">
          <Progress value={downloadProgress} className="h-1.5 sm:h-2" />
          <p className="text-xs text-gray-400 text-center mt-1">
            {downloadProgress}%
          </p>
        </div>
      )}
    </div>
  </div>
  
  {/* Songs List - Mobile Optimized */}
  <div className="mb-3 sm:mb-4">
    <div className="border border-white/10 rounded-lg sm:rounded-xl overflow-y-auto custom-scrollbar1 overflow-x-hidden h-[180px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
      {selectedGenre?.songs.map((song, index) => (
        <div key={song.id}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleSongSelect(song)}
            className="flex items-center gap-2 sm:gap-3 md:gap-4 px-2 sm:px-3 md:px-4 py-2 sm:py-3 bg-white/5 hover:bg-white/10 transition cursor-pointer"
          >
            <span className="text-xs sm:text-sm text-gray-400 w-4 sm:w-5 flex-shrink-0">{index + 1}</span>
            <img
              src={song.image}
              alt={typeof song.title === "string" ? song.title : String(song.title ?? "")}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0 overflow-hidden">
              {/* Song title with proper truncation */}
              <p className="text-white font-medium text-xs sm:text-sm md:text-base leading-tight">
                <span className="block sm:hidden">{truncateText(song.title, 15)}</span>
                <span className="hidden sm:block md:hidden">{truncateText(song.title, 25)}</span>
                <span className="hidden md:block">{song.title}</span>
              </p>
              {/* Artist with proper truncation */}
              <p className="text-gray-400 text-xs sm:text-sm leading-tight mt-0.5">
                <span className="block sm:hidden">{truncateText(song.artist, 18)}</span>
                <span className="hidden sm:block md:hidden">{truncateText(song.artist, 30)}</span>
                <span className="hidden md:block">{song.artist}</span>
              </p>
            </div>
          </motion.div>
          {index < selectedGenre.songs.length - 1 && <Separator className="bg-white/10" />}
        </div>
      ))}
    </div>
  </div>

  {/* Enhanced Music Player */}
  {currentSong && (
    <Card ref={playerRef} className="bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
      <CardContent className="p-2 sm:p-3 md:p-4">
        {/* Expanded Player View */}
        {isPlayerExpanded ? (
          <div className="space-y-3 sm:space-y-4 md:space-y-6 flex flex-col items-center text-center">
            {/* Song Info */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 w-full">
              <img
                src={currentSong.image}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-lg object-cover"
                alt={currentSong.title}
              />
              <div className="w-full max-w-md">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 leading-tight">
                  <span className="block sm:hidden">{truncateText(currentSong.title, 20)}</span>
                  <span className="hidden sm:block md:hidden">{truncateText(currentSong.title, 30)}</span>
                  <span className="hidden md:block">{currentSong.title}</span>
                </div>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-2 sm:mb-4 leading-tight">
                  <span className="block sm:hidden">{truncateText(currentSong.artist, 25)}</span>
                  <span className="hidden sm:block md:hidden">{truncateText(currentSong.artist, 35)}</span>
                  <span className="hidden md:block">{currentSong.artist}</span>
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400">
                  {selectedGenre?.name}
                </div>
              </div>
            </div>

                  {/* Progress Bar */}
                  <div className="w-full flex flex-col items-center">
                    <div className="flex items-center w-full max-w-md gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-200">
                      <span className="w-10 sm:w-12 text-right text-xs">{formatTime(currentTime)}</span>
                      <Slider
                        value={[currentTime]}
                        max={duration}
                        step={1}
                        onValueChange={handleTimeChange}
                        className="flex-1"
                      />
                      <span className="w-10 sm:w-12 text-xs">{formatTime(duration)}</span>
                    </div>
                  </div>

                    {/* Control Buttons - Responsive */}
                    <div className="flex justify-center items-center gap-1 sm:gap-2 md:gap-4">
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
                              } hover:text-black transition-colors w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10`}
                            >
                              <Shuffle size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
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
                              onClick={goToPreviousSong} 
                              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                            >
                              <SkipBack size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Previous</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <Button
                        variant="default"
                        size="icon"
                        onClick={togglePlayPause}
                        className="bg-white text-black hover:bg-gray-200 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                      >
                        {isPlaying ? <Pause size={18} className="sm:w-6 sm:h-6 md:w-7 md:h-7" /> : <Play size={18} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />}
                      </Button>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={goToNextSong} 
                              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                            >
                              <SkipForward size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
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
                              className={`${isRepeat ? 'text-green-400 bg-green-400/20' : 'text-gray-400'} hover:text-black transition-colors w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10`}
                            >
                              <Repeat size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {isRepeat ? 'Disable Repeat' : 'Enable Repeat'}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    {/* Secondary Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 w-full max-w-md">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={toggleLike}
                          className={`${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-400 transition-colors w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10`}
                        >
                          <Heart size={14} className={`sm:w-4 sm:h-4 md:w-5 md:h-5 ${isLiked ? 'fill-current' : ''}`} />
                        </Button>
                            {/* Add Download Single Song Button */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={async () => {
                                  if (currentSong && selectedGenre && !isDownloading) {
                                    setIsDownloading(true);
                                    try {
                                      await downloadSong(currentSong, selectedGenre);
                                    } finally {
                                      setIsDownloading(false);
                                    }
                                  }
                                }}
                                disabled={isDownloading}
                                className={`w-8 h-8 transition-colors duration-200 ${
                                  isDownloading 
                                    ? 'text-blue-500 animate-pulse cursor-not-allowed' 
                                    : 'text-gray-400 hover:text-blue-400'
                                }`}
                              >
                                {isDownloading ? (
                                  <div className="w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Download size={16} />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download this song</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={toggleMute} className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10">
                          {isMuted ? <VolumeX size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Volume2 size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />}
                        </Button>
                        <Slider
                          value={[isMuted ? 0 : volume]}
                          max={1}
                          step={0.01}
                          onValueChange={handleVolumeChange}
                          className="w-16 sm:w-20 md:w-24 lg:w-32"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                    /* Compact Player View - Mobile Optimized */
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src={currentSong.image}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-md sm:rounded-lg object-cover flex-shrink-0"
                alt={currentSong.title}
              />
              <div className="flex-1 min-w-0 overflow-hidden">
                {/* Song title with responsive truncation */}
                <div className="text-sm sm:text-base md:text-lg font-bold text-white leading-tight">
                  <span className="block sm:hidden">{truncateText(currentSong.title, 12)}</span>
                  <span className="hidden sm:block md:hidden">{truncateText(currentSong.title, 20)}</span>
                  <span className="hidden md:block">{currentSong.title}</span>
                </div>
                {/* Artist with responsive truncation */}
                <div className="text-xs sm:text-sm text-gray-300 leading-tight mt-0.5">
                  <span className="block sm:hidden">{truncateText(currentSong.artist, 15)}</span>
                  <span className="hidden sm:block md:hidden">{truncateText(currentSong.artist, 25)}</span>
                  <span className="hidden md:block">{currentSong.artist}</span>
                </div>
              </div>

                      {/* Desktop Controls */}
                      <div className="hidden md:flex items-center gap-1">
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
                                } hover:text-black transition-colors w-9 h-9`}
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
                              <Button variant="ghost" size="icon" onClick={goToPreviousSong} className="w-9 h-9">
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
                          className="bg-white text-black hover:bg-gray-200 w-10 h-10"
                        >
                          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                        </Button>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={goToNextSong} className="w-9 h-9">
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
                                className={`${isRepeat ? 'text-green-400 bg-green-400/20' : 'text-gray-400'} hover:text-black transition-colors w-9 h-9`}
                              >
                                <Repeat size={16} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {isRepeat ? 'Disable Repeat' : 'Enable Repeat'}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                         {/* Add Download Single Song Button for Desktop */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              {/* Add Download Single Song Button for Mobile */}
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={async () => {
                                  if (currentSong && selectedGenre && !isDownloading) {
                                    setIsDownloading(true);
                                    try {
                                      await downloadSong(currentSong, selectedGenre);
                                    } finally {
                                      setIsDownloading(false);
                                    }
                                  }
                                }}
                                disabled={isDownloading}
                                className={`w-8 h-8 transition-colors duration-200 ${
                                  isDownloading 
                                    ? 'text-blue-500 animate-pulse cursor-not-allowed' 
                                    : 'text-gray-400 hover:text-blue-400'
                                }`}
                              >
                                {isDownloading ? (
                                  <div className="w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Download size={16} />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Download this song</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      {/* Mobile Play Button Only */}
                      <div className="flex md:hidden">
                        <Button
                          variant="default"
                          size="icon"
                          onClick={togglePlayPause}
                          className="bg-white text-black hover:bg-gray-200 w-9 h-9 sm:w-10 sm:h-10"
                        >
                          {isPlaying ? <Pause size={14} className="sm:w-4 sm:h-4" /> : <Play size={14} className="sm:w-4 sm:h-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-8 text-right text-xs">{formatTime(currentTime)}</span>
                      <Slider
                        value={[currentTime]}
                        max={duration}
                        step={1}
                        onValueChange={handleTimeChange}
                        className="flex-1"
                      />
                      <span className="w-8 text-xs">{formatTime(duration)}</span>
                    </div>

                    {/* Mobile Controls Row */}
                    <div className="flex md:hidden justify-center items-center gap-2 sm:gap-3">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={goToPreviousSong}
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
                      {/* Add Download Single Song Button for Mobile */}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={async () => {
                          if (currentSong && selectedGenre && !isDownloading) {
                            setIsDownloading(true);
                            try {
                              await downloadSong(currentSong, selectedGenre);
                            } finally {
                              setIsDownloading(false);
                            }
                          }
                        }}
                        disabled={isDownloading}
                        className={`w-8 h-8 transition-colors duration-200 ${
                          isDownloading 
                            ? 'text-blue-500 animate-pulse cursor-not-allowed' 
                            : 'text-gray-400 hover:text-blue-400'
                        }`}
                      >
                        {isDownloading ? (
                          <div className="w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Download size={14} />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={goToNextSong}
                        className="w-8 h-8"
                      >
                        <SkipForward size={16} />
                      </Button>
                    </div>

                    {/* Volume Control */}
                  <div className="flex md:hidden justify-center items-center gap-2 mt-2">
                    <Button variant="ghost" size="icon" onClick={toggleMute} className="w-8 h-8">
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </Button>
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="w-20 sm:w-24"
                    />
                  </div>
                  </div>
                )}
            </CardContent>
          </Card>
        )}

        {/* Enhanced Expand/Collapse Toggle Button */}
        {currentSong && (
          <div className="flex justify-center mt-2 sm:mt-3 pb-2">
            <Button
              variant="ghost"
              onClick={togglePlayerExpanded}
              className="text-white hover:text-gray-900 flex items-center gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
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
        )}
      </DialogContent>
    </Dialog>

    {/* Audio Element */}
    <audio ref={audioRef} />
  </div>
);
}

//