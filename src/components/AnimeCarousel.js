// src/components/AnimeCarousel.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './AnimeCarousel.css'; 

const AnimeCarousel = ({ animes }) => {
  return (
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      showStatus={false}
      emulateTouch
      centerMode
      centerSlidePercentage={25} 
      dynamicHeight={false}
    >
      {animes.map((anime) => (
        <div key={anime.id} className="carousel-item">
          <div className="carousel-image-container">
            <img
              src={anime.coverImage.large}
              alt={anime.title.romaji}
              className="carousel-image"
            />
          </div>
          <div className="carousel-title">
            <p>{anime.title.romaji.length > 30 ? anime.title.romaji.slice(0, 30) + '...' : anime.title.romaji}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default AnimeCarousel;
