import Abstract from "./abstract.js";

const createShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton extends Abstract {
  get template() {
    return createShowMoreTemplate();
  }
}
