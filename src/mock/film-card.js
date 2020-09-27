import {FILMS_TITLES, POSTERS, GENRES, COUNTRIES, AGES, SENTENCES, DIRECTORS, WRITERS, ACTORS} from '../const.js';
import {getRandomInteger, getRandomElement, generateArrayFromSet, generateDate} from '../utils/common.js';
import {generateComments} from './comments.js';
import {nanoid} from 'nanoid';

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
  const MIN_FILM_MINUTES = 0;
  const MAX_FILM_MINUTES = 600;

  return getRandomInteger(MIN_FILM_MINUTES, MAX_FILM_MINUTES);
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

export const generateFilmCard = () => {
  const comments = generateComments();
  return {
    id: nanoid(),
    poster: getRandomElement(POSTERS),
    filmTitle: getRandomElement(FILMS_TITLES),
    originalFilmTitle: getRandomElement(FILMS_TITLES),
    rating: generateRating(),
    releaseDate: generateReleaseDate(),
    duration: generateFilmDuration(),
    description: generateDescription(),
    genres: getRandomGenres(),
    comments,
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isWatchList: Boolean(getRandomInteger(0, 1)),
    watchingDate: generateDate(),
    country: getRandomElement(COUNTRIES),
    director: getRandomElement(DIRECTORS),
    writers: getRandomWriters(),
    actors: getRandomActors(),
    age: getRandomElement(AGES)
  };
};
