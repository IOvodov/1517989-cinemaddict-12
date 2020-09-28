import AbstractView from "./abstract.js";

const createUserProfileTemplate = (userRank) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfileView extends AbstractView {
  constructor(userRank) {
    super();

    this._userRank = userRank;
  }

  get template() {
    return createUserProfileTemplate(this._userRank);
  }
}
