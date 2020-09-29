import {RANKS} from '../const.js';

export const getRank = (data) => {
  if (data.length >= 1 && data.length <= 10) {
    return RANKS[0];
  } else if (data.length >= 11 && data.length <= 20) {
    return RANKS[1];
  } else if (data.length > 20) {
    return RANKS[2];
  }

  return ``;
};
