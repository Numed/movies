import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMovieDetails, fetchRecommendations } from "../../service";
import { MovieType } from "../../types";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md"; // Додаємо заповнену іконку для обраного

type MovieDetailType = {
  title: string;
  release_date: string;
  homepage: string;
  overview: string;
  backdrop_path: string;
  genres: MovieDetailGenres[];
};

type MovieDetailGenres = {
  id: number;
  name: string;
};

type MovieRecommendationType = Omit<MovieType, "vote_average">;

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [recommendations, setRecommendations] = useState<
    MovieRecommendationType[]
  >([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id)
        .then((data) => setMovie(data))
        .catch((e) => console.error(e));
      fetchRecommendations(id).then((response) => setRecommendations(response));
    }
  }, [id]);

  useEffect(() => {
    if (movie) {
      let favoritesList = localStorage.getItem("favorites");
      let favorites = favoritesList ? JSON.parse(favoritesList) : [];
      const isMovieInFavorites = favorites.some(
        (fav: MovieDetailType) => fav.title === movie.title
      );
      setIsFavorite(isMovieInFavorites);
    }
  }, [movie]);

  const addToFavorites = () => {
    if (movie) {
      let favoritesList = localStorage.getItem("favorites");
      let favorites = favoritesList ? JSON.parse(favoritesList) : [];

      if (!isFavorite) {
        favorites.push(movie);
        setIsFavorite(true);
      } else {
        favorites = favorites.filter(
          (fav: MovieDetailType) => fav.title !== movie.title
        );
        setIsFavorite(false);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  return (
    <div className="py-4 px-8">
      {movie && (
        <div>
          <img
            className="w-full object-cover"
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
          />
          <div>
            <div className="mt-4 flex items-start justify-between mb-4">
              <div>
                <h1>
                  Title:{" "}
                  <span className=" text-blue-500 text-lg">{movie.title}</span>
                </h1>
                <h3>
                  Release date:{" "}
                  <span className="font-semibold text-blue-500">
                    {movie.release_date}
                  </span>
                </h3>
                <h2>
                  The homepage:
                  <Link
                    to={movie.homepage}
                    target="_blank"
                    className="ml-2 text-blue-400"
                  >
                    {movie.homepage}
                  </Link>
                </h2>
              </div>
              <div>
                <div>
                  <h3 className="font-semibold text-blue-500">Genres: </h3>
                  <ul className="list-disc">
                    {movie.genres.map(({ id, name }) => (
                      <li key={id} className="text-blue-400">
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                className={`flex items-center justify-center py-2 px-8 transition-colors ${
                  isFavorite ? "bg-blue-600" : "bg-blue-300 hover:bg-blue-400"
                } text-white`}
                onClick={addToFavorites}
              >
                {isFavorite ? (
                  <>
                    <MdFavorite className="mr-2" /> Already added to Favorites
                  </>
                ) : (
                  <>
                    <MdFavoriteBorder className="mr-2" /> Add to Favorites
                  </>
                )}
              </button>
            </div>
            <div>
              <h3 className="text-lg text-blue-500 mb-2 font-semibold">
                Description:{" "}
              </h3>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      )}
      <div className="mt-2">
        <h2 className="my-2 font-semibold text-xl">Recommended Movies</h2>
        <div className="grid grid-cols-4 gap-4">
          {recommendations.map(({ id, poster_path, title }) => (
            <Link
              to={`/movie/${id}`}
              key={id}
              className="bordr border-zinc-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
              />
              <p className="mt-2 text-lg font-semibold">{title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
