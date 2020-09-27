import moment from 'moment';

export const sortedGenres = (data) => {
  if (data.length === 0) {
    return data.length;
  }
  const allGenres = [];

  data.forEach((film) => {
    const genres = film.genres;
    if (genres) {
      genres.forEach((genre) => {
        allGenres.push(genre);
      })
    }
  });

  let amountWatchedGenres = {};
  allGenres.forEach((genre) => {
    amountWatchedGenres[genre] = amountWatchedGenres[genre] + 1 || 1;
  });

  const sortedArrayGenres = Object.entries(amountWatchedGenres).sort((prev, next) => next[1] - prev[1]);

  return Object.fromEntries(sortedArrayGenres);
};

export const topGenre = (data) => {

  if (data.length === 0) {
    return ``;
  }

  const amountWatchedGenres = sortedGenres(data);

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  return getKeyByValue(amountWatchedGenres, Math.max.apply(null, Object.values(amountWatchedGenres)));
};

export const totalDuration = (data) => {
  let totalHours = 0;
  let totalMinutes = 0;

  if (data.length === 0) {
    totalHours = 0;
    totalMinutes = 0;
  } else {

    data.forEach((item) => {
      totalHours += +moment(item.duration).format(`HH`);
      totalMinutes += +moment(item.duration).format(`MM`);
    });

    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;
  }

  return [totalHours, totalMinutes];
};
