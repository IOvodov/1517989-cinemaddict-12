import {FILMS_TITLES, POSTERS, GENRES, COUNTRIES, AGES, SENTENCES, EMOJI, AUTHORS, DIRECTORS, WRITERS, ACTORS} from '../const.js';
import {getRandomInteger, getRandomElement, generateArrayFromSet} from '../utils/common.js';

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

const generateDate = () => {
  const maxDaysGap = getRandomInteger(1, 365);
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  let currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  currentDate = new Date(currentDate);

  return `${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
};

const generateReleaseDate = () => new Date(getRandomInteger(1895, 2019), getRandomInteger(1, 12), getRandomInteger(1, 30));

const getRandomGenres = () => {
  const MIN_GENRES_COUNT = 1;
  const MAX_GENRES_COUNT = 3;

  const randomGenres = generateArrayFromSet(GENRES, MIN_GENRES_COUNT, MAX_GENRES_COUNT);

  return randomGenres;
};

const getRandomActors = () => {
  const MIN_ACTORS_COUNT = 1;
  const MAX_ACTORS_COUNT = 4;

  const randomActors = generateArrayFromSet(ACTORS, MIN_ACTORS_COUNT, MAX_ACTORS_COUNT);

  return randomActors;
};

const getRandomWriters = () => {
  const MIN_WRITERS_COUNT = 1;
  const MAX_WRITERS_COUNT = 4;

  const randomWriters = generateArrayFromSet(WRITERS, MIN_WRITERS_COUNT, MAX_WRITERS_COUNT);

  return randomWriters;
};

const generateFilmDuration = () => {
  const MAX_FILM_HOUR = 10;
  const MINUTES_IN_HOUR = 60;

  const randomHour = getRandomInteger(0, MAX_FILM_HOUR);
  const randomMinutes = getRandomInteger(0, MINUTES_IN_HOUR);

  const hourToString = randomHour > 0 ? `${randomHour}h` : ``;
  const minutesToString = randomMinutes > 0 ? `${randomMinutes}m` : ``;

  return hourToString + ` ` + minutesToString;
};

const generateRating = () => getRandomInteger(10, 100) / 10;

const generateDescription = () => {
  const MAX_DESCRIPTION_SIZE = 140;
  const MIN_SENTENCES_COUNT = 1;
  const MAX_SENTENCES_COUNT = 5;

  let randomDescription = [];
  for (let i = 0; i < getRandomInteger(MIN_SENTENCES_COUNT, MAX_SENTENCES_COUNT); i++) {
    const randomIndex = getRandomInteger(0, SENTENCES.length - 1);

    randomDescription.push(SENTENCES[randomIndex]);
  }

  const description = randomDescription.join(` `);

  if (description.length > MAX_DESCRIPTION_SIZE) {
    return description.slice(0, MAX_DESCRIPTION_SIZE - 1) + `...`;
  }

  return description;
};

const generateComment = () => {
  const MIN_COMMENTS_COUNT = 0;
  const MAX_COMMENTS_COUNT = 5;

  const randomComments = [];

  for (let i = 0; i < getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT); i++) {
    const emoji = getRandomElement(EMOJI);
    const date = generateDate();
    const author = getRandomElement(AUTHORS);
    const message = getRandomElement(SENTENCES);

    const comment = {emoji, date, author, message};

    randomComments.push(comment);
  }

  return randomComments;
};

export const generateFilmCard = () => {
  const comments = generateComment();
  return {
    id: generateId(),
    poster: getRandomElement(POSTERS),
    filmTitle: getRandomElement(FILMS_TITLES),
    originalFilmTitle: getRandomElement(FILMS_TITLES),
    rating: generateRating(),
    releaseDate: generateReleaseDate(),
    duration: generateFilmDuration(),
    description: generateDescription(),
    genres: getRandomGenres(),
    comments,
    commentsCount: comments.length,
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isWatchList: Boolean(getRandomInteger(0, 1)),
    country: getRandomElement(COUNTRIES),
    director: getRandomElement(DIRECTORS),
    writers: getRandomWriters(),
    actors: getRandomActors(),
    age: getRandomElement(AGES)
  };
};
