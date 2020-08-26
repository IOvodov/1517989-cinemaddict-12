import AbstractView from "./abstract.js";

const createShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  get template() {
    return createShowMoreTemplate();
  }

  _clickHandler(event) {
    event.preventDefault();
    this._callback.click();
  }

  showMoreClickHandler(callback) {
    this._callback.click = callback;
    this.element.addEventListener(`click`, this._clickHandler);
  }
}
