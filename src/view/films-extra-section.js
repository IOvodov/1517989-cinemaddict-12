import AbstractView from "./abstract.js";

const createFilmsExtraSectionTemplate = (sectionTitle) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${sectionTitle}</h2>
    </section>`
  );
};

export default class FilmsExtraSection extends AbstractView {
  constructor(title) {
    super();

    this._title = title;
  }

  get template() {
    return createFilmsExtraSectionTemplate(this._title);
  }
}
