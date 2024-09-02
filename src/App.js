// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimeList from './components/AnimeList';
import TopAnime from './components/TopAnime';
import TrendingNow from './components/TrendingNow';
import SearchResults from './components/SearchResults';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<AnimeList />} />
        <Route path="/top-anime" element={<TopAnime />} />
        <Route path="/trending-now" element={<TrendingNow />} />
        <Route path="/search" element={<SearchResults  />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
