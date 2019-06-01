import React from 'react';
import {Link} from 'react-router-dom';
import styled from "@emotion/styled";

const MoviePreview = ({movie}) => {
  const {Title, Year, imdbID, Poster, Plot} = movie;

  return (
      <DetailsLink to={`/movies/${imdbID}`}>
        <img src={Poster} alt=""/>
        <h2>{Title}</h2>
        <h3>{Year}</h3>
        {Plot && <PlotText>{Plot}</PlotText>}
      </DetailsLink>
  );
};

const PlotText = styled.div`
  width: 300px;
`

const DetailsLink = styled(Link)`
  display: block;
  text-decoration: none;
  margin-bottom: 25px;
`;

export default MoviePreview;