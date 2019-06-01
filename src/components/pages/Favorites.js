import React, {useContext} from 'react';
import {ListContext} from "../shared/MovieListProvider";
import {Page, PageTitle, PreviewContainer} from "../shared/Layout";
import MovieGrid from "../shared/MovieGrid";
import MoviePreview from "../shared/MoviePreview";

const Favorites = () => {
  const {list} = useContext(ListContext);

  return (
      <Page>
        <PageTitle>Favorites</PageTitle>
          <MovieGrid movies={list}/>
      </Page>
  );
};

export default Favorites;