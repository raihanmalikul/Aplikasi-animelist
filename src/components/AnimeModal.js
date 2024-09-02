// src/components/AnimeModal.js
import React from 'react';
import DOMPurify from 'dompurify'; // Import DOMPurify untuk membersihkan HTML
import './AnimeModal.css'; // Import CSS khusus untuk modal

const AnimeModal = ({ anime, onClose }) => {
  if (!anime) return null; // Jika tidak ada anime yang dipilih, jangan tampilkan modal

  // Fungsi untuk membersihkan deskripsi anime
  const cleanDescription = (description) => {
    let sanitizedDescription = DOMPurify.sanitize(description, {
      ALLOWED_TAGS: [], // Menghapus semua tag HTML
    });

    // Gantikan tag HTML tertentu dengan teks biasa
    sanitizedDescription = sanitizedDescription.replace(/<br\s*\/?>/gi, '\n'); // Menggantikan <br> dengan newline
    sanitizedDescription = sanitizedDescription.replace(/<\/?i>/gi, ''); // Menghapus tag <i>

    return sanitizedDescription;
  };

  // Bangun URL Anime menggunakan ID anime dari AniList
  const animeUrl = `https://anilist.co/anime/${anime.id}`;

  return (
    <div className="relative bg-white p-4 rounded-lg w-full max-w-4xl mx-4 sm:mx-0 max-h-[90vh] overflow-auto">
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="bg-gray-200 p-2 flex justify-center items-center">
        <img src={anime.coverImage.large} alt={anime.title.romaji} className="modal-image" />
        </div>
        <div className="p-4 flex flex-col justify-between">
        <h2>{anime.title.romaji}</h2>
        <p><strong>Description:</strong> {cleanDescription(anime.description)}</p> {/* Menggunakan cleanDescription */}
        <p><strong>Episodes:</strong> {anime.episodes}</p>
        <p><strong>Genres:</strong> {anime.genres ? anime.genres.join(', ') : 'N/A'}</p>
        <p><strong>Status:</strong> {anime.status}</p>
        <p><strong>Rating:</strong> {anime.averageScore}</p>
        {/* Tampilkan Link URL Anime */}
        <p><strong>Link:</strong> <a href={animeUrl} target="_blank" rel="noopener noreferrer">{animeUrl}</a></p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AnimeModal;
