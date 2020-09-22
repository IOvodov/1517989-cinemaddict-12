export const sortFilmDate = (firstFilm, secondFilm) => {
  return firstFilm.releaseDate - secondFilm.releaseDate;
};

export const sortFilmRating = (firstFilm, secondFilm) => {
  return firstFilm.rating - secondFilm.rating;
};
