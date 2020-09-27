import StatisticView from '../view/statistics.js';
import {UpdateType, StatisticFilterType} from '../const.js';
import {renderElement, remove} from '../utils/render.js';
import StatisticsModel from '../model/statistics.js';
import {statisticFilter} from '../utils/statistics.js';

export default class StatisticsPresenter {
  constructor(statisticsContainer, filmsModel) {
    this._filmsModel = filmsModel;
    this._currentFilter = null;
    this._statisticsContainer = statisticsContainer;

    this._statisticsModel = new StatisticsModel();

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._statisticsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filteredStatisticData = this._getFilters();

    this._currentFilter = this._statisticsModel.getFilter();
    this._staticticsComponent = new StatisticView(filteredStatisticData, this._currentFilter);
    this._staticticsComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    renderElement(this._statisticsContainer, this._staticticsComponent);
  }

  destroy() {
    remove(this._staticticsComponent);
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._statisticsModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.MAJOR:
        this.destroy();
        this.init();
        break;
    }
  }

  _getFilters() {
    const films = this._filmsModel.getFilms().filter((item) => item.isWatched);

    return [
      {
        type: StatisticFilterType.ALL,
        name: `All-time`,
        movie: statisticFilter[StatisticFilterType.ALL](films)
      },
      {
        type: StatisticFilterType.TODAY,
        name: `Today`,
        movie: statisticFilter[StatisticFilterType.TODAY](films)
      },
      {
        type: StatisticFilterType.WEEK,
        name: `Week`,
        movie: statisticFilter[StatisticFilterType.WEEK](films)
      },
      {
        type: StatisticFilterType.MONTH,
        name: `Month`,
        movie: statisticFilter[StatisticFilterType.MONTH](films)
      },
      {
        type: StatisticFilterType.YEAR,
        name: `Year`,
        movie: statisticFilter[StatisticFilterType.YEAR](films)
      }
    ];
  }
}
