# Movie Night - React Ladies
- Our goal: Understand React, get practical skills 
- Get real-world knowledge and techniques.

## Chapter I: React Concepts
- React core concepts
- Demystify JSX
- Essential modern JavaScript
  - Destructuring Objects and arrays
  - Template strings
  - `const`, `let`
  - ternary operator
  - `Array​.prototype​.map`
  - import / export, default vs named

## Chapter II: Project Setup & Essential dependencies 
- Generate new react project: 
  - `npx create-react-app movie-night`
  - npx run install scripts without polluting your hard drive
- Open the project on your editor
  - Free editor: https://code.visualstudio.com/
  - My favorite: https://www.jetbrains.com/webstorm/
- clean files:
  - remove: `app.css`, `app.test.js`, `index.css`, `logo.svg`, `serviceWorker.js`
  - remove: `import './index.css';` from `index.js`
  - remove: `import * as serviceWorker from './serviceWorker';` and `serviceWorker.unregister();` from `index.js`
  - remove: `import './App.css';` from `app.js`
  - remove: `import logo from './logo.svg';` from `app.js`
  - refactor `app.js`:

```javascript
  import React from 'react';

  function App() {
    return <h1>Movie Night</h1>;
  }

  export default App;
```
- Install React Router: 
  - `npm i react-router-dom`
  - docs: https://reacttraining.com/react-router/web
- Install emotion
  - `npm i @emotion/styled @emotion/core`
  - CSS in JavaScript library
- Starter Folder structure (starter point - opinionated)
  - components folder: UI elements
    - pages
    - shared
  - services folder: helpers functions & other logic 
  - hooks folder: reusable stateful logic
  - config folder: optional - holds constants

## Chapter III: Movie Night App
#### Get free API Keys 
- Get you api key for movies data
  - Go to: http://www.omdbapi.com/apikey.aspx
  - Choose free, enter your email
  - Test it in: http://www.omdbapi.com/?apikey=<YOUR_KEY>&s=man

#### Build your API service: 
- explain `fetch` api: 
  - docs: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

__services/api.js__
```javascript
  const BASE_URL='http://www.omdbapi.com/';
  const API_KEY='8e24a172';

  export function apiRequest({path, method = 'GET'}) {
    const url = BASE_URL + `?apikey=${API_KEY}` + path;

    return fetch(url, {method}).then(response => response.json())
  }
```
- open discussion
  - Destructure + default values
  - Where to put variables that we want to protect?
  - Introduce the concept of .env file

__services/api.js__
```javascript
const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
```

__.env__
```text
  REACT_APP_BASE_URL=http://www.omdbapi.com/'
  REACT_APP_API_KEY=8e24a172
```

#### Base pages & routing
- create directory under `components` named: `pages`
  - create `movies.js`, `movie.js`, `favorites.js`
  - Each one should be a `function` component:
  ``` javascript
  import React from 'react';

  const Movies = () => {
    return (
        <div>
          <h2>Movies</h2>
        </div>
    );
  };

  export default Movies;
  ```

- Refactor `app.js`
  - Introduce the concept of declarative routing
  - Define routing in `app.js`:
  ``` javascript
  function App() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/movies" component={Movies} />
            <Route path="/movies/:id" component={Movie} />
            <Route path="/favorites" component={Favorites} />

            <Redirect from="/" to="/movies" />
          </Switch>
        </BrowserRouter>
    )
  }
  ```

Here is your key: 8e24a172
http://www.omdbapi.com/?apikey=8e24a172&s=man


#### Consuming API in movies page

- describe the flow:
  - when component loads: fetch movies data
  - save it on local state to trigger render
  - render it with react element
- fetch api as a side effect:
  - use the `useState` to holds the movies data
  __components/movies.js__
  ```javascript
  const Movies = () => {
    const [movies, setMovies] = useState([]);

    return (
        <div>
          <h2>Movies</h2>
          <pre>{JSON.stringify(movies)}</pre>
        </div>
    );
  };
  ```
  - use the `useEffect` hook to fetch data when component loads
  __components/movies.js__
  ```javascript
    useEffect( () => {
      const moviesData = apiRequest({path: '&s=man'});
      moviesData.then( data =>  setMovies(data.Search))
    }, []);
  ```

