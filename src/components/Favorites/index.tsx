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

  return (
    <div className="py-4 px-8">
      <h1 className="mb-2 font-semibold text-lg">Your Favorites</h1>
      <div className="grid grid-cols-4 gap-4">
        {favorites.map(({ id, poster_path, title, vote_average }, index) => (
          <div key={index}>
            <MovieCard
              id={id}
              poster_path={poster_path}
              title={title}
              vote_average={vote_average}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
