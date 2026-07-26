import React, { useState, useEffect } from 'react';
import type { JamendoTrack } from '../Types';
import { usePlayer } from '../Context/MusicContext';
import '../css/HeroCarousel.css';

interface Props {
  songs: JamendoTrack[];
}

export const HeroCarousel: React.FC<Props> = ({ songs }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { playTrack, isPlaying } = usePlayer();

  useEffect(() => {
    if (songs.length > 0 && activeIndex >= songs.length) {
      setActiveIndex(0);
    }
  }, [songs, activeIndex]);

  if (!songs || songs.length === 0) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % songs.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const handleCardClick = (index: number, song: JamendoTrack) => {
    if (index === activeIndex) {
      playTrack(song);
    } else {
      setActiveIndex(index);
    }
  };

  const getCardStyle = (index: number) => {
    const diff = (index - activeIndex + songs.length) % songs.length;
    let offset = diff;

    const half = Math.floor(songs.length / 2);
    if (diff > half) {
      offset = diff - songs.length;
    }

    const absOffset = Math.abs(offset);

    const scale = offset === 0 ? 1 : 1 - (absOffset * 0.15);
    const translateX = offset === 0 ? 0 : offset * 140;
    const zIndex = songs.length - absOffset;
    const opacity = offset === 0 ? 1 : 1 - (absOffset * 0.3);

    return {
      transform: `translateX(calc(-50% + ${translateX}px)) scale(${scale})`,
      zIndex,
      opacity,
      left: '50%'
    };
  };

  const scrollTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollTimeoutRef.current) return;

    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const delta = isHorizontal ? e.deltaX : e.deltaY;

    if (Math.abs(delta) > 20) {
      if (delta > 0) {
        handleNext();
      } else {
        handlePrev();
      }

      scrollTimeoutRef.current = setTimeout(() => {
        scrollTimeoutRef.current = null;
      }, 400);
    }
  };

  return (
    <div className="hero-carousel-container" onWheel={handleWheel}>
      {songs.map((song, index) => (
        <div
          key={song.id}
          className={`carousel-card ${index === activeIndex ? 'active' : ''}`}
          style={getCardStyle(index)}
          onClick={() => handleCardClick(index, song)}
        >
          <img src={song.image} alt={song.name} className="carousel-image" />
          <div className="carousel-content">
            <div className="carousel-info">
              <h2>{song.name}</h2>
              <p>{song.artist_name}</p>
            </div>
            {index === activeIndex && (
              <button
                className="play-btn-large"
                onClick={(e) => { e.stopPropagation(); playTrack(song); }}
              >
                {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
              </button>
            )}
          </div>
        </div>
      ))}

      <div className="carousel-controls">
        <button onClick={handlePrev}><i className="fa-solid fa-chevron-left"></i></button>
        <button onClick={handleNext}><i className="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>
  );
};
