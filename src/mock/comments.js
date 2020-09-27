import {EMOJI, AUTHORS, SENTENCES} from '../const.js';
import {getRandomInteger, getRandomElement, generateDate} from '../utils/common.js';
import {nanoid} from 'nanoid';

export const generateComments = () => {
  const MIN_COMMENTS_COUNT = 0;
  const MAX_COMMENTS_COUNT = 5;

  const randomComments = [];

  for (let i = 0; i < getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT); i++) {
    const id = nanoid();
    const emoji = getRandomElement(EMOJI);
    const date = generateDate();
    const author = getRandomElement(AUTHORS);
    const message = getRandomElement(SENTENCES);

    const comment = {id, emoji, date, author, message};

    randomComments.push(comment);
  }

  return randomComments;
};
