// src/components/SearchResults.js
import React, { useState } from 'react'; // Import useState
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';
import AnimeModal from './AnimeModal'; // Import komponen modal
import './AnimeList.css';

const SEARCH_ANIME = gql`
  query SearchAnime($query: String!) {
    Page {
      media(search: $query, type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        description
        episodes
        status
        averageScore
      }
    }
  }
`;

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';

  const [selectedAnime, setSelectedAnime] = useState(null); // State untuk anime yang dipilih

  const { loading, error, data } = useQuery(SEARCH_ANIME, {
    variables: { query },
  });

  const cleanDescription = (description) => {
    return DOMPurify.sanitize(description, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="anime-content">
      <h2>Search Results</h2>
      <div className="anime-grid">
        {data.Page.media.map((anime) => (
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
    </div>
  );
};

export default SearchResults;
