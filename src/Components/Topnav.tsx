import React, { useState } from 'react';
import '../css/TopNav.css';
import {Link} from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import { SettingsModal } from './SettingsModal';

interface Props {
  onSearch: (query: string) => void;
  onToggleSidebar?: () => void;
}

export const TopNav: React.FC<Props> = ({ onSearch, onToggleSidebar }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const { isDarkMode, toggleTheme } = useTheme();
    const [showThemeMenu, setShowThemeMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [username, setUsername] = useState(() => localStorage.getItem('muliPlay_username') || 'SmaddyJosh');
    const [avatar, setAvatar] = useState(() => localStorage.getItem('muliPlay_avatar') || '/muli.jpeg');
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setAvatar(result);
          localStorage.setItem('muliPlay_avatar', result);
        };
        reader.readAsDataURL(file);
      }
    };

   
    const triggerSearch = () => {
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            triggerSearch();
        }

    }
    const ToggleTheme = (mode: 'dark' | 'light') => {
      toggleTheme(mode)
     
      setShowThemeMenu(false);
    }

    
   React.useEffect(() => {
       const handleClickOutside = (e: MouseEvent) => {
         if (!(e.target as Element).closest('.theme-selector')) {
           setShowThemeMenu(false);
         }
        if (!(e.target as Element).closest('.profile-modal-content') && !(e.target as Element).closest('.profile-pic')) {
           setShowProfileModal(false);
         }
       };
       document.addEventListener('click', handleClickOutside);
       return () => {
         document.removeEventListener('click', handleClickOutside);
       };
     }, []);
      

  return (
    <header className="top-nav">
      <div className="search-container">
        {onToggleSidebar && (
          <button className="mobile-menu-btn" onClick={onToggleSidebar}>
            <i className="fa-solid fa-bars"></i>
          </button>
        )}
        <div className="search-bar">
          <i 
              className="fa-solid fa-magnifying-glass" 
              onClick={triggerSearch}
              style={{ cursor: 'pointer' }}
          ></i>
          
          <input 
              type="text" 
              placeholder="Search for a song" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="user-profile">
        <div className="user-info">
          <span className="user-name">{username}</span>
          <span className="user-badge">Premium</span>
        </div>
        <div className="profile-menu-container" style={{ position: 'relative' }}>
          <div 
            className="profile-pic" 
            style={{ backgroundImage: `url(${avatar})`, cursor: 'pointer', backgroundPosition: 'center', backgroundSize: 'cover' }}
            onClick={() => setShowProfileModal(true)}
          ></div>
          
          {showProfileModal && (
            <div 
              className="profile-modal-overlay" 
              onClick={() => setShowProfileModal(false)}
              style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 3000, 
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', justifyContent: 'center'
              }}
            >
              <div 
                className="profile-modal-content" 
                onClick={e => e.stopPropagation()} 
                style={{ position: 'relative' }}
              >
                <img 
                  src={avatar} 
                  alt="Profile" 
                  style={{ maxWidth: '90vw', maxHeight: '70vh', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', objectFit: 'contain' }} 
                />
                <button 
                  onClick={() => { fileInputRef.current?.click(); }}
                  style={{
                    position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)',
                    padding: '12px 24px', borderRadius: '30px', backgroundColor: 'var(--primary)',
                    color: 'white', border: 'none', cursor: 'pointer', fontSize: '1rem',
                    display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap'
                  }}
                >
                  <i className="fa-solid fa-camera"></i> Change Profile Picture
                </button>
                <button 
                  onClick={() => setShowProfileModal(false)}
                  style={{
                    position: 'absolute', top: '-20px', right: '-20px',
                    background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', 
                    borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept="image/*"
            onChange={(e) => { handleAvatarChange(e); setShowProfileModal(false); }} 
          />
        </div>
        <Link to="/favorites" className="action-btn">
          <i className="fa-regular fa-heart"></i>
          <span className="tooltip">Favorites</span>
        </Link>
        <div className='theme-selector'>
        <button className="action-btn" onClick={() => setShowSettings(true)}><i className="fa-solid fa-gear"></i></button>
        <button className="action-btn" onClick={() => setShowThemeMenu(!showThemeMenu)}><i className={isDarkMode ? "fa-solid fa-moon theme-icon-moon" : "fa-solid fa-sun theme-icon-sun"}></i></button>

        {showThemeMenu && (
          <div className="theme-dropdown">
            <button onClick={() => ToggleTheme('dark')}>
              <i className="fa-solid fa-moon theme-icon-moon"></i> Dark Mode</button>
            <button onClick={() => ToggleTheme('light')}>
              <i className="fa-solid fa-sun theme-icon-sun"></i> Light Mode</button>
          </div>
        )}
        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} onUsernameUpdate={setUsername} avatar={avatar} onAvatarUpdate={setAvatar} />}
        </div>
            
          
      </div>
    </header>
  );
};