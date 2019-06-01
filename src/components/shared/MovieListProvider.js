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
