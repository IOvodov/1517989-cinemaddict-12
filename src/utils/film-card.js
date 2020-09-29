import moment from "moment";

export const formatCommentDate = (date) => {
  return moment(date).format(`YYYY/MM/DD HH:mm`);
};

export const formatDuration = (commonMinutesCount) => {
  const formattedDuration = moment.duration(commonMinutesCount, `minutes`);
  const hours = formattedDuration.hours();
  const minutes = formattedDuration.minutes();

  const formatHours = hours > 0 ? `${hours}h` : ``;
  const formatMinutes = minutes > 0 ? `${minutes}m` : ``;

  return formatHours + ` ` + formatMinutes;
};

export const formatReleaseYear = (date) => {
  return moment(date).format(`YYYY`);
};

export const formatReleaseDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const sortFilmDate = (firstFilm, secondFilm) => {
  return firstFilm.releaseDate - secondFilm.releaseDate;
};

export const sortFilmRating = (firstFilm, secondFilm) => {
  return firstFilm.rating - secondFilm.rating;
};
