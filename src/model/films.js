import Observer from "../utils/observer.js";

export default class FilmsModel extends Observer {
  constructor() {
    super();

    this._films = [];
  }

  setFilms(updateType, filmsList) {
    this._films = filmsList.slice();

    this._notifyListeners(updateType)
  }

  getFilms() {
    return this._films;
  }

  updateFilmCard(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film card`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notifyListeners(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          poster: film.film_info.poster,
          filmTitle: film.film_info.title,
          originalFilmTitle: film.film_info.alternative_title,
          rating: film.film_info.total_rating,
          releaseDate: new Date(film.film_info.release.date),
          duration: film.film_info.runtime,
          description: film.film_info.description,
          genres: film.film_info.genre,
          isWatched: film.user_details.already_watched,
          isFavorite: film.user_details.favorite,
          isWatchList: film.user_details.watchlist,
          watchingDate: film.user_details.watching_date,
          country: film.film_info.release.release_country,
          director: film.film_info.director,
          writers: film.film_info.writers,
          actors: film.film_info.actors,
          age: film.film_info.age_rating
        }
    );

    delete adaptedFilm.user_details;
    delete adaptedFilm.film_info;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
        {},
        {
          id: film.id,
          comments: film.comments,
          film_info: {
            actors: film.actors,
            age_rating: film.rating,
            alternative_title: film.originalFilmTitle,
            description: film.description,
            director: film.director,
            genre: film.genres,
            poster: film.poster,
            release: {
              date: film.releaseDate,
              release_country: film.country,
            },
            runtime: film.duration,
            title: film.filmTitle,
            total_rating: film.rating,
            writers: film.writers,
          },
          user_details: {
            watchlist: film.isWatchList,
            already_watched: film.isWatched,
            favorite: film.isFavorite,
            watching_date: film.watchingDate,
          }
        }
    );

    return adaptedFilm;
  }
}
