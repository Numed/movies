import { Link } from "react-router-dom";

type MovieCardType = {
  id: number;
  title: string;
  vote_average: string;
  poster_path: string;
};

const MovieCard = ({ id, title, vote_average, poster_path }: MovieCardType) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
        <div className="movie-info">
          <h3>{title}</h3>
          <p>Rating: {vote_average}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
