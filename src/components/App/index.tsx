import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";

import MovieList from "../MovieList";
import MovieDetail from "../MovieDetail";
import SearchBar from "../SearchBar";
import Favorites from "../Favorites";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header className="py-4 px-8 flex items-start justify-between">
          <Link to="/" className="font-bold text-2xl">
            Movies
          </Link>
          <SearchBar />
          <Link
            to="/favorites"
            className="bg-blue-300 text-white px-6 py-2 flex items-center justify-start rounded-sm transition-colors hover:bg-blue-400"
          >
            <MdFavoriteBorder className="mr-2" />
            Favorites
          </Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
