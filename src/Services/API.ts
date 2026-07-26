import type { JamendoTrack, JamendoArtist } from '../Types';

const CLIENT_ID = import.meta.env.VITE_APIKEY;

export const fetchArtists = async (): Promise<JamendoArtist[]> => {
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/artists/?client_id=${CLIENT_ID}&format=jsonpretty&hasimage=true&limit=20&order=popularity_total`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching artists:", error);
    return [];
  }
};

export const fetchArtistTracks = async (artistId: string): Promise<JamendoTrack[]> => {
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/artists/tracks/?client_id=${CLIENT_ID}&format=jsonpretty&id=${artistId}`
    );
    const data = await response.json();
    if (!data.results || data.results.length === 0) return [];
    
    // The artists/tracks endpoint returns { tracks: [...] } inside the artist result
    const artist = data.results[0];
    return artist.tracks.map((track: any) => ({
      id: track.id,
      name: track.name,
      artist_name: artist.name,
      image: track.image || track.album_image,
      audio: track.audio,
      duration: track.duration
    }));
  } catch (error) {
    console.error("Error fetching artist tracks:", error);
    return [];
  }
};

export const fetchPopularTracks = async (): Promise<JamendoTrack[]> => {
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=jsonpretty&limit=10&order=popularity_total&imagesize=600`
    );
    const data = await response.json();

    return data.results.map((track: any) => ({
      id: track.id,
      name: track.name,
      artist_name: track.artist_name,
      image: track.image,
      audio: track.audio,
      duration: track.duration
    }));
  } catch (error) {
    console.error('Error fetching popular tracks:', error);
    return [];
  }
};




export const fetchSongs = async (query: string = '', tag: string = ''): Promise<JamendoTrack[]> => {
  try {
    let url = `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=jsonpretty&limit=20&imagesize=600&order=popularity_total`;

    if (query) {

      url += `&namesearch=${encodeURIComponent(query)}`;
    } else if (tag && tag !== 'All') {

      url += `&tags=${encodeURIComponent(tag.toLowerCase())}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!data.results) return [];

    return data.results.map((track: any) => ({
      id: track.id,
      name: track.name,
      artist_name: track.artist_name,
      image: track.image,
      audio: track.audio,
      duration: track.duration
    }));
  } catch (error) {
    console.error("Error fetching music:", error);
    return [];
  }
};