import {UpdateType, UserAction} from "../const.js";
import FilmDetails from "../view/film-details.js";
import {renderElement, replace, remove} from "../utils/render.js";

export default class PopupPresenter {
  constructor(movieListContainer, changeData, changeMode) {
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmDetailsComponent = null;

    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(filmCard, model) {
    this._filmCard = filmCard;
    this._commentsModel = model;

    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmDetailsComponent = new FilmDetails(filmCard, this._commentsModel.getComments());

    this._filmDetailsComponent.setClosePopupClickHandler(this._handleClosePopupClick);
    this._filmDetailsComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setHandleCommentSubmit(this._handleCommentSubmit);

    if (!prevFilmDetailsComponent) {
      document.addEventListener(`keydown`, this._escKeyDownHandler);
      renderElement(this._movieListContainer, this._filmDetailsComponent);
      return;
    }

    document.addEventListener(`keydown`, this._escKeyDownHandler);
    replace(this._filmDetailsComponent, prevFilmDetailsComponent);

    remove(prevFilmDetailsComponent);
  }

  destroy() {
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    remove(this._filmDetailsComponent);
  }

  _hideFilmDetails() {
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
  }

  _handleWatchlistClick(changedData) {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._filmCard,
            changedData
        )
    );

    this._filmDetailsComponent.setWatchlistClickHandler(this._handleWatchlistClick);
  }

  _handleWatchedClick(changedData) {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._filmCard,
            changedData
        )
    );
  }

  _handleFavoriteClick(changedData) {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._filmCard,
            changedData
        )
    );
  }

  _handleCommentSubmit(comment) {
    this._commentsModel.addComment(UpdateType.MINOR, comment);
  }

  _handleClosePopupClick() {
      this._hideFilmDetails();
  }

  _escKeyDownHandler(event) {
    if (event.key === `Escape` || event.key === `Esc`) {
      event.preventDefault();
      this._hideFilmDetails();
    }
  }
}
