import Observer from "../utils/observer.js";

export default class FilmsModel extends Observer {
  constructor() {
    super();

    this._films = [];
  }

  set films(filmsList) {
    this._films = filmsList.slice();
  }

  get films() {
    return this._films;
  }
}
