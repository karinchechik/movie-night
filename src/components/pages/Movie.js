import React, {useEffect, useContext} from 'react';
import {Page, PageTitle, PreviewContainer} from "../shared/Layout";
import {useMoviesApi} from "../../hooks/use-movies-api";
import MoviePreview from "../shared/MoviePreview";
import {ListContext} from "../shared/MovieListProvider";
import {Link} from "react-router-dom";

const Movie = ({match}) => {
  const movieId = match.params.id;
  const {movies, getResults} = useMoviesApi(true);
  const {addMovie} = useContext(ListContext);

  useEffect(() => {
    getResults(movieId)
  }, []);

  if (!movies) return null;

  return (
      <Page>
        <PageTitle>Movie details!</PageTitle>
        <PreviewContainer>
          <MoviePreview movie={movies}/>
          <button onClick={() => addMovie(movies)}>add to list</button>
          <Link to='/favorites'>Go to my list</Link>
        </PreviewContainer>
      </Page>
  );
};

export default Movie;