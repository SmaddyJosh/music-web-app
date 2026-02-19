
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './App.css';
import { Sidebar } from './Components/Sidebar';
import { MusicPlayer } from './Components/MusicPlayer';
import { Home } from './Pages/Home';
import { PlayerProvider } from './Context/MusicContext';
import { PlaylistPage } from './Pages/PlayList';
import { Favorites } from './Pages/Favorites';
import { ThemeProvider } from './Context/ThemeContext';
import { Categories } from './Pages/Categories';



const Artists = () => <div style={{color:'white', padding:'50px'}}>Artists Page</div>;

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <PlayerProvider>
          
            <div className="app-container">
              <Sidebar />
              
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/artists" element={<Artists />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/playlist/:id" element={<PlaylistPage />} />
              </Routes>

              <MusicPlayer />
            </div>
          
        </PlayerProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;