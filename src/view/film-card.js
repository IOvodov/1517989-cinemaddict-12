import AbstractView from "./abstract.js";
import {formatDuration, formatReleaseYear} from "../utils/film-card.js";

const isControlsItemActive = (flag) => flag ? `film-card__controls-item--active` : ``;

const createFilmCardTemplate = (filmCard) => {
  const {
    filmTitle,
    rating,
    releaseDate,
    duration,
    genres,
    poster,
    description,
    comments,
    isWatched,
    isFavorite,
    isWatchList
  } = filmCard;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmTitle}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatReleaseYear(releaseDate)}</span>
        <span class="film-card__duration">${formatDuration(duration)}</span>
        <span class="film-card__genre">${genres[0] || ``}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isControlsItemActive(isWatchList)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  ${isControlsItemActive(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isControlsItemActive(isFavorite)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(filmCard) {
    super();

    this._filmCard = filmCard;
    this._filmCardClickableElements = this.element.querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`);
    this._watchListBtn = this.element.querySelector(`.film-card__controls-item--add-to-watchlist`);
    this._watchedBtn = this.element.querySelector(`.film-card__controls-item--mark-as-watched`);
    this._favoriteBtn = this.element.querySelector(`.film-card__controls-item--favorite`);

    this._clickHandler = this._clickHandler.bind(this);
    this._watchListBtnClickHandler = this._watchListBtnClickHandler.bind(this);
    this._watchedBtnClickHandler = this._watchedBtnClickHandler.bind(this);
    this._favoriteBtnClickHandler = this._favoriteBtnClickHandler.bind(this);
  }

  get template() {
    return createFilmCardTemplate(this._filmCard);
  }

  _clickHandler(event) {
    event.preventDefault();
    this._handlers.click();
  }

  setOpenPopupClickHandler(callback) {
    this._handlers.click = callback;
    this._filmCardClickableElements.forEach((elem) => {
      elem.addEventListener(`click`, this._clickHandler);
    });
  }

  _watchListBtnClickHandler(event) {
    event.preventDefault();
    this._handlers.watchListBtnClick();
  }

  setWatchlistClickHandler(callback) {
    this._handlers.watchListBtnClick = callback;
    this._watchListBtn.addEventListener(`click`, this._watchListBtnClickHandler);
  }

  _watchedBtnClickHandler(event) {
    event.preventDefault();
    this._handlers.watchedBtnClick();
  }

  setWatchedClickHandler(callback) {
    this._handlers.watchedBtnClick = callback;
    this._watchedBtn.addEventListener(`click`, this._watchedBtnClickHandler);
  }

  _favoriteBtnClickHandler(event) {
    event.preventDefault();
    this._handlers.favoriteBtnClick();
  }

  setFavoriteClickHandler(callback) {
    this._handlers.favoriteBtnClick = callback;
    this._favoriteBtn.addEventListener(`click`, this._favoriteBtnClickHandler);
  }

  removeElement() {
    this._filmCardClickableElements.forEach((elem) => {
      elem.removeEventListener(`click`, this._clickHandler);
    });

    super.removeElement();
  }
}
