import { useState, FormEvent } from "react";
import MovieCard from "../MovieCard";
import { MovieType } from "../../types";
import { searchMovie } from "../../service";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MovieType[]>([]);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchMovie(query)
      .then((results) => setSearchResults(results))
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="movie-grid">
        {searchResults.map(({ id, poster_path, title, vote_average }) => (
          <MovieCard
            key={id}
            id={id}
            poster_path={poster_path}
            title={title}
            vote_average={vote_average}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
