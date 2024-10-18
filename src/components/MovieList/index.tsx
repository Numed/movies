import { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import { fetchPopularMovies } from "../../service";
import { MovieType } from "../../types";

const MovieList = () => {
  const [movies, setMovies] = useState<MovieType[] | []>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPopularMovies(page)
      .then((results) => setMovies((prevMovies) => [...prevMovies, ...results]))
      .catch((e) => console.error(e));
  }, [page]);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  console.log(movies);

  return (
    <div>
      <div className="movie-grid">
        {movies.map(({ id, poster_path, title, vote_average }) => (
          <MovieCard
            key={id}
            id={id}
            poster_path={poster_path}
            title={title}
            vote_average={vote_average}
          />
        ))}
      </div>
      <button onClick={loadMoreMovies}>Load More</button>
    </div>
  );
};

export default MovieList;
