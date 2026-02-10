import React, { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../Context/MusicContext';
import '../css/MusicPlayer.css';

export const MusicPlayer: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay, toggleFavorite } = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      
      setDuration(audioRef.current.duration);
    }
  };

  //  Handler to allow clicking on the bar to seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const bar = e.currentTarget;
      const clickPosition = e.nativeEvent.offsetX;
      const barWidth = bar.clientWidth;
      const seekTime = (clickPosition / barWidth) * duration;
      
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  //formatting the seconds
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  return (
    <footer className="music-player">
      <audio 
        ref={audioRef} 
        src={currentTrack.audio} 
        onEnded={() => togglePlay()} 
        
        onTimeUpdate={handleTimeUpdate}
        
        onLoadedMetadata={handleTimeUpdate}
      />
      
      
      <div className="player-info">
        <img src={currentTrack.image} className="current-song-img" alt="cover" />
        <div className="player-text">
          <h4>{currentTrack.name}</h4>
          <p>{currentTrack.artist_name}</p>
        </div>
      </div>

     
      <div className="player-controls">
        <div className="control-buttons">
          <i className="fa-solid fa-backward-step"></i>
          <div className="play-btn" onClick={togglePlay}>
            {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
          </div>
          <i className="fa-solid fa-forward-step"></i>
        </div>

        <div className="progress-container">
          
          <span>{formatTime(currentTime)}</span>
          
      
          <div className="progress-bar" onClick={handleSeek}>
            <div 
              className="progress-fill" 
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          
          
          <span>{formatTime(duration || currentTrack.duration)}</span>
        </div>
      </div>

    
      <div className="player-extras">
        <button className="fa-regular fa-heart"
          onClick={() => toggleFavorite(currentTrack)}
        ></button>
        <i className="fa-solid fa-volume-high"></i>
      </div>
    </footer>
  );
};
