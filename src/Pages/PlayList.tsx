import React, { useEffect } from 'react';
import type { JamendoTrack } from '../Types';

import '../css/Playlist.css';
import { SongCard } from '../Components/Songcard';
import { useParams } from 'react-router-dom';


export const PlaylistPage: React.FC = () => {
  // This grabs the "vibes-chill" p
  const [songs, setSongs] = React.useState<JamendoTrack[]>([])
  const { id } = useParams(); 

  useEffect(() => {
    // Get playlists from localStorage
    const allPlaylists = JSON.parse(localStorage.getItem('playlists') || '[]');
    
    // Find the playlist that matches this slug
    const playlistName = allPlaylists.find((pl: string) => 
      pl.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') === id
    );

    if (playlistName) {
      // Load songs from localStorage using the correct key
      const playlistKey = `playlist_${playlistName}`;
      const savedSongs = JSON.parse(localStorage.getItem(playlistKey) || '[]');
      setSongs(savedSongs);
    }
  }, [id]);

  const title = id?.replace(/-/g, ' ').toUpperCase();

  return (
    <main className="main-content">
      <h2 style={{color: 'white'}}>Playlist: {title}</h2>
      <p style={{color: '#a1a1aa'}}>Songs for {id} will appear here.</p>

            {songs.length === 0 ? (
              <p className="text-gray-500">You haven't liked any songs yet.</p>
            ) : (
              <div className="song-grid">
                {songs.map((song) => (
                  <SongCard key={song.id} track={song} />
                ))}
              </div>
            )}

      
    </main>
  );
};