import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { JamendoArtist } from '../Types';
import { fetchArtists } from '../Services/API';
import '../css/Artists.css';

export const Artists: React.FC = () => {
  const [artists, setArtists] = useState<JamendoArtist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArtists = async () => {
      setIsLoading(true);
      const data = await fetchArtists();
      setArtists(data);
      setIsLoading(false);
    };
    loadArtists();
  }, []);

  return (
    <main className="main-content artists-container scrollable-flex">
      <h2 className="section-header">Popular Artists</h2>
      
      {isLoading ? (
        <p style={{ color: 'var(--text-gray)' }}>Loading artists...</p>
      ) : (
        <div className="artists-grid">
          {artists.map((artist) => (
            <Link to={`/artist/${artist.id}`} key={artist.id} className="artist-card">
              <img 
                src={artist.image || 'https://via.placeholder.com/150'} 
                alt={artist.name} 
                className="artist-img" 
              />
              <div className="artist-name">{artist.name}</div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};
