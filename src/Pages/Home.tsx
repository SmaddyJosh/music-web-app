import React, { useEffect, useState } from 'react';
import { fetchPopularTracks } from '../Services/API';
import type { JamendoTrack } from '../Types';
import { SongCard } from '../Components/Songcard';
import { TopNav } from '../Components/Topnav';
import '../css/Home.css';
import { fetchSongs } from '../Services/API';

export const Home: React.FC = () => {
  const [songs, setSongs] = useState<JamendoTrack[]>([]);

  
  const [loading, setLoading] = useState(true);
 
    const handleSearch = async (query: string) => {
    setLoading(true);
    try {
        // Assuming your fetchSongs accepts a query arg: fetchSongs(query)
        const data = await fetchSongs(query); 
        setSongs(data);
    } catch (error) {
        console.error("Search failed", error);
    }
    setLoading(false);
  };

  // 2. Load default songs on mount
  useEffect(() => {
    handleSearch(''); // Empty string = fetch popular/default
  }, []);
  

  return (
    <main className="main-content">
      <TopNav onSearch={handleSearch} />

    
      <section className="categories-section">
        <div className="section-header"><h3>Select Categories</h3></div>
        <div className="category-chips">
          {['All', 'Relax', 'Sad', 'Party', 'Romance', 'Energetic'].map(cat => (
            <button key={cat} className={`chip ${cat === 'All' ? 'active' : ''}`}>{cat}</button>
          ))}
        </div>
      </section>

     
      <section className="popular-songs">
        <div className="section-header"><h3>Popular Songs</h3></div>
        
        {loading ? (
          <p>Loading tracks...</p>
        ) : (
          <div className="songs-grid">
            {songs.map(song => (
              <SongCard key={song.id} track={song} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};