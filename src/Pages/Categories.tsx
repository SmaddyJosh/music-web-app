import { fetchSongs } from "../Services/API";
import React, { useEffect, useState } from "react";
import type { JamendoTrack } from "../Types";
import { SongCard } from "../Components/Songcard";
import '../css/Home.css';

export const Categories: React.FC = () => {
    const [songs, setSongs] = useState<JamendoTrack[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Pop', 'Rock', 'Jazz', 'Electronic', 'HipHop', 'Indie', 'Chill'];
 
    const handleSearch = async (query: string ='', tag: string ='') => {
        setLoading(true);
        try {
            const data = await fetchSongs(query, tag);
            setSongs(data);
        } catch (error) {
            console.error("Search failed", error);
        }
        setLoading(false);
    };
    
    useEffect(() => {
        handleSearch('');
    }, []);

    return (
        <main className="main-content">
            <section className="categories-section">
                <div className="section-header"><h3>Select Categories</h3></div>
                <div className="category-chips">
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            className={`chip ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => {
                                setActiveCategory(cat);
                                handleSearch('', cat); // Fetch songs by tag
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>
            <section className="popular-songs">
              <div className="section-header"><h3>{activeCategory === 'All' ? 'Popular Songs' : activeCategory}</h3></div>
                {loading ? (
                    <div className="loading">Loading songs...</div>
                ) : (
                    <div className="song-grid">
                        {songs.map(song => (
                            <SongCard key={song.id} track={song} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};