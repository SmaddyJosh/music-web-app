import React from 'react';
import { NavLink } from 'react-router-dom';   
import '../css/Sidebar.css';

export const Sidebar: React.FC = () => {

  const [playlists, setPlaylists] = React.useState([
  'Vibes & Chill',
    'Morning Boost',
    'Rhythm & Energy'
  ]);
  const [name, setName] = React.useState("");
  const[isOpen, setIsOpen] = React.useState(true);
  const [editingPlaylist, setEditingPlaylist] = React.useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleCreatePlaylist=(e: React.MouseEvent<HTMLButtonElement>) =>{
    e.stopPropagation();
    console.log("clicked")
    const newPlaylistName = `New Playlist #${playlists.length + 1}`;
    setPlaylists([...playlists, newPlaylistName]);

    console.log(`Created: ${newPlaylistName}`);
    

  }
  const handlePlaylistCLick = (playlistName: string) => {
    setEditingPlaylist(playlistName);
    setName(playlistName);
  }

  const handleInput=(event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }
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

     
      <div className="playlist-header" onClick={toggleDropdown}>
        <div className='header-left'>
          <i className={`fa-solid fa-chevron-${isOpen ? 'down' : 'right'}`} ></i>
          <span>Playlists</span>
        </div>
         <button
        className='create-playlist-btn'
        onClick={handleCreatePlaylist}
      > <i className="fa-solid fa-plus"></i></button>
     
        
         {/*<i className="fa-solid fa-chevron-up"></i>*/}
      </div>
      
      <div className='playlist-list'>
        {playlists.map((list) =>(
          <NavLink
            key={list}
            to={`/playlist/${getSlug(list)}`} 
            className={({ isActive }) => `playlist-item ${isActive ? 'active' : ''}`}
            onClick = {() => handlePlaylistCLick(list)}

          >
            <div className='playlist-img-placeholder'></div>
            <span>{editingPlaylist === list? '' : list}</span>
            {editingPlaylist === list && (
              <input className='editInput' onChange={handleInput} value={name} autoFocus/>


              )}
             
          
          </NavLink>

        ))}
      </div>
      
      
    </aside>
  );
};