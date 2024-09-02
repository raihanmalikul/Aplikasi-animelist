// src/components/AnimeList.js
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ANIME_DATA } from '../queries';
import AnimeCarousel from './AnimeCarousel';
import DOMPurify from 'dompurify';
import AnimeModal from './AnimeModal';
import { Link, useNavigate } from 'react-router-dom';
import './AnimeList.css';

const AnimeList = () => {
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [animeLimit, setAnimeLimit] = useState(10); // State untuk mengelola jumlah anime yang ditampilkan

  const { loading, error, data } = useQuery(GET_ANIME_DATA, {
    variables: { page: 1, perPage: animeLimit }, // Variabel perPage untuk mengatur jumlah data
    notifyOnNetworkStatusChange: true,
  });

  const cleanDescription = (description) => {
    let sanitizedDescription = DOMPurify.sanitize(description, {
      ALLOWED_TAGS: [],
    });
    sanitizedDescription = sanitizedDescription.replace(/<br\s*\/?>/gi, '\n');
    sanitizedDescription = sanitizedDescription.replace(/<\/?i>/gi, '');
    return sanitizedDescription;
  };

  const loadMoreAnime = () => {
    setAnimeLimit(animeLimit + 10); // Tambahkan 10 anime lagi saat tombol "Load More" diklik
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="anime-content">
      {/* Carousel untuk Top Trending Anime */}
      <section className="carousel-section">
        <h2>Top Trending Anime</h2>
        <AnimeCarousel animes={data.trending.media} />
      </section>

      {/* Grid untuk Top Trending Anime */}
      <section className="anime-list-grid">
        <h2>Top Trending Anime</h2>
        <div className="anime-grid">
          {data.trending.media.map((anime) => (
            <div
              key={anime.id}
              className="anime-card"
              onClick={() => setSelectedAnime(anime)}
            >
              <img
                src={anime.coverImage.large}
                alt={anime.title.romaji}
                className="anime-card-image"
              />
              <div className="anime-card-content">
                <h3 className="anime-card-title">{anime.title.romaji}</h3>
                <p className="anime-card-description">
                  {cleanDescription(anime.description).slice(0, 100)}...
                </p>
                <div className="anime-card-stats">
                  <span className="anime-card-score">
                    Score: {anime.averageScore}
                  </span>
                  <span className="anime-card-episodes">
                    Episodes: {anime.episodes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Tombol Load More */}
        <button className="load-more-button" >
        <Link to="/trending-now">Tampilkan lebih banyak</Link>
        </button>
      </section>

      {/* Grid untuk Popular Now */}
      <section className="anime-list-grid">
        <h2>Popular Now</h2>
        <div className="anime-grid">
          {data.popular.media.map((anime) => (
            <div
              key={anime.id}
              className="anime-card"
              onClick={() => setSelectedAnime(anime)}
            >
              <img
                src={anime.coverImage.large}
                alt={anime.title.romaji}
                className="anime-card-image"
              />
              <div className="anime-card-content">
                <h3 className="anime-card-title">{anime.title.romaji}</h3>
                <p className="anime-card-description">
                  {cleanDescription(anime.description).slice(0, 100)}...
                </p>
                <div className="anime-card-stats">
                  <span className="anime-card-score">
                    Score: {anime.averageScore}
                  </span>
                  <span className="anime-card-episodes">
                    Episodes: {anime.episodes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Tombol Load More untuk Popular Now */}
        <button className="load-more-button" >
        <Link to="/top-anime">Tampilkan lebih banyak</Link>
        </button>
      </section>

      {/* Tampilkan Modal jika anime dipilih */}
      {selectedAnime && (
        <AnimeModal anime={selectedAnime} onClose={() => setSelectedAnime(null)} />
      )}
    </div>
  );
};

export default AnimeList;
