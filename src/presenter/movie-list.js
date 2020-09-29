import BoardView from "../view/board.js";
import ShowMoreButton from "../view/show-more-button.js";
import FilmsMainSection from "../view/flims-main-section.js";
import FilmsExtraSection from "../view/films-extra-section.js";
import NoFilmsView from "../view/no-films.js";
import {renderElement, remove} from "../utils/render.js";
import MoviePresenter from "./movie.js";
import FilmsContainer from "../view/films-container.js";
import SortView from "../view/sorting.js";
import {SortType, UpdateType, UserAction} from "../const.js";
import {sortFilmDate, sortFilmRating} from "../utils/film-card.js";
import {filter} from "../utils/filter.js";

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_SECTION_FILMS_COUNT = 2;

export default class MovieList {
  constructor(boardContainer, filmsModel, filterModel) {
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

    this._extraSectionComponents = [];

    this._filmsModel = filmsModel;
    this._filterModel = filterModel;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init() {
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  _renderSorting() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortView(this._currentSortType);

    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    renderElement(this._boardContainer, this._sortingComponent);
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.RATING:
        return filteredFilms.slice().sort(sortFilmRating).reverse();
      case SortType.DATE:
        return filteredFilms.slice().sort(sortFilmDate).reverse();
    }

    return filteredFilms;
  }

  _renderMainSection() {
    const filmCardsCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCardsCount, this._filmsCount));

    this._renderFilmCards(films);

    if (filmCardsCount > this._filmsCount) {
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
    const films = this._getFilms().slice();

    const topRatedFilms = films.sort((prev, next) => next.rating - prev.rating).slice(0, EXTRA_SECTION_FILMS_COUNT);
    const mostCommentedFilms = films.sort((prev, next) => next.comments.length - prev.comments.length).slice(0, EXTRA_SECTION_FILMS_COUNT);

    const renderExtraSection = (title, categoriesFilms) => {
      this._extraSectionComponent = new FilmsExtraSection(title);
      const extraSectionContainerComponent = new FilmsContainer();

      this._extraSectionComponents.push(this._extraSectionComponent);

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
    switch (actionType) {
      case UserAction.UPDATE_FILM:
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
      case UpdateType.ADD_COMMENT:
      case UpdateType.DELETE_COMMENT:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmsCount: true, resetSortType: true});
        this._renderBoard();
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
    this._clearBoard({resetRenderedFilmsCount: true});
    this._renderBoard();
  }

  _clearBoard({resetRenderedFilmsCount = false, resetSortType = false} = {}) {
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

    this._extraSectionComponents.forEach((extraComponent) => remove(extraComponent));
    this._extraSectionComponents = [];

    if (resetRenderedFilmsCount) {
      this._filmsCount = FILMS_COUNT_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this._filmsCount = Math.min(filmCardsCount, this._filmsCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard() {
    this._renderSorting();

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
