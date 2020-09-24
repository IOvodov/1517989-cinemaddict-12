import BoardView from "../view/board.js";
import ShowMoreButton from "../view/show-more-button.js";
import FilmsMainSection from "../view/flims-main-section.js";
import FilmsExtraSection from "../view/films-extra-section.js";
import NoFilmsView from "../view/no-films.js";
import {renderElement, remove} from "../utils/render.js";
import MoviePresenter from "./movie.js";
import FilmsContainer from "../view/films-container.js";
import SortView from "../view/sorting.js";
import {SortType} from "../const.js";
import {sortFilmDate, sortFilmRating} from "../utils/film.js";
import {UpdateType, UserAction} from "../const.js";

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_SECTION_FILMS_COUNT = 2;

export default class MovieList {
  constructor(boardContainer, filmsModel) {
    this._boardContainer = boardContainer;
    this._filmsCount = FILMS_COUNT_PER_STEP;
    this._extraSectionFilmsCount = EXTRA_SECTION_FILMS_COUNT;

    this._currentSortType = SortType.DEFAULT;

    this._boardComponent = null;
    this._mainSectionComponent = null;
    this._filmsContainerComponent = null;
    this._sortingComponent = null;
    this._showMoreButtonComponent = null;
    this._extraSectionComponent = null;

    this._noFilmsComponent = new NoFilmsView();

    this._filmMainPresenter = {};
    this._filmExtraPresenter = {};

    this._filmsModel = filmsModel;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init() {
    this._filmsModel.addObserver(this._handleModelEvent);

    this._renderSorting();
    this._renderBoard();
  }

  _renderSorting() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortView(this._currentSortType);
    renderElement(this._boardContainer, this._sortingComponent);

    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.RATING:
        this._filmsModel.getFilms().sort(sortFilmRating).reverse();
        break;
      case SortType.DATE:
        this._filmsModel.getFilms().sort(sortFilmDate).reverse();
        break;
    }

    return this._filmsModel.getFilms();
  }

  _renderMainSection() {
    const filmCardsCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCardsCount, FILMS_COUNT_PER_STEP))

    this._renderFilmCards(films);

    if (filmCardsCount > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmCards(films) {
    films.forEach((film) => this._renderFilmCard(film));
  }

  _renderFilmCard(film, filmListContainer = this._filmsContainerComponent, presenter = this._filmMainPresenter) {
    const moviePresenter = new MoviePresenter(filmListContainer, this._handleViewAction, this._handleModeChange);
    moviePresenter.init(film);
    presenter[film.id] = moviePresenter;
  }

  _renderExtraSections() {
    const createFilmCategoryByAttribute = (attribute) => {
      const films = this._getFilms().slice();
      return films.sort((prev, next) => next[attribute] - prev[attribute]).slice(0, EXTRA_SECTION_FILMS_COUNT);
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

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButton();

    this._showMoreButtonComponent.setShowMoreClickHandler(this._handleShowMoreButtonClick);

    renderElement(this._mainSectionComponent, this._showMoreButtonComponent);
  }

  _handleShowMoreButtonClick() {
    const filmCardsCount = this._getFilms().length;
    const newRenderedFilmCardsCount = Math.min(filmCardsCount, this._filmsCount + FILMS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._filmsCount, newRenderedFilmCardsCount);

    this._renderFilmCards(films);
    this._filmsCount = newRenderedFilmCardsCount;

    if (this._filmsCount >= filmCardsCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch(actionType) {
      case UserAction.UPDATE_FILM:
      case UserAction.ADD_COMMENT:
      case UserAction.DELETE_COMMENT:
        this._filmsModel.updateFilmCard(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, updateData) {
    switch (updateType) {
      case UpdateType.PATCH:
        if (Object.keys(this._filmMainPresenter).includes(updateData.id)) {
          this._filmMainPresenter[updateData.id].init(updateData);
        }

        if (Object.keys(this._filmExtraPresenter).includes(updateData.id)) {
          this._filmExtraPresenter[updateData.id].init(updateData);
        }

        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.DELETE_COMMENT:
      case UpdateType.ADD_COMMENT:
        if (Object.keys(this._filmMainPresenter).includes(updateData.id)) {
          this._filmMainPresenter[updateData.id].init(updateData);
        }

        if (Object.keys(this._filmExtraPresenter).includes(updateData.id)) {
          this._filmExtraPresenter[updateData.id].init(updateData);
        }

        break;
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

    this._currentSortType = sortType;
    this._clearBoard({resetRenderedTaskCount: true});
    this._renderBoard();
  }

  _clearBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    const filmCardsCount = this._getFilms().length;

    Object
      .values(this._filmMainPresenter)
      .forEach((presenter) => {
        presenter.destroy();
      });
    this._filmMainPresenter = {};

    remove(this._sortingComponent);
    remove(this._noFilmsComponent);
    remove(this._showMoreButtonComponent);
    remove(this._boardComponent);

    if (resetRenderedTaskCount) {
      this._renderedTaskCount = TASK_COUNT_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this._renderedTaskCount = Math.min(filmCardsCount, this._renderedTaskCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard() {
    if (this._boardComponent) {
      remove(this._boardComponent);
    }

    this._boardComponent = new BoardView();
    renderElement(this._boardContainer, this._boardComponent);

    const filmCardsCount = this._getFilms().length;

    if (!filmCardsCount) {
      this._renderNoFilms();
      return;
    }

    if (this._mainSectionComponent !== null) {
      remove(this._mainSectionComponent);
    }

    this._mainSectionComponent = new FilmsMainSection();
    this._filmsContainerComponent = new FilmsContainer();

    renderElement(this._boardComponent, this._mainSectionComponent);
    renderElement(this._mainSectionComponent, this._filmsContainerComponent);

    this._renderMainSection();
    this._renderExtraSections();
  }

  _renderNoFilms() {
    renderElement(this._boardComponent, this._noFilmsComponent);
  }
}
