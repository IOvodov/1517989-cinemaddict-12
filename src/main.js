import UserProfile from "./view/user-profile.js";
import Menu from "./view/site-menu.js";
import Sort from "./view/sorting.js";
import Board from "./view/board.js";
import FilmsList from "./view/films-list.js";
import FilmCard from "./view/film-card.js";
import ShowMoreButton from "./view/show-more-button.js";
import FooterStatistics from "./view/footer-statistics.js";
import FilmsExtraSection from "./view/films-extra-section.js";
import {generateFilmCard} from "./mock/film-card.js";
import {render, renderElement, RenderPosition} from "./utils.js";
import {generateUserProfile} from "./mock/user-profile.js";
import {generateFilmsFilter} from "./mock/filter.js";

const FILM_CARDS_COUNT = 20;
const EXTRA_SECTION_FILMS_COUNT = 2;
const FILMS_COUNT_PER_STEP = 5;

const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilmCard);
const profile = generateUserProfile();
const filter = generateFilmsFilter(filmCards);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

renderElement(header, new UserProfile(profile).element, RenderPosition.BEFOREEND);
renderElement(main, new Menu(filter).element, RenderPosition.BEFOREEND);
renderElement(main, new Sort().element, RenderPosition.BEFOREEND);

const boardComponent = new Board();

renderElement(main, boardComponent.element, RenderPosition.BEFOREEND);
renderElement(boardComponent.element, new FilmsList().element, RenderPosition.BEFOREEND);

const filmsList = boardComponent.element.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(filmCards.length, FILMS_COUNT_PER_STEP); i++) {
  renderElement(filmsList, new FilmCard(filmCards[i]).element, RenderPosition.BEFOREEND);
}

if (filmCards.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;
  const showMoreButtonComponent = new ShowMoreButton();

  renderElement(filmsList, showMoreButtonComponent.element, RenderPosition.AFTEREND);

  showMoreButtonComponent.element.addEventListener(`click`, (e) => {
    e.preventDefault();
    filmCards
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderElement(filmsList, new FilmCard(film).element, RenderPosition.BEFOREEND));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= filmCards.length) {
      showMoreButtonComponent.element.remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

renderElement(boardComponent.element, new FilmsExtraSection(`Top rated`).element, RenderPosition.BEFOREEND);
renderElement(boardComponent.element, new FilmsExtraSection(`Most commented`).element, RenderPosition.BEFOREEND);

const filmsExtraSections = document.querySelectorAll(`.films-list--extra`);

filmsExtraSections.forEach((section) => {
  const filmsListContainer = section.querySelector(`.films-list__container`);

  for (let i = 0; i < EXTRA_SECTION_FILMS_COUNT; i++) {
    renderElement(filmsListContainer, new FilmCard(filmCards[i]).element, RenderPosition.BEFOREEND);
  }
});

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

renderElement(footerStatistics, new FooterStatistics(filmCards.length).element, RenderPosition.BEFOREEND);
