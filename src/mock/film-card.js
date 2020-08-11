const FILMS_TITLES = [
  `Made for each other`,
  `Popeye meets sinbad`,
  `Sagebrush trail`,
  `Santa claus conquers the martians`,
  `The dance of life`,
  `The great flamarion`,
  `The man with the golden arm`
];

const DIRECTORS = [
  `Antonny Mann`,
  `John Cromwell`,
  `Dave Fleischer`,
  `Otto Preminger`,
  `Armand Schaefer`
];

const WRITERS = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Lindsley Parsons`,
  `Will Beale`
];

const ACTORS = [
  `Frank Sinatra`,
  `James Stewart`,
  `Charles Coburn`,
  `Nancy Carroll`,
  `Hall Skelly`,
  `John Wayne`,
  `Wally Wales`,
  `Nancy Shubert`
];

const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const GENRES = [
  `Drama`,
  `Thriller`,
  `Western`,
  `Fantasy`,
  `Comedy`
];

const COUNTRIES = [
  `Russia`,
  `USA`,
  `India`,
  `China`,
  `UK`,
  `Italia`
]

const getRandomInteger = (from = 0, to = 1) => {
  const lower = Math.ceil(Math.min(from, to));
  const upper = Math.floor(Math.max(from, to));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDate = () => {
  const maxDaysGap = getRandomInteger(1, 365);
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const getRandomElement = (elements) => {
  const randomIndex = getRandomInteger(0, elements.length - 1);

  return elements[randomIndex];
};

const generateArrayFromSet = (array, minElementsCount, maxElementsCount) => {
  const newSet = new Set();

  for (let i = minElementsCount; i < maxElementsCount; i++) {
    const randomElement = getRandomElement(array);

    newSet.add(randomElement);
  }

  return Array.from(newSet);
}

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

  const randomWriters = generateArrayFromSet(ACTORS, MIN_WRITERS_COUNT, MAX_WRITERS_COUNT);

  return randomWriters;
}

const generateProductionYear = () => new Date(getRandomInteger(1895, 2020), getRandomInteger(1, 12), getRandomInteger(1, 30))
  .toLocaleString('en-JM', {year: 'numeric', month: 'long', day: 'numeric'});

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

  const SENTENCES = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  ];

  let randomDescription = [];
  for (let i = 0; i < getRandomInteger(MIN_SENTENCES_COUNT, MAX_SENTENCES_COUNT); i++) {
    const randomIndex = getRandomInteger(0, SENTENCES.length - 1);

    randomDescription.push(SENTENCES[randomIndex]);
  }

  const description = randomDescriptions.join(` `);

  if (description.length > MAX_DESCRIPTION_SIZE)
    return description.slice(MAX_DESCRIPTION_SIZE - 1) + `...`;

  return description;
};

const generateComment = () => {
  const EMOJI = [
    `angry.png`,
    `puke.png`,
    `sleeping.png`,
    `smile.png`
  ];

  const AUTHORS = [
    'Ivanov Ivan',
    'Petrov Petr',
    'Sidorov Sidor'
  ];

  const MESSAGES = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  ];
  const MIN_COMMENTS_COUNT = 0;
  const MAX_COMMENTS_COUNT = 5;

  const randomComments = [];

  for (let i = 0; i < getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT); i++) {
    const emoji = getRandomElement(EMOJI);
    const date = generateDate();
    const author = getRandomElement(AUTHORS);
    const message = getRandomElement(MESSAGES);

    const comment = { emoji, date, author, message };

    randomComments.push(comment);
  }

  return randomComments;
};

const generateFilmCard = () => {
  return {
    poster: getRandomElement(POSTERS),
    filmTitle: getRandomElement(FILMS_TITLES),
    rating: generateRating(),
    productionYear: generateProductionYear(),
    duration: generateFilmDuration(),
    description: generateDescription(),
    genre: getRandomGenres(),
    comment: generateComment(),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isWatchList: Boolean(getRandomInteger(0, 1)),
    country: getRandomElement(COUNTRIES),
    director: getRandomElement(DIRECTORS),
    writers: getRandomWriters(),
    actors: getRandomActors()
  };
};
