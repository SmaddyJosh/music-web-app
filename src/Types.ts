export interface JamendoTrack {
  id: number;
  name: string;
  artist_name: string;
  image: string;
  audio: string;
  duration: number;
}

export interface JamendoArtist {
  id: string;
  name: string;
  image: string;
  joindate: string;
}