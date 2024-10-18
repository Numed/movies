import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "../MovieList";
import MovieDetail from "../MovieDetail";
import SearchBar from "../SearchBar";
import Favorites from "../Favorites";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header>
          <SearchBar />
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
