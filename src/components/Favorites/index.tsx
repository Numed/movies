import { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import { MovieType } from "../../types";

const Favorites = () => {
  const [favorites, setFavorites] = useState<MovieType[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    setFavorites(favorites);
  }, []);

  const removeFromFavorites = (id: number) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Your Favorites</h1>
      <div className="movie-grid">
        {favorites.map(({ id, poster_path, title, vote_average }, index) => (
          <div key={index}>
            <MovieCard
              id={id}
              poster_path={poster_path}
              title={title}
              vote_average={vote_average}
            />
            <button onClick={() => removeFromFavorites(id)}>
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
