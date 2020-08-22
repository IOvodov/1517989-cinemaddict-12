import Abstract from "./abstract.js";

const createFilmsExtraSectionTemplate = (sectionTitle) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${sectionTitle}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsExtraSection extends Abstract {
  constructor(title) {
    super();

    this._title = title;
  }

  get template() {
    return createFilmsExtraSectionTemplate(this._title);
  }
}
