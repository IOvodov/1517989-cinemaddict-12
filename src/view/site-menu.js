import AbstractView from "./abstract.js";

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, title, count} = filter;
  return `<a href="#${title}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}" data-filter-type="${type}">${title} ${type !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`;
};

const createSiteMenuTemplate = (filterData, currentFilterType) => {
  const filterItemsTemplate = filterData.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join(``);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional ${currentFilterType === `stats` ? `main-navigation__item--active` : ``}" data-filter-type="stats">Stats</a>
    </nav>`
  );
};

export default class SiteMenu extends AbstractView {
  constructor(filterData, currentFilterType) {
    super();

    this._filterData = filterData;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  get template() {
    return createSiteMenuTemplate(this._filterData, this._currentFilterType);
  }

  _filterTypeChangeHandler(event) {
    if (event.target.tagName !== `A`) {
      return;
    }

    event.preventDefault();

    this._handlers.filterTypeChange(event.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._handlers.filterTypeChange = callback;
    this.element.addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
