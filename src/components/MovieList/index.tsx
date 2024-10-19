import { useEffect, useState } from "react";
import { IoReloadOutline } from "react-icons/io5";

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

  return (
    <div className="px-8 py-2">
      <h2 className="mb-4 font-bold text-blue-500 text-2xl">
        Most popular films
      </h2>
      <div className="grid grid-cols-4 gap-4">
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
      <button
        className="flex w-[174px] justify-center items-center mx-auto mt-4 px-6 py-2 text-white rounded-md bg-blue-300 transition-colors hover:bg-blue-400"
        onClick={() => loadMoreMovies()}
      >
        <IoReloadOutline className="mr-2" />
        Load More
      </button>
    </div>
  );
};

export default MovieList;
