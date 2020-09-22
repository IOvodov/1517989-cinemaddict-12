import Board from "../view/board.js";
import ShowMoreButton from "../view/show-more-button.js";
import FilmsMainSection from "../view/flims-main-section.js";
import FilmsExtraSection from "../view/films-extra-section.js";
import NoFilmsView from "../view/no-films.js";
import {renderElement, remove} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import MoviePresenter from "./movie.js";
import FilmsContainer from "../view/films-container.js";
import SortView from "../view/sorting.js";
import {SortType} from "../const.js";
import {sortFilmDate, sortFilmRating} from "../utils/film.js";

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_SECTION_FILMS_COUNT = 2;

export default class MovieList {
  constructor(boardContainer, filmsModel) {
    this._boardContainer = boardContainer;
    this._filmsCount = FILMS_COUNT_PER_STEP;
    this._extraSectionFilmsCount = EXTRA_SECTION_FILMS_COUNT;

    this._currentSortType = SortType.DEFAULT;

    this._boardComponent = new Board();
    this._sortingComponent = new SortView();
    this._mainSectionComponent = new FilmsMainSection();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._filmsContainerComponent = new FilmsContainer();
    this._noFilmsComponent = new NoFilmsView();

    this._filmMainPresenter = {};
    this._filmExtraPresenter = {};

    this._extraSectionComponent = null;

    this._filmsModel = filmsModel;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    this._renderSorting();

    renderElement(this._boardContainer, this._boardComponent);

    if (!this._films.length) {
      this._renderNoFilms();
      return;
    }

    renderElement(this._boardComponent, this._mainSectionComponent);
    renderElement(this._mainSectionComponent, this._filmsContainerComponent);

    this._renderMainSection();
    this._renderExtraSections();
  }

  _renderSorting() {
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    renderElement(this._boardContainer, this._sortingComponent);
  }

  _renderMainSection() {
    this._renderFilmCards(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));

    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _getFilms() {
    return this._filmsModel.films;
  }

  _renderFilmCards(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }

  _renderFilmCard(film, filmListContainer = this._filmsContainerComponent, presenter = this._filmMainPresenter) {
    const moviePresenter = new MoviePresenter(filmListContainer, this._handleCardChange, this._handleModeChange);
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

      renderElement(this._boardComponent, this._extraSectionComponent);
      renderElement(this._extraSectionComponent, extraSectionContainerComponent);

      for (let i = 0; i < categoriesFilms.length; i++) {
        this._renderFilmCard(categoriesFilms[i], extraSectionContainerComponent, this._filmExtraPresenter);
      }
    };

    renderExtraSection(`Top rated`, topRatedFilms);
    renderExtraSection(`Most commented`, mostCommentedFilms);
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
    this._sourcedFilms = updateItem(this._sourcedFilms, updatedFilmCard);

    if (Object.keys(this._filmMainPresenter).includes(updatedFilmCard.id)) {
      this._filmMainPresenter[updatedFilmCard.id].init(updatedFilmCard);
    }
    if (Object.keys(this._filmExtraPresenter).includes(updatedFilmCard.id)) {
      this._filmExtraPresenter[updatedFilmCard.id].init(updatedFilmCard);
    }
  }

  _handleModeChange() {
    Object
       .values(this._filmMainPresenter)
       .forEach((presenter) => presenter.resetView());

    Object
      .values(this._filmExtraPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);

    this._clearMovieList();
    this._renderMainSection();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.RATING:
        this._films.sort(sortFilmRating).reverse();
        break;
      case SortType.DATE:
        this._films.sort(sortFilmDate).reverse();
        break;
      default:
        this._films = this._sourcedFilms.slice();
        break;
    }

    this._currentSortType = sortType;
  }

  _clearMovieList() {
    Object
      .values(this._filmMainPresenter)
      .forEach((presenter) => {
        presenter.destroy();
      });
    this._filmMainPresenter = {};
    this._filmsCount = FILMS_COUNT_PER_STEP;
  }

  _renderShowMoreButton() {
    renderElement(this._mainSectionComponent, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setShowMoreClickHandler(this._handleShowMoreButtonClick);
  }

  _renderNoFilms() {
    renderElement(this._boardComponent, this._noFilmsComponent);
  }
}
