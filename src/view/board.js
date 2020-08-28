import AbstractView from "./abstract.js";

const createBoardTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class Board extends AbstractView {
  get template() {
    return createBoardTemplate();
  }
}
