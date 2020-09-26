import Observer from "../utils/observer.js";

export default class FilmsModel extends Observer {
  constructor() {
    super();

    this._films = [];
  }

  setFilms(filmsList) {
    this._films = filmsList.slice();
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
}
