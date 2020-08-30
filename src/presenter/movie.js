import FilmCard from "../view/film-card.js";
import FilmDetails from "../view/film-details.js";
import { renderElement, addChild, deleteChild } from "../utils/render.js";

export default class MoviePresenter {
  constructor(boardContainer, movieListContainer) {
    this._boardContainer = boardContainer;
    this._movieListContainer = movieListContainer;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
  }

  init(filmCard) {
    this._filmCard = filmCard;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCard(this._filmCard);
    this._filmDetailsComponent = new FilmDetails(this._filmCard);

    this._filmCardComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);
    this._filmDetailsComponent.setClosePopupClickHandler(this._handleClosePopupClick);

    if (!prevFilmCardComponent && !prevFilmDetailsComponent) {
      renderElement(this._movieListContainer, this._filmCardComponent);
      return;
    }

    if (this._taskListContainer.element.contains(prevFilmCardComponent.element)) {
      deleteChild(prevFilmCardComponent);
      addChild(this._movieListContainer, this._filmCardComponent);
    }

    if (this._taskListContainer.element.contains(prevFilmDetailsComponent.element)) {
      deleteChild(prevFilmDetailsComponent);
      addChild(this._movieListContainer, this._filmDetailsComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  }

  _handleOpenPopupClick() {
    this._showFilmDetails();
    document.body.classList.add(`hide-overflow`);
  }

  _handleClosePopupClick() {
    this._hideFilmDetails();
    document.body.classList.remove(`hide-overflow`);
  }

  _showFilmDetails() {
    addChild(this._boardContainer, this._filmDetailsComponent);
  };

  _hideFilmDetails() {
    deleteChild(this._filmDetailsComponent);
  };
}
