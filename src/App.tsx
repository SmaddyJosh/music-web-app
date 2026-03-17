
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import './App.css';
import { Home } from './Pages/Home';
import { PlayerProvider } from './Context/MusicContext';
import { PlaylistPage } from './Pages/PlayList';
import { Favorites } from './Pages/Favorites';
import { ThemeProvider } from './Context/ThemeContext';
import { Categories } from './Pages/Categories';
import { Login } from './Pages/Login';
import { AuthProvider } from './Context/AuthContext';
import { MainLayout } from './Components/Mainlayout';



const Artists = () => <div style={{color:'white', padding:'50px'}}>Artists Page</div>;

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <PlayerProvider>
            
            
               
                
                
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route element={<MainLayout />}>

                  <Route path="/" element={<Home />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/artists" element={<Artists />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/playlist/:id" element={<PlaylistPage />} />
                  </Route>

                  <Route path="*" element={<Navigate to="/" replace />} />
                  
                </Routes>

              
           
            
          </PlayerProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;