import FilmCard from "../view/film-card.js";
import {renderElement, replace, remove} from "../utils/render.js";
import {UpdateType, UserAction} from "../const.js";
import CommentsModel from "../model/comments.js";
import PopupPresenter from "./popup.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

export default class MoviePresenter {
  constructor(movieListContainer, changeData, changeMode) {
    this._movieListContainer = movieListContainer;
    this._filmChangeData = changeData;
    this._filmChangeMode = changeMode;

    this._filmCardComponent = null;

    this._popupPresenter = {};

    this._mode = Mode.DEFAULT;

    this._commentsModel = new CommentsModel();

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);

    this._isFirstInit = true;
  }

  init(filmCard) {
    this._filmCard = filmCard;

    if (this._isFirstInit) {
      this._commentsModel.setComments(this._filmCard.comments);
      this._isFirstInit = false;
    }

    this._commentsModel.addObserver(this._handleFormSubmit);

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCard(filmCard);

    this._filmCardComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (!prevFilmCardComponent) {
      renderElement(this._movieListContainer, this._filmCardComponent);
      return;
    }

    replace(this._filmCardComponent, prevFilmCardComponent);

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._popupPresenter.destroy();
    }

    this._mode = Mode.DEFAULT;
  }

  _showFilmDetails() {
    this._popupPresenter = new PopupPresenter(this._movieListContainer, this._filmChangeData, this._filmChangeMode);
    this._popupPresenter.init(this._filmCard, this._commentsModel);
  }

  _handleOpenPopupClick() {
    this._filmChangeMode();
    this._mode = Mode.POPUP;
    document.body.classList.add(`hide-overflow`);
    this._showFilmDetails();
  }

  _handleWatchlistClick() {
    this._filmChangeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._filmCard,
            {
              isWatchList: !this._filmCard.isWatchList
            }
        )
    );
  }

  _handleWatchedClick() {
    this._filmChangeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._filmCard,
            {
              isWatched: !this._filmCard.isWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._filmChangeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._filmCard,
            {
              isFavorite: !this._filmCard.isFavorite
            }
        )
    );
  }

  _handleFormSubmit(comment) {
    this._filmChangeData(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._filmCard,
            {
              comments: [
                ...this._filmCard.comments,
                comment
              ]
            }
        )
    );

    this._popupPresenter.init(this._filmCard, this._commentsModel);
  }

  _escKeyDownHandler(event) {
    if (event.key === `Escape` || event.key === `Esc`) {
      event.preventDefault();
      this._hideFilmDetails();
      document.body.classList.remove(`hide-overflow`);
    }
  }
}
