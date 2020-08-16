import {createElement} from '../utils.js';

const createFilmsExtraSectionTemplate = (sectionTitle) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${sectionTitle}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsExtraSection {
  constructor(title) {
    this._element = null;
    this._title = title;
  }

  get template() {
    return createFilmsExtraSectionTemplate(this._title);
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
