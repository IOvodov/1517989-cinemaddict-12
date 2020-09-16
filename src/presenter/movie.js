import FilmCard from "../view/film-card.js";
import FilmDetails from "../view/film-details.js";
import {renderElement, replace, remove} from "../utils/render.js";

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
    this._filmDetailsComponent = null;

    this._mode = Mode.DEFAULT;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init(filmCard) {
    this._filmCard = filmCard;
    let {comments} = filmCard;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCard(filmCard);
    this._filmDetailsComponent = new FilmDetails(filmCard, comments);

    this._filmCardComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setClosePopupClickHandler(this._handleClosePopupClick);
    this._filmDetailsComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setHandleCommentSubmit(this._handleFormSubmit);

    if (!prevFilmCardComponent || !prevFilmDetailsComponent) {
      renderElement(this._movieListContainer, this._filmCardComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._mode === Mode.POPUP) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._hideFilmDetails();
    }
  }

  _handleOpenPopupClick() {
    this._showFilmDetails();
    document.body.classList.add(`hide-overflow`);
  }

  _handleClosePopupClick() {
    this._hideFilmDetails();
    document.body.classList.remove(`hide-overflow`);
  }

  _handleWatchlistClick() {
    this._filmChangeData(
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
        Object.assign(
            {},
            this._filmCard,
            {
              isFavorite: !this._filmCard.isFavorite
            }
        )
    );
  }

  _showFilmDetails() {
    replace(this._filmDetailsComponent, this._filmCardComponent);
    this._filmChangeMode();
    this._mode = Mode.POPUP;
  }

  _hideFilmDetails() {
    replace(this._filmCardComponent, this._filmDetailsComponent);
    this._mode = Mode.DEFAULT;
  }

  _handleFormSubmit(comment) {
    this._filmChangeData(
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
  }
}
