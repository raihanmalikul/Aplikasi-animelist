
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ANIME_DATA } from '../queries';
import DOMPurify from 'dompurify';
import AnimeModal from './AnimeModal'; 
import './AnimeList.css';

const TrendingNow = () => {
  const [page, setPage] = useState(1); 
  const [animeList, setAnimeList] = useState([]); 
  const [selectedAnime, setSelectedAnime] = useState(null); 

  // Query untuk mengambil data anime
  const { loading, error, data, fetchMore } = useQuery(GET_ANIME_DATA, {
    variables: { page, perPage: 20 },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      // Gabungkan data baru dengan data lama
      setAnimeList((prevList) => [...prevList, ...data.popular.media]);
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
      <h2>Trending Now</h2>
      <div className="anime-grid">
        {animeList.map((anime) => (
          <div 
            key={anime.id} 
            className="anime-card"
            onClick={() => setSelectedAnime(anime)} 
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

      
      {selectedAnime && <AnimeModal anime={selectedAnime} onClose={() => setSelectedAnime(null)} />}

      
      {!loading && (
        <button className="load-more-button" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default TrendingNow;
