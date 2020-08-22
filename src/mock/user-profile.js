import {getRandomInteger, getRandomElement} from '../utils/render.js';

const MIN_VIEWED_FILMS = 0;
const MAX_VIEWED_FILMS = 200;

const AVATAR_PATHS = [
  `./images/bitmap.png`,
  `./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`
];

export const generateUserProfile = () => {
  return {
    viewedFilmsCount: getRandomInteger(MIN_VIEWED_FILMS, MAX_VIEWED_FILMS),
    avatar: getRandomElement(AVATAR_PATHS),
  };
};
