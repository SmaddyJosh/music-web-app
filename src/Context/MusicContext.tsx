import React, { createContext, useContext, useState } from 'react';
import type { JamendoTrack } from '../Types';

interface PlayerContextType {
  currentTrack: JamendoTrack | null;
  isPlaying: boolean;
  playTrack: (track: JamendoTrack) => void;
  togglePlay: () => void;
  favorites: JamendoTrack[];
  toggleFavorite: (track: JamendoTrack) => void;
  isFavorite: (trackId:number) => boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<JamendoTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<JamendoTrack[]>([]);

  const toggleFavorite = (track: JamendoTrack) => {
    setFavorites((prevFavorites) => {
      const isFav = prevFavorites.find((fav) => fav.id === track.id);
      if (isFav) {
        return prevFavorites.filter((fav) => fav.id !== track.id);
      } else {
        return [...prevFavorites, track];
      }
    });
  };

  const isFavorite = (trackId: number) => {
    return favorites.some((track) => track.id === trackId);
  };

  const playTrack = (track: JamendoTrack) => {
    if (currentTrack?.id === track.id) {
     
      setIsPlaying(!isPlaying);
    } else {
      
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <PlayerContext.Provider value={{ currentTrack, isPlaying, playTrack, togglePlay , favorites, toggleFavorite, isFavorite }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within a PlayerProvider");
  return context;
};