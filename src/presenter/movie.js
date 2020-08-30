import FilmCard from "../view/film-card.js";
import FilmDetails from "../view/film-details.js";
import {renderElement, addChild, deleteChild} from "../utils/render.js";

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

    this._filmCardComponent = new FilmCard(this._filmCard);
    this._filmDetailsComponent = new FilmDetails(this._filmCard);

    this._filmCardComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);
    this._filmDetailsComponent.setClosePopupClickHandler(this._handleClosePopupClick);

    renderElement(this._movieListContainer, this._filmCardComponent);
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
