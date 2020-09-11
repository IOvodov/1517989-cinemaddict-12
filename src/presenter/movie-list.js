import Board from "../view/board.js";
import ShowMoreButton from "../view/show-more-button.js";
import FilmsMainSection from "../view/flims-main-section.js";
import FilmsExtraSection from "../view/films-extra-section.js";
import {renderElement, remove} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import MoviePresenter from "./movie.js";
import FilmsContainer from "../view/films-container.js";

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_SECTION_FILMS_COUNT = 2;

export default class MovieList {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._filmsCount = FILMS_COUNT_PER_STEP;
    this._extraSectionFilmsCount = EXTRA_SECTION_FILMS_COUNT;

    this._boardComponent = new Board();
    this._mainSectionComponent = new FilmsMainSection();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._filmsContainerComponent = new FilmsContainer();

    this._filmMainPresenter = {};
    this._filmExtraPresenter = {};

    this._extraSectionComponent = null;
    this._extraSectionComponents = [];

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleCardChange = this._handleCardChange.bind(this);
  }

  init(films) {
    this._films = films.slice();

    renderElement(this._boardContainer, this._boardComponent);
    renderElement(this._boardComponent, this._mainSectionComponent);
    renderElement(this._mainSectionComponent, this._filmsContainerComponent);

    this._renderMainSection();
    this._renderExtraSections();
  }

  _renderMainSection() {
    this._renderFilmCards(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));

    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmCards(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }

  _renderFilmCard(film, filmListContainer = this._filmsContainerComponent, presenter = this._filmMainPresenter) {
    const moviePresenter = new MoviePresenter(this._boardComponent, filmListContainer, this._handleCardChange);
    moviePresenter.init(film);
    presenter[film.id] = moviePresenter;
  }

  _renderExtraSections() {
    const createFilmCategoryByAttribute = (attribute) => {
      return this._films.slice().sort((prev, next) => next[attribute] - prev[attribute]).slice(0, EXTRA_SECTION_FILMS_COUNT);
    };

    const topRatedFilms = createFilmCategoryByAttribute(`rating`);
    const mostCommentedFilms = createFilmCategoryByAttribute(`commentsCount`);

    const renderExtraSection = (title, categoriesFilms) => {
      this._extraSectionComponent = new FilmsExtraSection(title);
      const extraSectionContainerComponent = new FilmsContainer();

      this._extraSectionComponents.push(this._extraSectionComponent);

      renderElement(this._boardComponent, this._extraSectionComponent);
      renderElement(this._extraSectionComponent, extraSectionContainerComponent);

      for (let i = 0; i < categoriesFilms.length; i++) {
        this._renderFilmCard(categoriesFilms[i], extraSectionContainerComponent, this._filmExtraPresenter);
      }
    }

    renderExtraSection(`Top rated`, topRatedFilms);
    renderExtraSection(`Most commented`, mostCommentedFilms);
  }

  _clearExtraSection() {
    this._extraSectionComponents.forEach(component => {
      component.element.remove();
      component.removeElement();
    })

    this._filmsExtraComponents = [];

    this._filmExtraPresenter = {};
  }

  _handleShowMoreButtonClick() {
    this._renderFilmCards(this._filmsCount, this._filmsCount + FILMS_COUNT_PER_STEP);

    this._filmsCount += FILMS_COUNT_PER_STEP;

    if (this._filmsCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleCardChange(updatedFilmCard) {
    this._films = updateItem(this._films, updatedFilmCard);

    if (this._filmMainPresenter[updatedFilmCard.id] === undefined) {
      this._filmExtraPresenter[updatedFilmCard.id].init(updatedFilmCard);
    } else {
      this._filmMainPresenter[updatedFilmCard.id].init(updatedFilmCard);
    }

    this._clearExtraSection();
    this._renderExtraSections();
  }

  _renderShowMoreButton() {
    renderElement(this._mainSectionComponent, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setShowMoreClickHandler(this._handleShowMoreButtonClick);
  }
}
