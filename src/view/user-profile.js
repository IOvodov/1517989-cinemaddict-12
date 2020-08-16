import {RANKS} from '../const.js';
import {createElement} from '../utils.js';

const generateRank = (filmsCount) => {
  if (filmsCount >= 1 && filmsCount <= 10) {
    return RANKS[0];
  } else if (filmsCount >= 11 && filmsCount <= 20) {
    return RANKS[1];
  } else if (filmsCount > 20) {
    return RANKS[2];
  }

  return ``;
};

const createUserProfileTemplate = (userProfile) => {
  const {viewedFilmsCount, avatar} = userProfile;

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${generateRank(viewedFilmsCount)}</p>
      <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfile {
  constructor(userProfile) {
    this._element = null;
    this._userProfile = userProfile;
  }

  get template() {
    return createUserProfileTemplate(this._userProfile);
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
