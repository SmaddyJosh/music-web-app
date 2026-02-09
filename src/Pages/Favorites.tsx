import { usePlayer } from "../Context/MusicContext";
import { SongCard } from '../Components/Songcard';
import '../css/Favorites.css';

export const Favorites = () => {
  const { favorites } = usePlayer();

  return (      
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
      
      {favorites.length === 0 ? (
        <p className="text-gray-500">You haven't liked any songs yet.</p>
      ) : (
        <div className="song-grid">
          {favorites.map((song) => (
            <SongCard key={song.id} track={song} />
          ))}
        </div>
      )}
    </div>
  );
};