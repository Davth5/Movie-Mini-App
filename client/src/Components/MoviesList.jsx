import React, { useState, useEffect } from "react";
import AddMovie from "./MovieAdd";
import SearchBar from "./MovieSearchBar";
import {
  filterMoviesByTitle,
  addMovieToList,
  deleteMovieFromList,
} from "./HelperFunctions";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [userAddedMovies, setUserAddedMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/movies`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching");
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const displayedMovies = searchTerm
    ? filterMoviesByTitle(movies, searchTerm)
    : userAddedMovies;

  const deleteMovieHandler = (movieTitle) => {
    setUserAddedMovies((prevMovies) =>
      deleteMovieFromList(prevMovies, movieTitle)
    );
  };

  const onAdd = (title) => {
    setMovies((prevMovies) => addMovieToList(prevMovies, title));
    setUserAddedMovies((prevMovies) => addMovieToList(prevMovies, title));
  };

  const toggleWatchedHandler = (movieTitle) => {
    setUserAddedMovies((prevMovies) => {
      return prevMovies.map((movie) =>
        movie.title === movieTitle
          ? { ...movie, watched: !movie.watched }
          : movie
      );
    });
  };

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      <AddMovie onAdd={onAdd} />
      <ul style={{ listStyleType: "none" }}>
        {displayedMovies.map((movie) => (
          <li key={movie.title}>
            {movie.title}
            <button onClick={() => deleteMovieHandler(movie.title)}>
              Delete
            </button>
            <button onClick={() => toggleWatchedHandler(movie.title)}>
              {movie.watched ? "Unwatch" : "Watched"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesList;
