const filmToFilterMap = {
  watchList: (films) => films.filter((film) => film.isWatchList).length,
  history: (films) => films.filter((film) => film.isWatched).length,
  favorites: (films) => films.filter((film) => film.isFavorite).length
};

export const generateFilmsFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, filmsCount]) => {
    return {
      title: filterName,
      count: filmsCount(films)
    };
  });
};
