import StatisticView from '../view/statistics.js';
import {UpdateType} from '../const.js';
import {renderElement, remove} from '../utils/render.js';
import StatisticsModel from '../model/statistics.js';

export default class StatisticsPresenter {
  constructor(statisticsContainer, filmsData) {
    this._filmsData = filmsData;
    this._currentFilter = null;
    this._statisticsContainer = statisticsContainer;

    this._statisticsModel = new StatisticsModel();

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._statisticsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._statisticsModel.getFilter();
    this._staticticsComponent = new StatisticView(this._filmsData, this._currentFilter);
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
}
