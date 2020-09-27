import FilterModel from '../model/filter.js';
import StatisticView from '../view/statistic.js';
import {UpdateType} from '../const.js';
import {renderElement, remove} from '../utils/render.js';

export default class StatisticPresenter {
  constructor(statisticsContainer, data) {
    this._data = data;
    this._currentFilter = null;
    this._statisticsContainer = statisticsContainer;

    this._filterModel = new FilterModel();

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    this._staticticsComponent = new StatisticView(this._data, this._currentFilter);
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

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
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
