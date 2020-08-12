import {createUserProfileTemplate} from "./view/user-profile.js";
import {createMenuTemplate} from "./view/site-menu.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createBoardTemplate} from "./view/board.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createLoadMoreTemplate} from "./view/load-more-button.js";
import {createFooterStatisticsTemplate} from "./view/footer-statistics.js";
import {createAdditionalBlockTemplate} from "./view/additional-films-block.js";
import {generateFilmCard} from "./mock/film-card.js";
import {render} from "./utils.js"
import { generateUserProfile } from "./mock/user-profile.js";
import { generateFilmsFilter } from "./mock/filter.js";

const FILM_CARDS_COUNT = 20;
const ADDITIONAL_BLOCK_CARDS_COUNT = 2;

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

for (let i = 0; i < FILM_CARDS_COUNT; i++) {
  render(filmsList, createFilmCardTemplate(filmCards[i]), `beforeend`);
}

render(filmsList, createLoadMoreTemplate(), `afterend`);
render(films, createAdditionalBlockTemplate(`Top rated`), `beforeend`);
render(films, createAdditionalBlockTemplate(`Most commented`), `beforeend`);

const additionalFilmsBlocks = document.querySelectorAll(`.films-list--extra`);

additionalFilmsBlocks.forEach((additionalBlock) => {
  const filmsListContainer = additionalBlock.querySelector(`.films-list__container`);

  for (let i = 0; i < ADDITIONAL_BLOCK_CARDS_COUNT; i++) {
    render(filmsListContainer, createFilmCardTemplate(filmCards[i]), `beforeend`);
  }
});

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

render(footerStatistics, createFooterStatisticsTemplate(filmCards.length), `beforeend`);
