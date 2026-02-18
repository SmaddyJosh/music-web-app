import React, { useState } from 'react';
import '../css/TopNav.css';
import {Link} from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';

interface Props {
  onSearch: (query: string) => void;
}

export const TopNav: React.FC<Props> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const { isDarkMode, toggleTheme } = useTheme();
    const [showThemeMenu, setShowThemeMenu] = useState(false);

   
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
       };
       document.addEventListener('click', handleClickOutside);
       return () => {
         document.removeEventListener('click', handleClickOutside);
       };
     }, []);
      

  return (
    <header className="top-nav">
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

      <div className="user-profile">
        <div className="user-info">
          <span className="user-name">SmaddyJosh</span>
          <span className="user-badge">Premium</span>
        </div>
        <div className="profile-pic"></div>
        <Link to="/favorites" className="action-btn">
          <i className="fa-regular fa-heart"></i>
          <span className="tooltip">Favorites</span>
        </Link>
        <div className='theme-selector'>
        <button className="action-btn"><i className="fa-solid fa-gear"></i></button>
        <button className="action-btn" onClick={() => setShowThemeMenu(!showThemeMenu)}><i className={isDarkMode ? "fa-solid fa-moon theme-icon-moon" : "fa-solid fa-sun theme-icon-sun"}></i></button>

        {showThemeMenu && (
          <div className="theme-dropdown">
            <button onClick={() => ToggleTheme('dark')}>
              <i className="fa-solid fa-moon theme-icon-moon"></i> Dark Mode</button>
            <button onClick={() => ToggleTheme('light')}>
              <i className="fa-solid fa-sun theme-icon-sun"></i> Light Mode</button>
          </div>
        )}
        </div>
            
          
      </div>
    </header>
  );
};