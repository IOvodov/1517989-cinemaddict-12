import {createElement} from '../utils.js';

const createFooterStatisticsTemplate = (filmsCount) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsCount} movies inside</p>
    </section>`
  );
};

export default class FooterStatistics {
  constructor(filmsCount) {
    this._filmsCount = filmsCount;
    this._element = null;
  }

  get template() {
    return createFooterStatisticsTemplate(this._filmsCount);
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
