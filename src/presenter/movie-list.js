import Board from "../view/board.js";
import ShowMoreButton from "../view/show-more-button.js";
import FilmsMainSection from "../view/flims-main-section.js";
import FilmsExtraSection from "../view/films-extra-section.js";
import FilmCard from "../view/film-card.js";
import FilmDefails from "../view/film-details.js";
import {renderElement, remove, addChild, deleteChild} from "../utils/render.js";

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
    this._filmsListContainer = this._mainSectionComponent.element.querySelector(`.films-list__container`);

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
    this._renderFilmCards(this._filmsListContainer, 0, Math.min(this._filmCards.length, FILMS_COUNT_PER_STEP));

    if (this._filmCards.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmCards(container, from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(container, film));
  }

  _renderFilmCard(container, film) {
    const filmCardComponent = new FilmCard(film);

    filmCardComponent.setOpenPopupClickHandler(() => {
      this._renderFilmDetails(this._boardComponent, film);
      document.body.classList.add(`hide-overflow`);
    });

    renderElement(container, filmCardComponent);
  }

  _renderFilmDetails(boardComponent, film) {
    const filmDetailsComponent = new FilmDefails(film);

    const showFilmDetails = () => {
      addChild(boardComponent, filmDetailsComponent);
    };

    const hideFilmDetails = () => {
      deleteChild(filmDetailsComponent);
    };

    filmDetailsComponent.setClosePopupClickHandler(() => {
      hideFilmDetails();
      document.body.classList.remove(`hide-overflow`);
    });

    showFilmDetails();
  }

  _renderExtraSections() {
    renderElement(this._boardComponent, this._topRatedFilmsComponent);
    renderElement(this._boardComponent, this._mostRecommendedFilmsComponent);

    const filmsExtraSections = this._boardComponent.element.querySelectorAll(`.films-list--extra`);

    filmsExtraSections.forEach((section) => {
      const filmsListContainer = section.querySelector(`.films-list__container`);

      for (let i = 0; i < EXTRA_SECTION_FILMS_COUNT; i++) {
        this._renderFilmCard(filmsListContainer, this._filmCards[i]);
      }
    });
  }

  _handleShowMoreButtonClick() {
    this._renderFilmCards(this._filmsListContainer, this._filmsCount, this._filmsCount + FILMS_COUNT_PER_STEP);

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
