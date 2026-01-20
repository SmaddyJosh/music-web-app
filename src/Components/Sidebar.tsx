import React from 'react';
import { NavLink } from 'react-router-dom';   
import '../css/Sidebar.css';

export const Sidebar: React.FC = () => {

    const playlists = ['Vibes & Chill', 'Morning Boost', 'Rhythm & Energy'];

  // Helper to turn "Vibes & Chill" -> "vibes-chill"
  const getSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };
  return (
    <aside className="sidebar">
      <div className="logo">
        <i className="fa-solid fa-bolt"></i>
        <span>MuliPlay</span>
      </div>

      <ul className="nav-links">
        <li>
          
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon"><i className="fa-solid fa-house"></i></span> 
            Home
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/categories" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon"><i className="fa-solid fa-border-all"></i></span> 
            Categories
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/artists" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon"><i className="fa-regular fa-user"></i></span> 
            Artists
          </NavLink>
        </li>
      </ul>

     
      <div className="playlist-header">
        <span>Playlists</span>
        <i className="fa-solid fa-chevron-up"></i>
      </div>
      <div className="playlist-list">
        {playlists.map((list) => (
          <NavLink 
            key={list}
            to={`/playlist/${getSlug(list)}`}
            className={({ isActive }) => `playlist-item ${isActive ? 'active' : ''}`}
          >
            <div className="playlist-img-placeholder" /> 
            <span>{list}</span>
          </NavLink>
        ))}
      </div>
      
      
    </aside>
  );
};