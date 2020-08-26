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
    this._handlers.click();
  }

  showMoreClickHandler(callback) {
    this._handlers.click = callback;
    this.element.addEventListener(`click`, this._clickHandler);
  }

  removeElement() {
    this._element.removeEventListener(`click`, this._clickHandler);

    super.removeElement();
  }
}
