import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Movies from "./components/pages/Movies";
import Movie from "./components/pages/Movie";
import Favorites from "./components/pages/Favorites";
import MovieListProvider from "./components/shared/MovieListProvider";

function App() {
  return (
      <BrowserRouter>
        <MovieListProvider>
          <Switch>
            <Route exact path="/movies" component={Movies}/>
            <Route path="/movies/:id" component={Movie}/>
            <Route path="/favorites" component={Favorites}/>

            <Redirect from="/" to="/movies"/>
          </Switch>
        </MovieListProvider>
      </BrowserRouter>
  )
}


export default App;