- Our first shared components: `Loading.js` and `NoResults.js`
  - create a `shared` folder under `components`
  - __components/shared/Loading.js__
  ```javascript
  import React from 'react';

  const Loading = () => {
    return (
        <div>
          <h3>Loading...</h3>
        </div>
    );
  };

  export default Loading;
  ```
  - Use styled components to make it pretty
  ```javascript
  import React from 'react';
  import styled from "@emotion/styled";

  const Loading = () => {
    return (
        <LoadingContainer>
          <Loader>Loading...</Loader>
        </LoadingContainer>
    );
  };

  const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
  `;

  const Loader = styled.div`
    font-size: 32px;
    color: pink
  `;
  ```
  - build a `NoResults` component
  ```javascript
  import React from 'react';
  import styled from "@emotion/styled";

  const NoResults = () => {
    return (
        <LoadingContainer>
          <Loader>No results. please try another search term!</Loader>
        </LoadingContainer>
    );
  };

  const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
  `;

  const Loader = styled.div`
    font-size: 32px;
    color: blue
  `;

  export default NoResults;
  ```
- It's the same component!
  - classic use-case for generic component
  __components/shared/ApiState.js__
  ```javascript
  const ApiState = ({ message }) => {
    return (
        <LoadingContainer>
          <Loader>{message}</Loader>
        </LoadingContainer>
    );
  };

  const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
  `;

  const Loader = styled.div`
    font-size: 32px;
    color: darkgray;
  `;

  export default ApiState;
  ``` 
- Refactor `movies` components with conditional rendering 
__movies.js__
```javascript
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const moviesData = apiRequest({path: '&s=man'});

    moviesData.then(data => {
      setMovies(data.Search);
      setLoading(false);
    })

  }, []);

    return (
        <div>
          <h2>Movies</h2>
          <input type="text" onKeyDown={search}/>
          { loading ? <ApiState message="Loading..."/>
          : movies.length < 1 ? <ApiState message="No results."/>
          :<pre>{JSON.stringify(movies, 1, 1)}</pre> }
        </div>
    );
};
```

#### Adding search capabilities
- introduce an `input` and `search` function
  __movies.js__
  ```javascript
  import React, {useState} from 'react';
  import {apiRequest} from "../../services/api";
  import ApiState from "../shared/ApiState";

  const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const getResults = (searchTerm) => {
      setLoading(true);

      const moviesData = apiRequest({path: `&s=${searchTerm}`});

      moviesData.then(data => {
        setMovies(data.Search);
        setLoading(false);
      })
    };

    const search = ({which, target}) => {
      if (which === 13) {
        getResults(target.value)
      }
    };

    return (
        <div>
          <h2>Movies</h2>
          <input type="text" onKeyDown={search}/>
          { loading ? <ApiState message="Loading..."/>
          : movies.length < 1 ? <ApiState message="No results."/>
          :<pre>{JSON.stringify(movies, 1, 1)}</pre> }
        </div>
    );
  };

  export default Movies;
  ```

#### Building more styled components
- we have a lot of pages. let's create a `Layout.js` styled component
__components/shared/Page.js__
```javascript
  import styled from "@emotion/styled";

  export const Page = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding-top: 25px;  
  `;

  export const PageTitle = styled.div`
    font-size: 38px;
    color: black;
    text-transform: uppercase;
    margin: 25px 0;
  `;
```

- back to __movies.js__ let's use the `Page` component and style the search input
__movies.js__
```javascript

  <Page>
    <PageTitle>Movie Night</PageTitle>
    <Search type="text" onKeyDown={search}/>
    { loading ? <ApiState message="Loading..."/>
    : movies.length < 1 ? <ApiState message="No results."/>
    :<pre>{JSON.stringify(movies, 1, 1)}</pre> }
  </Page>


  const Search = styled.input`
      width: 400px;
      height: 40px;
      border-radius: 20px;
      padding: 5px 25px;
      font-size: 22px;
      outline: none;
      margin: 15px 0;
  `;
```


#### The `MoviePreview.js` component
- Let's build a component to display a single movie
__components/shared/MoviePreview.js__
```javascript
  import React from 'react';

  const MoviePreview = ({ movie }) => {
    const {Title, Year, imdbID, Poster} = movie;

    return (
        <div>
          <img src={Poster} alt=""/>
          <h2>{Title}</h2>
          <h3>{Year}</h3>
        </div>
    );
  };

  export default MoviePreview;
```

