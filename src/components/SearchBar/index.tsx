import { useState, FormEvent } from "react";
import { CiSearch } from "react-icons/ci";
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
    <div className="flex flex-col items-center">
      <div>
        <form
          className="flex items-center justify-center"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="border border-zinc-400 py-1 px-4"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center justify-center ml-4 bg-zinc-400 text-white py-1 px-4 rounded-sm transition-colors hover:bg-zinc-500"
          >
            <CiSearch className="mr-2" /> Search
          </button>
        </form>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
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
