import {createUserProfileTemplate} from "./view/user-profile.js";
import {createMenuTemplate} from "./view/site-menu.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createBoardTemplate} from "./view/board.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreTemplate} from "./view/show-more-button.js";
import {createFooterStatisticsTemplate} from "./view/footer-statistics.js";
import {createFilmsExtraSectionTemplate} from "./view/films-extra-section.js";
import {generateFilmCard} from "./mock/film-card.js";
import {render} from "./utils.js";
import {generateUserProfile} from "./mock/user-profile.js";
import {generateFilmsFilter} from "./mock/filter.js";

const FILM_CARDS_COUNT = 20;
const EXTRA_SECTION_FILMS_COUNT = 2;
const FILMS_COUNT_PER_STEP = 5;

const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilmCard);
const profile = generateUserProfile();
const filter = generateFilmsFilter(filmCards);

const header = document.querySelector(`.header`);

render(header, createUserProfileTemplate(profile), `beforeend`);

const main = document.querySelector(`.main`);

render(main, createMenuTemplate(filter), `beforeend`);
render(main, createSortingTemplate(), `beforeend`);
render(main, createBoardTemplate(), `beforeend`);

const films = document.querySelector(`.films`);

render(films, createFilmsListTemplate(), `beforeend`);

const filmsList = films.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(filmCards.length, FILMS_COUNT_PER_STEP); i++) {
  render(filmsList, createFilmCardTemplate(filmCards[i]), `beforeend`);
}

if (filmCards.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  render(filmsList, createShowMoreTemplate(), `afterend`);

  const showMoreButton = document.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    filmCards
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(filmsList, createFilmCardTemplate(film), `beforeend`));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= filmCards.length) {
      showMoreButton.remove();
    }
  });
}

render(films, createFilmsExtraSectionTemplate(`Top rated`), `beforeend`);
render(films, createFilmsExtraSectionTemplate(`Most commented`), `beforeend`);

const filmsExtraSections = document.querySelectorAll(`.films-list--extra`);

filmsExtraSections.forEach((section) => {
  const filmsListContainer = section.querySelector(`.films-list__container`);

  for (let i = 0; i < EXTRA_SECTION_FILMS_COUNT; i++) {
    render(filmsListContainer, createFilmCardTemplate(filmCards[i]), `beforeend`);
  }
});

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

render(footerStatistics, createFooterStatisticsTemplate(filmCards.length), `beforeend`);
