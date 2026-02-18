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
  const [contextMenu, setContextMenu] = React.useState<{x: number, y: number} | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = React.useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }      

  const handleRightClick = (e: React.MouseEvent<any>, playlistName: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
    setSelectedPlaylist(playlistName);
  }

  const handleEditClick = () => {
    if (selectedPlaylist){
      setEditingPlaylist(selectedPlaylist);
      setName(selectedPlaylist);
    }
    setContextMenu(null);
  }

  const handleSave = () => {
    if (editingPlaylist && name.trim() && selectedPlaylist) {
      setPlaylists(playlists.map(pl => pl === editingPlaylist ? name : pl));
      setEditingPlaylist(null);
      setSelectedPlaylist(null);
    } 
  }

  const handleCreatePlaylist=(e: React.MouseEvent<HTMLButtonElement>) =>{
    e.stopPropagation();
    console.log("clicked")
    const newPlaylistName = `New Playlist #${playlists.length + 1}`;
    setPlaylists([...playlists, newPlaylistName]);

    console.log(`Created: ${newPlaylistName}`);
    

  }
  {/*
  const handlePlaylistCLick = (playlistName: string) => {
    setEditingPlaylist(playlistName);
    setName(playlistName);
  }*/}

  const handleInput=(event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }
  // Helper to turn "Vibes & Chill" -> "vibes-chill"
  const getSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  React.useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu(null);

    
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <aside className="sidebar">
      <div className="logo">
        <i className="fa-solid fa-bolt"></i>
        <span >MuliPlay</span>
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
            onContextMenu={(e) =>handleRightClick(e, list)}

          >
            <div className='playlist-img-placeholder'></div>
            <span>{editingPlaylist === list? '' : list}</span>
            {editingPlaylist === list && (
              <input className='editInput' onChange={handleInput} value={name} autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') setEditingPlaylist(null);
                }}
              />


              )}
             
          
          </NavLink>

        ))}
      </div>
      {contextMenu && (
        <div 
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button onClick={handleEditClick}>Edit</button>
          <button onClick = {()=>setContextMenu(null)}>Close  </button>
        </div>
      )}
      
      
    </aside>
  );
}