import React from 'react';
import ApiState from "../shared/ApiState";
import {Page, PageTitle} from "../shared/Layout";
import {useMoviesApi} from "../../hooks/use-movies-api";
import MovieGrid from "../shared/MovieGrid";
import styled from "@emotion/styled";

const Movies = () => {
  const {movies, loading, getResults} = useMoviesApi();

  const search = ({which, target}) => {
    if (which === 13) {
      getResults(target.value)
    }
  };

  return (
      <Page>
        <PageTitle>Movie Night</PageTitle>
        <Search type="text" onKeyDown={search}/>
        {loading ? <ApiState message="Loading..."/>
            : movies ? <MovieGrid movies={movies} />
            : <ApiState message="No results."/>}
      </Page>
  );
};



const Search = styled.input`
    width: 400px;
    height: 40px;
    border-radius: 20px;
    padding: 5px 25px;
    font-size: 22px;
    outline: none;
    margin: 15px 0;
`;

export default Movies;