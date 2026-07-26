import React from 'react';
import type { JamendoTrack } from '../Types';
import { usePlayer } from '../Context/MusicContext';
import '../css/SongCard.css';

interface Props {
  track: JamendoTrack;
}

export const SongCard: React.FC<Props> = ({ track }) => {
  const { playTrack, isPlaying } = usePlayer();

  return (
    <div className="song-card" onClick={() => playTrack(track)}>
      <div className="card-image-wrapper">
        <img src={track.image} alt={track.name} />
        <div className="play-overlay">
          {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}</div>
      </div>
      <div className="card-title">{track.name}</div>
      <div className="card-artist">{track.artist_name}</div>
    </div>
  );
};