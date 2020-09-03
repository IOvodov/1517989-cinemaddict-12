import FilmCard from "../view/film-card.js";
import FilmDetails from "../view/film-details.js";
import {renderElement, addChild, deleteChild, remove} from "../utils/render.js";

export default class MoviePresenter {
  constructor(boardContainer, movieListContainer, changeData) {
    this._boardContainer = boardContainer;
    this._movieListContainer = movieListContainer;
    this._filmChangeData = changeData;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(filmCard) {
    console.log('container', this._movieListContainer);
    this._filmCard = filmCard;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;
    // console.log(this._filmCard);
    // console.log(prevFilmCardComponent);
    // console.log(prevFilmDetailsComponent);

    this._filmCardComponent = new FilmCard(filmCard);
    this._filmDetailsComponent = new FilmDetails(filmCard);

    this._filmCardComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);
    this._filmDetailsComponent.setClosePopupClickHandler(this._handleClosePopupClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (!prevFilmCardComponent && !prevFilmDetailsComponent) {
      renderElement(this._movieListContainer, this._filmCardComponent);
      return;
    }

    console.log(this._movieListContainer);

    if (this._movieListContainer.contains(prevFilmCardComponent.element)) {
      deleteChild(prevFilmCardComponent);
      addChild(this._movieListContainer, this._filmCardComponent);
    }

    if (this._boardContainer.contains(prevFilmDetailsComponent.element)) {
      deleteChild(prevFilmDetailsComponent);
      addChild(this._boardContainer, this._filmDetailsComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  }

  _handleOpenPopupClick() {
    this._showFilmDetails();
    document.body.classList.add(`hide-overflow`);
  }

  _handleClosePopupClick(filmCard) {
    this._hideFilmDetails();
    document.body.classList.remove(`hide-overflow`);
  }

  _handleWatchlistClick() {
    console.log('fard', this._filmCard);
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
    addChild(this._boardContainer, this._filmDetailsComponent);
  };

  _hideFilmDetails() {
    deleteChild(this._filmDetailsComponent);
  };
}
