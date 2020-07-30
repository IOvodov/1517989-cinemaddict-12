const FILM_CARDS_COUNT = 5;
const ADDITIONAL_BLOCK_CARDS_COUNT = 2;

const createUserRankTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Newbie</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  )
}

const createNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  )
}

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  )
}

const createFooterStatisticsTemplate = () => {
  return (
    `<p>88 movies inside</p>`
  )
}

const createBoardTemplate = () => {
  return (
    `<section class="films"></section>`
  )
}

const createFilmsTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container"></div>
    </section>`
  )
}

const createAdditionalBlockTemplate = (blockTitle) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${blockTitle}</h2>

      <div class="films-list__container"></div>
    </section>`
  )
}

const createFilmCardTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Man with the Golden Arm</h3>
      <p class="film-card__rating">9.0</p>
      <p class="film-card__info">
        <span class="film-card__year">1955</span>
        <span class="film-card__duration">1h 59m</span>
        <span class="film-card__genre">Drama</span>
      </p>
      <img src="./images/posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…</p>
      <a class="film-card__comments">18 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--active">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  )
}

const createLoadMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  )
}

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
}

const header = document.querySelector(`.header`);

render(header, createUserRankTemplate(), `beforeend`);

const main = document.querySelector(`.main`);

render(main, createNavigationTemplate(), `beforeend`);
render(main, createSortTemplate(), `beforeend`);
render(main, createBoardTemplate(), `beforeend`);

const films = document.querySelector(`.films`);

render(films, createFilmsTemplate(), `beforeend`);

const filmsList = films.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_CARDS_COUNT; i++) {
  render(filmsList, createFilmCardTemplate(), `beforeend`);
}

render(filmsList, createLoadMoreTemplate(), `afterend`);
render(films, createAdditionalBlockTemplate(`Top rated`), `beforeend`);
render(films, createAdditionalBlockTemplate(`Most commented`), `beforeend`);

const additionalFilmsBlocks = document.querySelectorAll(`.films-list--extra`);

additionalFilmsBlocks.forEach(additionalBlock => {
  const filmsList = additionalBlock.querySelector(`.films-list__container`);

  for (let i = 0; i < ADDITIONAL_BLOCK_CARDS_COUNT; i++) {
    render(filmsList, createFilmCardTemplate(), `beforeend`);
  }
})

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`)

render(footerStatistics, createFooterStatisticsTemplate(), `beforeend`);
