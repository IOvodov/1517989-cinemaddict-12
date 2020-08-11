const getReleaseYear = (releaseDate) => releaseDate.getFullYear();

const isControlsItemActive = (flag) => flag ? `film-card__controls-item--active` : ``;

export const createFilmCardTemplate = (filmCard) => {
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
        <span class="film-card__year">${getReleaseYear(releaseDate)}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
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