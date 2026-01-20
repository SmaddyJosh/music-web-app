import React from 'react';
import '../css/TopNav.css';


interface Props {
  onSearch: (query: string) => void;
}

export const TopNav: React.FC<Props> = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = React.useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(searchTerm);
        }
    }

  return (
    <header className="top-nav">
      <div className="search-bar">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search for a song" 
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
        <button className="action-btn"><i className="fa-regular fa-heart"></i></button>
        <button className="action-btn"><i className="fa-solid fa-gear"></i></button>
      </div>
    </header>
  );
};