
import React from 'react';
import { useParams } from 'react-router-dom';

export const PlaylistPage: React.FC = () => {
  // This grabs the "vibes-chill" part from the URL
  const { id } = useParams(); 

 
  const title = id?.replace(/-/g, ' ').toUpperCase();

  return (
    <main className="main-content">
      <h2 style={{color: 'white'}}>Playlist: {title}</h2>
      <p style={{color: '#a1a1aa'}}>Songs for {id} will appear here.</p>
      
    </main>
  );
};