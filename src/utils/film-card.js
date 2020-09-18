import moment from "moment";

export const formatCommentDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`YYYY/MM/DD HH:mm`);
};

export const formatDuration = (commonMinutesCount) => {
  const formattedDuration = moment.duration(commonMinutesCount, `minutes`);
  const hours = formattedDuration.hours();
  const minutes = formattedDuration.minutes();

  const formatHours = hours > 0 ? `${hours}h` : ``;
  const formatMinutes = minutes > 0 ? `${minutes}m` : ``;

  return formatHours + ` ` + formatMinutes;
}

export const formatReleaseYear = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`YYYY`);
}

export const formatReleaseDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return moment(date).format(`DD MMMM YYYY`);
};
