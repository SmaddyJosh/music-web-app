
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './App.css';
import { Sidebar } from './Components/Sidebar';
import { MusicPlayer } from './Components/MusicPlayer';
import { Home } from './Pages/Home';
import { PlayerProvider } from './Context/MusicContext';
import { PlaylistPage } from './Pages/PlayList';


const Categories = () => <div style={{color:'white', padding:'50px'}}>Categories Page</div>;
const Artists = () => <div style={{color:'white', padding:'50px'}}>Artists Page</div>;

function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <div className="app-container">
          <Sidebar />
          
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/artists" element={<Artists />} />

            <Route path="/playlist/:id" element={<PlaylistPage />} />
          </Routes>

          <MusicPlayer />
        </div>
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;