// src/components/TopAnime.js
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ANIME_DATA } from '../queries';
import DOMPurify from 'dompurify';
import AnimeModal from './AnimeModal'; // Import komponen modal
import './AnimeList.css';

const TopAnime = () => {
  const [page, setPage] = useState(1); // State untuk halaman saat ini
  const [animeList, setAnimeList] = useState([]); // State untuk menyimpan daftar anime
  const [selectedAnime, setSelectedAnime] = useState(null); // State untuk anime yang dipilih

  // Query untuk mengambil data anime
  const { loading, error, data, fetchMore } = useQuery(GET_ANIME_DATA, {
    variables: { page, perPage: 20 },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      // Gabungkan data baru dengan data lama
      setAnimeList((prevList) => [...prevList, ...data.trending.media]);
    },
  });

  const cleanDescription = (description) => {
    return DOMPurify.sanitize(description, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  };

  // Fungsi untuk memuat lebih banyak data
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1); // Tingkatkan halaman
    fetchMore({
      variables: {
        page: page + 1,
        perPage: 10,
      },
    });
  };

  if (loading && page === 1) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="anime-content">
      <h2>Top Anime</h2>
      <div className="anime-grid">
        {animeList.map((anime) => (
          <div 
            key={anime.id} 
            className="anime-card"
            onClick={() => setSelectedAnime(anime)} // Setel anime yang dipilih saat card diklik
          >
            <img src={anime.coverImage.large} alt={anime.title.romaji} className="anime-card-image" />
            <div className="anime-card-content">
              <h3 className="anime-card-title">{anime.title.romaji}</h3>
              <p className="anime-card-description">{cleanDescription(anime.description).slice(0, 100)}...</p>
              <div className="anime-card-stats">
                <span className="anime-card-score">Score: {anime.averageScore}</span>
                <span className="anime-card-episodes">Episodes: {anime.episodes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tampilkan Modal jika anime dipilih */}
      {selectedAnime && <AnimeModal anime={selectedAnime} onClose={() => setSelectedAnime(null)} />}

      {/* Tombol Load More */}
      {!loading && (
        <button className="load-more-button" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default TopAnime;
