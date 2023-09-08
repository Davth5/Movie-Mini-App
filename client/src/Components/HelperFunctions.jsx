export function filterMoviesByTitle(movies, title) {
  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(title.toLowerCase())
  );
}

export function addMovieToList(movies, title) {
  return [...movies, { title, watched: false }];
}


export function deleteMovieFromList(movies, title) {
  return movies.filter((movie) => movie.title !== title);
}

