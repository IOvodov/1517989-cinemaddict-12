import {createElement} from '../utils.js';

const createFilmsMainSectionTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsMainSection {
  constructor() {
    this._element = null;
  }

  get template() {
    return createFilmsMainSectionTemplate();
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
