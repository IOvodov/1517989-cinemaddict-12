import he from "he";
import {nanoid} from "nanoid";
import {EmojiType, FileFormat} from "../const.js";
import {formatCommentDate, formatDuration, formatReleaseDate} from "../utils/film-card.js";
import SmartView from "./smart.js";

export const Key = {
  ENTER: `Enter`,
  CONTROL: `Control`,
};

const generateFileName = (name, extension = FileFormat.PNG) => {
  const generatedName = name;

  return generatedName.concat(`.`, extension);
};

const isControlsItemActive = (flag) => flag ? `checked` : ``;

const createNewCommentTemplate = (emoji) => {
  const message = ``;
  let currentEmoji = emoji || EmojiType.SMILE;
  let currentCommentEmoji = emoji;

  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label" data-emoji="${currentCommentEmoji}">
        ${currentCommentEmoji ? `<img src="images/emoji/${generateFileName(currentCommentEmoji)}" width="55" height="55" alt="emoji-${currentCommentEmoji}"></img>` : ``}
      </div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${message}</textarea>
      </label>
      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${EmojiType.SMILE}" value="${EmojiType.SMILE}" ${currentEmoji === EmojiType.SMILE ? `checked` : ``}>
        <label class="film-details__emoji-label" for="emoji-${EmojiType.SMILE}">
          <img src="../images/emoji/${generateFileName(EmojiType.SMILE)}" alt="emoji" width="30" height="30">
        </label>
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${EmojiType.SLEEPING}" value="${EmojiType.SLEEPING}" ${currentEmoji === EmojiType.SLEEPING ? `checked` : ``}>
        <label class="film-details__emoji-label" for="emoji-${EmojiType.SLEEPING}">
          <img src="../images/emoji/${generateFileName(EmojiType.SLEEPING)}" alt="emoji" width="30" height="30">
        </label>
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${EmojiType.PUKE}" value="${EmojiType.PUKE}" ${currentEmoji === EmojiType.PUKE ? `checked` : ``}>
        <label class="film-details__emoji-label" for="emoji-${EmojiType.PUKE}">
          <img src="../images/emoji/${generateFileName(EmojiType.PUKE)}" alt="emoji" width="30" height="30">
        </label>
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${EmojiType.ANGRY}" value="${EmojiType.ANGRY}" ${currentEmoji === EmojiType.ANGRY ? `checked` : ``}>
        <label class="film-details__emoji-label" for="emoji-${EmojiType.ANGRY}">
          <img src="../images/emoji/${generateFileName(EmojiType.ANGRY)}" alt="emoji" width="30" height="30">
        </label>
      </div>
    </div>`
  );
};

const createCommentsTemplate = (comments) => {
  return comments.map((comment) => `<li class="film-details__comment" data-id=${comment.id}>
    <span class="film-details__comment-emoji">
      <img src="../images/emoji/${generateFileName(comment.emoji)}" alt="emoji-${comment.emoji}" width="55" height="55">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comment.message)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${formatCommentDate(comment.date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`).join();
};

const createFilmDetailsTemplate = (data = {}, comments) => {
  const {
    description,
    poster,
    filmTitle,
    originalFilmTitle,
    rating,
    age,
    director,
    writers,
    actors,
    releaseDate,
    duration,
    country,
    genres,
    isWatchList,
    isWatched,
    isFavorite,
    emoji = ``
  } = data;

  const actorsList = actors.map((actor) => `${actor}`).join(`, `);
  const writersList = writers.map((writer) => `${writer}`).join(`, `);
  const genresList = genres.map((genre) => `${genre}`).join(`, `);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">
              <p class="film-details__age">${age}</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmTitle}</h3>
                  <p class="film-details__title-original">${originalFilmTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writersList}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actorsList}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatReleaseDate(releaseDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formatDuration(duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    <span class="film-details__genre">${genresList}</span>
                  </td>
                </tr>
              </table>
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
          <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isControlsItemActive(isWatchList)}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isControlsItemActive(isWatched)}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isControlsItemActive(isFavorite)}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
            <ul class="film-details__comments-list">
              ${createCommentsTemplate(comments)}
            </ul>
            ${createNewCommentTemplate(emoji)}
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends SmartView {
  constructor(data, comments) {
    super();

    this._data = data;
    this._comments = comments;

    this._crossClickHandler = this._crossClickHandler.bind(this);
    this._watchListBtnClickHandler = this._watchListBtnClickHandler.bind(this);
    this._watchedBtnClickHandler = this._watchedBtnClickHandler.bind(this);
    this._favoriteBtnClickHandler = this._favoriteBtnClickHandler.bind(this);
    this._emojiesToggleHandler = this._emojiesToggleHandler.bind(this);
    this._messageInputHandler = this._messageInputHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);
    this._commentSend = this._commentSend.bind(this);
    this._deleteCommentClickHandler = this._deleteCommentClickHandler.bind(this);
    this._resetCommentSubmitHandler = this._resetCommentSubmitHandler.bind(this);
    this._keyDownHandler = this._keyDownHandler.bind(this);
    this._keyUpHandler = this._keyUpHandler.bind(this);

    this._setInnerHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._data, this._comments);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setWatchlistClickHandler(this._handlers.watchListBtnClick);
    this.setWatchedClickHandler(this._handlers.watchedBtnClick);
    this.setFavoriteClickHandler(this._handlers.favoriteBtnClick);
    this.setClosePopupClickHandler(this._handlers.crossClick);
    this.setHandleCommentSubmit(this._handlers.commentSubmit);
    this.setDeleteCommentClickHandler(this._handlers.deleteClick);
  }

  _crossClickHandler(event) {
    event.preventDefault();
    this._handlers.crossClick();
  }

  setClosePopupClickHandler(callback) {
    const filmDetailsCloseBtn = this.element.querySelector(`.film-details__close-btn`);
    this._handlers.crossClick = callback;
    filmDetailsCloseBtn.addEventListener(`click`, this._crossClickHandler);
  }

  _watchListBtnClickHandler() {
    this.updateData({isWatchList: !this._data.isWatchList}, false);
    this._handlers.watchListBtnClick(this._data);
  }

  setWatchlistClickHandler(callback) {
    const watchListBtn = this.element.querySelector(`.film-details__control-label--watchlist`);
    this._handlers.watchListBtnClick = callback;
    watchListBtn.addEventListener(`click`, this._watchListBtnClickHandler);
  }

  _watchedBtnClickHandler() {
    this._data.watchingDate = this._data.watchingDate ? null : this._data.watchingDate = new Date();
    this.updateData({isWatched: !this._data.isWatched, watchingDate: this._data.watchingDate}, false);
    this._handlers.watchedBtnClick(this._data);
  }

  setWatchedClickHandler(callback) {
    const watchedBtn = this.element.querySelector(`.film-details__control-label--watched`);
    this._handlers.watchedBtnClick = callback;
    watchedBtn.addEventListener(`click`, this._watchedBtnClickHandler);
  }

  _favoriteBtnClickHandler() {
    this.updateData({isFavorite: !this._data.isFavorite}, false);
    this._handlers.favoriteBtnClick(this._data);
  }

  setFavoriteClickHandler(callback) {
    const favoriteBtn = this.element.querySelector(`.film-details__control-label--favorite`);
    this._handlers.favoriteBtnClick = callback;
    favoriteBtn.addEventListener(`click`, this._favoriteBtnClickHandler);
  }

  removeElement() {
    const filmDetailsCloseBtn = this.element.querySelector(`.film-details__close-btn`);
    filmDetailsCloseBtn.removeEventListener(`click`, this._clickHandler);

    super.removeElement();
  }

  _emojiesToggleHandler(event) {
    event.preventDefault();
    this.updateData({emoji: event.target.value}, false);
  }

  _messageInputHandler(event) {
    event.preventDefault();
    this.updateData({message: event.target.value}, true);
  }

  _setInnerHandlers() {
    const emojies = this.element.querySelectorAll(`.film-details__emoji-item`);
    const message = this.element.querySelector(`.film-details__comment-input`);

    emojies.forEach((emoji) => {
      emoji.addEventListener(`click`, this._emojiesToggleHandler);
    });

    message.addEventListener(`input`, this._messageInputHandler);
  }

  _keyDownHandler(event) {
    this._pressed.add(event.key);

    const keys = [Key.CONTROL, Key.ENTER];

    for (const key of keys) {
      if (!this._pressed.has(key)) {
        return;
      }
    }
    this._pressed.clear();

    this._commentSend();
  }

  _keyUpHandler(event) {
    this._pressed.delete(event.key);
  }

  _resetCommentSubmitHandler() {
    document.removeEventListener(`keydown`, this._keyDownHandler);
    document.removeEventListener(`keyup`, this._keyUpHandler);
  }

  _commentSubmitHandler() {
    this._pressed = new Set();

    document.addEventListener(`keydown`, this._keyDownHandler);
    document.addEventListener(`keyup`, this._keyUpHandler);
  }

  _commentSend() {
    let message = this.element.querySelector(`.film-details__comment-input`).value.trim();
    let commentEmoji = this.element.querySelector(`.film-details__add-emoji-label`).dataset.emoji;

    if (message && commentEmoji) {
      const comment = {
        id: nanoid(),
        author: `Author`,
        emoji: commentEmoji,
        message,
        date: new Date().toISOString()
      };

      document.querySelector(`.film-details__comment-input`).setAttribute(`disabled`, `disabled`);

      this._handlers.commentSubmit(comment);
    }
  }

  setHandleCommentSubmit(callback) {
    this._handlers.commentSubmit = callback;
    this.element.querySelector(`.film-details__comment-input`).addEventListener(`focus`, this._commentSubmitHandler);
    this.element.querySelector(`.film-details__comment-input`).addEventListener(`blur`, this._resetCommentSubmitHandler);
  }

  _deleteCommentClickHandler(event) {
    event.preventDefault();

    event.target.setAttribute(`disabled`, `disabled`);
    event.target.textContent = `Deleting…`;

    const currentCommentId = event.target.closest(`.film-details__comment`).dataset.id;
    const currentComment = this._comments.find((comment) => comment.id === currentCommentId);

    this._handlers.deleteClick(currentComment);
  }

  setDeleteCommentClickHandler(callback) {
    this._handlers.deleteClick = callback;
    const deleteButtons = this.element.querySelectorAll(`.film-details__comment-delete`);

    if (deleteButtons) {
      for (let deleteButton of deleteButtons) {
        deleteButton.addEventListener(`click`, this._deleteCommentClickHandler);
      }
    }
  }

  setBlockState() {
    this.element.querySelector(`.film-details__inner`).setAttribute(`disabled`, `disabled`);
  }
}
