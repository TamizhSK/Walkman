"use client";

import MusicPlayer from "../hooks/MusicPlayer";
import { genreData } from "../data/GenreData";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Heart, Repeat, Shuffle, ChevronUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function MusicGenreHub() {
  const player = MusicPlayer();
  const {
    selectedGenre, isDialogOpen, currentSong, isPlaying,
    currentTime, duration, volume, isMuted,
    isLiked, isRepeat, isShuffle, isPlayerExpanded,
    handleGenreClick, handleSongSelect, togglePlayPause, goToNextSong, // CHANGED
    goToPreviousSong, toggleShuffle, toggleRepeat, toggleLike, // CHANGED
    toggleMute, handleVolumeChange, handleTimeChange, togglePlayerExpanded,
    getGridColumns, audioRef, playerRef, formatTime,
  } = player;

return (
  <div className="p-18 sm:p-20 md:p-16 lg:p-20 xl:p-24 bg-gradient-to-t from-slate-900/30 to-black min-h-screen text-white">
    {/* Genre Banners */}
    <div className={`grid ${getGridColumns()} gap-4 sm:gap-6 transition-all duration-300`}>
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

      <DialogContent className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl sm:rounded-2xl max-w-xs sm:max-w-4xl mx-2 sm:mx-auto max-h-[70vh] md:max-w-2xl md:max-h-[85vh]  overflow-y-auto  overflow-x-hidden custom-scrollbar">
        <DialogHeader className="px-2 sm:px-0">
          <DialogTitle className="text-white text-lg sm:text-xl font-bold">{selectedGenre?.name}</DialogTitle>
          <DialogDescription className="text-gray-300 text-sm">{selectedGenre?.description}</DialogDescription>
        </DialogHeader>
        
        {/* Songs List - Mobile Optimized */}
        <div className="my-2 sm:my-4 px-2 sm:px-0">
          <h4 className="text-base sm:text-lg text-white font-semibold mb-2 px-1">Songs</h4>
            <div className="border border-white/10 rounded-lg sm:rounded-xl overflow-y-auto custom-scrollbar1 overflow-x-hidden h-[200px] sm:h-[300px] lg:h-[400px] 2xl:h-[250px] ">
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
                    alt={typeof song.title === "string" ? song.title : String(song.title ?? "")}
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
          <Card ref={playerRef} className="mt-3 sm:mt-6 mx-2 sm:mx-0 bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
            <CardContent className="p-2 sm:p-4">
            {/* Expanded Player View */}
            {isPlayerExpanded ? (
              <div className=" space-y-4 sm:space-y-6 flex flex-col items-center text-center">
                {/* Song Info */}
                <div className="flex flex-col items-center gap-4 sm:gap-6">
                  <img
                    src={currentSong.image}
                    className="w-30 sm:w-38 sm:h-38 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-lg object-cover"
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
                    <div className="flex items-center w-full max-w-md gap-2 sm:gap-4 text-sm text-gray-200">
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
                              onClick={goToPreviousSong} 
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
                              onClick={goToNextSong} 
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
                              <Button variant="ghost" size="icon" onClick={goToPreviousSong}>
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
                              <Button variant="ghost" size="icon" onClick={goToNextSong}>
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
                        onClick={toggleLike}
                        className={`${isLiked ? 'text-red-500' : 'text-gray-400'} w-8 h-8`}
                      >
                        <Heart size={14} className={isLiked ? 'fill-current' : ''} />
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
                  <div className="flex sm:hidden justify-center items-center gap-2 mt-2">
                    <Button variant="ghost" size="icon" onClick={toggleMute} className="w-8 h-8">
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </Button>
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="w-24"
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
            className="text-white hover:text-gray-900 flex items-center gap-2 text-sm sm:text-base px-3 py-2"
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