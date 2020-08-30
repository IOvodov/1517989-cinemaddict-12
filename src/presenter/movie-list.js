import Board from "../view/board.js";
import ShowMoreButton from "../view/show-more-button.js";
import FilmsMainSection from "../view/flims-main-section.js";
import FilmsExtraSection from "../view/films-extra-section.js";
import {renderElement, remove, addChild, deleteChild} from "../utils/render.js";
import MoviePresenter from "./movie.js";

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_SECTION_FILMS_COUNT = 2;

export default class MovieList {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._filmsCount = FILMS_COUNT_PER_STEP;
    this._extraSectionFilmsCount = EXTRA_SECTION_FILMS_COUNT;

    this._boardComponent = new Board();
    this._mainSectionComponent = new FilmsMainSection();
    this._topRatedFilmsComponent = new FilmsExtraSection(`Top rated`);
    this._mostRecommendedFilmsComponent = new FilmsExtraSection(`Most commented`);
    this._showMoreButtonComponent = new ShowMoreButton();
    this._filmListContainer = this._mainSectionComponent.element.querySelector(`.films-list__container`);

    this._moviePresenter = {};

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(films) {
    this._filmCards = films.slice();

    renderElement(this._boardContainer, this._boardComponent);
    renderElement(this._boardComponent, this._mainSectionComponent);

    this._renderMainSection();
    this._renderExtraSections();
  }

  _renderMainSection() {
    this._renderFilmCards(this._filmListContainer, 0, Math.min(this._filmCards.length, FILMS_COUNT_PER_STEP));

    if (this._filmCards.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmCards(filmListContainer, from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(filmListContainer, film));
  }

  _renderFilmCard(filmListContainer, film) {
    const moviePresenter = new MoviePresenter(this._boardContainer, filmListContainer);
    moviePresenter.init(film);
  }

  _renderExtraSections() {
    renderElement(this._boardComponent, this._topRatedFilmsComponent);
    renderElement(this._boardComponent, this._mostRecommendedFilmsComponent);

    const filmsExtraSections = this._boardComponent.element.querySelectorAll(`.films-list--extra`);

    filmsExtraSections.forEach((section) => {
      const filmListContainer = section.querySelector(`.films-list__container`);

      for (let i = 0; i < EXTRA_SECTION_FILMS_COUNT; i++) {
        this._renderFilmCard(filmListContainer, this._filmCards[i]);
      }
    });
  }

  _handleShowMoreButtonClick() {
    this._renderFilmCards(this._filmListContainer, this._filmsCount, this._filmsCount + FILMS_COUNT_PER_STEP);

    this._filmsCount += FILMS_COUNT_PER_STEP;

    if (this._filmsCount >= this._filmCards.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    renderElement(this._boardComponent, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setShowMoreClickHandler(this._handleShowMoreButtonClick);
  }
}