- now, we can use it on `Movies` component
__movies.js__
```jsx
      <Page>
        <PageTitle>Movie Night</PageTitle>
        <Search type="text" onKeyDown={search} />
        { loading ? <ApiState message="Loading..."/>
        : movies.length < 1 ? <ApiState message="No results."/>
        : movies.map( movie => <MoviePreview movie={movie}/>)
        }
      </Page>
```

- let's make this code readable and add some styling
- plus, a full back to empty array

```javascript
  const renderMovies = () => {
    return (
      <MovieGrid>
        { (movies || []).map( movie => <MoviePreview movie={movie}/>) }
      </MovieGrid>
    )
  };

  const render = (
      <Page>
      <PageTitle>Movie Night</PageTitle>
      <Search type="text" onKeyDown={search}/>
      {loading ? <ApiState message="Loading..."/>
          : movies ? renderMovies() : <ApiState message="No results."/>
      }
    </Page>
  )

  const MovieGrid = styled.div`
      display: flex;  
      flex-wrap: wrap;
      justify-content: space-evenly;
  `;
```

- last step, let's add a link from the movie preview 

```javascript
  const MoviePreview = ({movie}) => {
    const {Title, Year, imdbID, Poster} = movie;

    return (
        <DetailsLink to={`/movies/${imdbID}`}>
          <img src={Poster} alt=""/>
          <h2>{Title}</h2>
          <h3>{Year}</h3>
        </DetailsLink>
    );
  };

  const DetailsLink = styled(Link)`
    display: block;
    text-decoration: none;
  `;
```

#### The Movie Details page
- first, we need to get the id from the url

```javascript
const Movie = ({ match }) => {
  const movieId = match.params.id;

  return (
      <Page>
        <PageTitle>Movie details</PageTitle>
      </Page>
  );
};
```
- discussion: all the logic live in Movies component. use case for custom hook

__hooks/useMoviesApi.js__
```javascript
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
```

- Let's reuse this logic on the singe `Movie` component

__Movie.js__
```javascript
const Movie = ({match}) => {
  const movieId = match.params.id;
  const {movies, getResults} = useMoviesApi(true);

  useEffect(() => {
    getResults(movieId)
  }, []);

  if (!movies) return null

  return (
      <Page>
        <PageTitle>Movie details</PageTitle>
        <PreviewContainer>
          <MoviePreview movie={movies}/>
        </PreviewContainer>
      </Page>
  );
};

const PreviewContainer = styled.div`
  width: 300px;
`;

export default Movie;
```

- to reuse the MoviePreview component, we need to refactor it

```javascript
  const MoviePreview = ({movie}) => {
    const {Title, Year, imdbID, Poster, Plot} = movie;
    
    return (
        <DetailsLink to={`/movies/${imdbID}`}>
          <img src={Poster} alt=""/>
          <h2>{Title}</h2>
          <h3>{Year}</h3>
          {Plot && <p>{Plot}</p>}
        </DetailsLink>
    );
  };
```

- Let's code review what we done so far and see what can be approved
- Add navigation links, discuss strategics and patterns
- Answer all open questions

#### Manage global scope - favorite component
- Explain the concept of `context`
- Explain the problem: maintain state between components
- Let's create a favorite context and wrapper provider

__MovieListProvider.js__
```javascript
import React, {createContext, useState} from 'react';

export const ListContext = createContext();

const MovieListProvider = ({children}) => {
  const [list, setList] = useState([]);

  const addMovie = (movie) => {
    setList([...list, movie]);
  };

  return (
      <ListContext.Provider value={{list, addMovie}}>
        {children}
      </ListContext.Provider>
  );
};

export default MovieListProvider;
```

- lets consume the provider from the movie component

__Movie.js__
```javascript
const {addMovie} = useContext(ListContext);

<button onClick={() => addMovie(movies)}>add to list</button>
```

- same for the Favorite component
__Favorite.js__
```javascript
const Favorites = () => {
  const {list} = useContext(ListContext);

  return (
      <div>
        <h2>Favorites</h2>
        <pre>{JSON.stringify(list, 1, 1)}</pre>
      </div>
  );
};
```

#### Your turn!
- Extract and reuse the movie a movie grid component on favorites
- Add navigation links all around
- Implement remove video from list
- Ask questions! A lot of them!

#### Wrap up and code review
- What we covered - and what not
- How to get more advanced


