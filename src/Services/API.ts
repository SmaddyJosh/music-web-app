import type { JamendoTrack } from '../Types';

const CLIENT_ID = '587c0510';
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

export const fetchSongs = async (query: string = ''): Promise<JamendoTrack[]> => {
  try {
    let url = `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=jsonpretty&limit=20&imagesize=600`;

    if (query) {
     
      url += `&namesearch=${encodeURIComponent(query)}&order=popularity_total`;
    } else {
     
      url += `&order=popularity_total`;
    }

    const response = await fetch(url);
    const data = await response.json();
    
    // Safety check in case API returns error or empty
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