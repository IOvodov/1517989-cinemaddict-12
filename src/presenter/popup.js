import {UpdateType, UserAction} from "../const.js";
import FilmDetails from "../view/film-details.js";
import {renderElement, replace, remove} from "../utils/render.js";

export default class PopupPresenter {
  constructor(movieListContainer, changeData, changeMode, api) {
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmDetailsComponent = null;

    this._api = api;

    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
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
    this._filmDetailsComponent.setDeleteCommentClickHandler(this._handleDeleteClick);

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

  _getLastComment(comments) {
    let newComment = null;

    const currentComments = this._commentsModel.getComments();

    if (currentComments.length === 0) {
      return comments[0];
    }

    const currentCommentsIds = currentComments.map((comment) => comment.id);

    comments.forEach((comment) => {
      if (!currentCommentsIds.includes(comment.id)) {
        newComment = comment;
      }
    });

    return newComment;

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
    this._api.addComment(comment)
      .then((response) => {
        const newComment = this._getLastComment(response);
        this._commentsModel.addComment(UpdateType.ADD_COMMENT, newComment);
      })
      .catch(() => {
        this._filmDetailsComponent.updateData({}, false);
      })
  }

  _handleDeleteClick(comment) {
    this._api.deleteComment(comment)
      .then(() => {
        this._commentsModel.deleteComment(UpdateType.DELETE_COMMENT, comment);
      })
      .catch(() => {
        this._filmDetailsComponent.updateData({}, false);
      });

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
