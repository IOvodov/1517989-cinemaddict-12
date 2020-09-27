import Observer from "../utils/observer.js";
import {StatisticFilterType} from '../const.js';

export default class StatisticsModel extends Observer {
  constructor() {
    super();
    this._activeFilter = StatisticFilterType.ALL;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notifyListeners(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
