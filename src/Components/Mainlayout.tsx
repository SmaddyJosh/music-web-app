import React, {useState} from "react";
import { Sidebar } from "./Sidebar";
import { MusicPlayer } from "./MusicPlayer";
import { TopNav } from "./Topnav";
import { useAuth } from "../Context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export const MainLayout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  // Route Protection
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      {/* Sidebar with mobile toggle state */}
      <Sidebar isOpenMobile={isSidebarOpen} onCloseMobile={() => setIsSidebarOpen(false)} />
      
      {/* Main content area */}
      <div className="main-content-wrapper">
        <TopNav 
          onSearch={(query) =>setSearchQuery(query)} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        
        {/* Pass the searchQuery down to Home/Playlists */}
        <Outlet context={{ searchQuery }} /> 
      </div>

      <MusicPlayer />
    </div>
  );
};