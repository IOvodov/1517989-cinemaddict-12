import {RANKS} from '../const.js';

const generateRank = (filmsCount) => {
  if (!filmsCount)
    return ``;

  if (filmsCount === 0) {
    return RANKS[0];
  } else if (filmsCount >= 1 && filmsCount <= 10) {
    return RANKS[1];
  } else if (filmsCount >= 11 && filmsCount <= 20) {
    return RANKS[2];
  } else if (filmsCount > 20) {
    return RANKS[3];
  }

  return ``;
}

export const createUserProfileTemplate = (userProfile) => {
  const {viewedFilmsCount, avatar} = userProfile;

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${generateRank(viewedFilmsCount)}</p>
      <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
    </section>`
  );
};
