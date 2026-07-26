import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { JamendoTrack } from '../Types';
import { fetchArtistTracks } from '../Services/API';
import { SongCard } from '../Components/Songcard';
import '../css/Artists.css';

export const ArtistDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [songs, setSongs] = useState<JamendoTrack[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArtistData = async () => {
      if (!id) return;
      setIsLoading(true);
      const tracks = await fetchArtistTracks(id);
      setSongs(tracks);
      setIsLoading(false);
    };
    loadArtistData();
  }, [id]);

  const artistName = songs.length > 0 ? songs[0].artist_name : 'Unknown Artist';
  const artistImage = songs.length > 0 ? (songs[0].image || 'https://via.placeholder.com/200') : 'https://via.placeholder.com/200';

  return (
    <main className="main-content artists-container scrollable-flex">
      <button 
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', color: 'var(--text-gray)', cursor: 'pointer', marginBottom: '20px', fontSize: '1.2rem' }}
      >
        <i className="fa-solid fa-arrow-left"></i> Back
      </button>

      {isLoading ? (
        <p style={{ color: 'var(--text-gray)' }}>Loading artist tracks...</p>
      ) : songs.length === 0 ? (
        <p style={{ color: 'var(--text-gray)' }}>No tracks found for this artist.</p>
      ) : (
        <>
          <div className="artist-details-header">
            <img src={artistImage} alt={artistName} className="artist-details-img" />
            <div className="artist-details-info">
              <h1>{artistName}</h1>
              <p>{songs.length} Tracks available</p>
            </div>
          </div>

          <h3 className="section-header">Popular Tracks</h3>
          <div className="song-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
            {songs.map(song => (
              <SongCard key={song.id} track={song} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};
