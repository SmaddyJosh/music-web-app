import React, { useEffect, useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

import type { JamendoTrack } from '../Types';
import { SongCard } from '../Components/Songcard';
import { HeroCarousel } from '../Components/HeroCarousel';
   
import '../css/Home.css';
import { fetchSongs } from '../Services/API';

interface LayoutContext {
  searchQuery: string;    
}

export const Home: React.FC = () => {
  const { searchQuery } = useOutletContext<LayoutContext>(); 
  const [songs, setSongs] = useState<JamendoTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categoriesRef = useRef<HTMLDivElement>(null);
  const songsGridRef = useRef<HTMLDivElement>(null);

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
    if (searchQuery) {
      setActiveCategory('All');
      handleSearch(searchQuery,"")
  }else{
    handleSearch("", activeCategory);
  }
}, [searchQuery]);

  useEffect(() => {
    const handleWheelEvent = (e: WheelEvent) => {
      // Translate vertical mouse wheel to horizontal scroll.
      // Leave native horizontal swipes (deltaX) alone.
      if (e.deltaY !== 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        (e.currentTarget as HTMLElement).scrollLeft += e.deltaY;
      }
    };
    
    const catNode = categoriesRef.current;
    const songsNode = songsGridRef.current;
    
    if (catNode) catNode.addEventListener('wheel', handleWheelEvent, { passive: false });
    if (songsNode) songsNode.addEventListener('wheel', handleWheelEvent, { passive: false });
    
    return () => {
      if (catNode) catNode.removeEventListener('wheel', handleWheelEvent);
      if (songsNode) songsNode.removeEventListener('wheel', handleWheelEvent);
    };
  }, [loading, songs]);
  
  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 400;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <main className="main-content">
      
      {!loading && songs.length >= 5 && (
        <section className="hero-section">
          <HeroCarousel songs={songs.slice(0, 5)} />
        </section>
      )}
     
     <section className="categories-section">
        <div className="section-header">
          <h3>Select Categories</h3>
          <div className="scroll-controls">
            <button onClick={() => scrollContainer(categoriesRef, 'left')}><i className="fa-solid fa-chevron-left"></i></button>
            <button onClick={() => scrollContainer(categoriesRef, 'right')}><i className="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
        <div className="category-chips scrollable-flex" ref={categoriesRef}>
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
        <div className="section-header">
          <h3>{activeCategory === 'All' ? 'Popular Songs' : `${activeCategory} Songs`}</h3>
          <div className="scroll-controls">
            <button onClick={() => scrollContainer(songsGridRef, 'left')}><i className="fa-solid fa-chevron-left"></i></button>
            <button onClick={() => scrollContainer(songsGridRef, 'right')}><i className="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
        
        {loading ? (
          <p>Loading tracks...</p>
        ) : (
          <div className="songs-grid scrollable-flex" ref={songsGridRef}>
            {songs.map(song => (
              <SongCard key={song.id} track={song} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};