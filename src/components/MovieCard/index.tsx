import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

type MovieCardProps = {
  id: number;
  title: string;
  vote_average: string;
  poster_path: string;
};

const MovieCard = ({
  id,
  title,
  vote_average,
  poster_path,
}: MovieCardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const favoritesList = localStorage.getItem("favorites");
    const favorites = favoritesList ? JSON.parse(favoritesList) : [];
    const isMovieInFavorites = favorites.some(
      (fav: { id: number }) => fav.id === id
    );
    setIsFavorite(isMovieInFavorites);
  }, [id]);

  const toggleFavorite = () => {
    let favoritesList = localStorage.getItem("favorites");
    let favorites = favoritesList ? JSON.parse(favoritesList) : [];

    if (!isFavorite) {
      favorites.push({ id, title, vote_average, poster_path });
      setIsFavorite(true);
    } else {
      favorites = favorites.filter((fav: { id: number }) => fav.id !== id);
      setIsFavorite(false);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div className="border border-zinc-300">
      <Link to={`/movie/${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-blue-500">{title}</h3>
          <p className="mt-2">
            Rating:{" "}
            <span className="text-blue-400 font-semibold">{vote_average}</span>
          </p>
        </div>
      </Link>
      <button
        className={`flex items-center justify-center py-2 px-8 w-full transition-colors ${
          isFavorite ? "bg-blue-600" : "bg-blue-300 hover:bg-blue-400"
        } text-white`}
        onClick={toggleFavorite}
      >
        {isFavorite ? (
          <>
            <MdFavorite className="mr-2" /> Added to Favorites
          </>
        ) : (
          <>
            <MdFavoriteBorder className="mr-2" /> Add to Favorites
          </>
        )}
      </button>
    </div>
  );
};

export default MovieCard;
