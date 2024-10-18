import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchRecommendations } from "../../service";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id)
        .then((data) => setMovie(data))
        .catch((e) => console.error(e));
      fetchRecommendations(id).then((response) => setRecommendations(response));
    }
  }, [id]);

  const addToFavorites = () => {
    if (movie) {
      let favoritesList = localStorage.getItem("favorites");
      let favorites = favoritesList ? JSON.parse(favoritesList) : [];
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  return (
    <div>
      {movie && (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <button onClick={addToFavorites}>Add to Favorites</button>
        </div>
      )}
      <h2>Recommended Movies</h2>
      <div className="movie-grid">
        {recommendations.map((rec) => (
          <div key={rec.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
              alt={rec.title}
            />
            <p>{rec.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
