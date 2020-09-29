import Observer from "../utils/observer.js";
import {renderElement, replace, remove} from "../utils/render.js";
import FooterStatisticsView from "../view/footer-statistics.js";

export default class FooterPresenter extends Observer {
  constructor(footerStatisticsContainer, filmsModel) {
    super();

    this._footerStatisticsContainer = footerStatisticsContainer;
    this._filmsModel = filmsModel;

    this._footerStatisticsComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filmsCount = this._filmsModel.getFilms().length;
    const prevFooterStatisticsComponent = this._footerStatisticsComponent;
    this._footerStatisticsComponent = new FooterStatisticsView(filmsCount);

    if (!prevFooterStatisticsComponent) {
      renderElement(this._footerStatisticsContainer, this._footerStatisticsComponent);
      return;
    }

    replace(this._footerStatisticsComponent, prevFooterStatisticsComponent);
    remove(prevFooterStatisticsComponent);
  }

  destroy() {
    remove(this._footerStatisticsComponent);
    this._filmsModel.removeObserver(this._handleModelEvent);
  }

  _handleModelEvent() {
    this.init();
  }
}
