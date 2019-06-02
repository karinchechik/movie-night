import MoviePreview from "./MoviePreview";
import styled from "@emotion/styled";
import React from "react";

const MovieGrid = ({ movies }) => {
  return (
      <MovieGridContainer>
          {movies.map(movie => <MoviePreview movie={movie}/>)}
      </MovieGridContainer>
  )
};

const MovieGridContainer = styled.div`
  display: flex;  
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export default MovieGrid;