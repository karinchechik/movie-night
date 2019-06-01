import {useState} from 'react';
import {apiRequest} from "../services/api";

export function useMoviesApi (single) {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);

  const getResults = (query) => {
    setLoading(true);

    const queryParams = `&${single ? 'i' : 's'}=${query}`;
    const moviesData = apiRequest({path: queryParams});

    moviesData.then(data => {
      const movieData = single ? data : data.Search;
      setMovies(movieData);
      setLoading(false);
    })
  };

  return {movies, loading, getResults}
}