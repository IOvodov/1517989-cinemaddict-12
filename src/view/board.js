import Abstract from "./abstract.js";

const createBoardTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class Board extends Abstract {
  get template() {
    return createBoardTemplate();
  }
}
