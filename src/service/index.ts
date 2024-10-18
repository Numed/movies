import axios from "axios";

export const fetchPopularMovies = async (page: number) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/movie/popular`, {
    params: {
      api_key: process.env.REACT_APP_API_KEY,
      page: page,
    },
  });
  return response.data.results;
};

export const searchMovie = async (query: string) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/search/movie`, {
    params: {
      api_key: process.env.REACT_APP_API_KEY,
      query: query,
    },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (id: string) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}`, {
    params: {
      api_key: process.env.REACT_APP_API_KEY,
    },
  });

  return response.data;
};

export const fetchRecommendations = async (id: string) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/movie/${id}/recommendations`,
    {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    }
  );
  return response.data.results;
};
