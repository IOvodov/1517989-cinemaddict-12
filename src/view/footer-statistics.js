import Abstract from "./abstract.js";

const createFooterStatisticsTemplate = (filmsCount) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsCount} movies inside</p>
    </section>`
  );
};

export default class FooterStatistics extends Abstract {
  constructor(filmsCount) {
    super();

    this._filmsCount = filmsCount;
  }

  get template() {
    return createFooterStatisticsTemplate(this._filmsCount);
  }
}
