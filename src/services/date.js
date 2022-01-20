const isValidDate = (d) => {
  return d instanceof Date && !isNaN(d);
};

export function formatDate(dateUTC) {
  const date = new Date(dateUTC);
  if (!isValidDate) return '';

  let day = date.getUTCDate();
  day = day < 10 ? `0${day}` : day;

  let month = date.getUTCMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  let year = date.getUTCFullYear();

  let hour = date.getUTCHours();
  hour = hour < 10 ? `0${hour}` : hour;

  let minute = date.getUTCMinutes();
  minute = minute < 10 ? `0${minute}` : minute;

  let second = date.getUTCSeconds();
  second = second < 10 ? `0${second}` : second;

  const formatedDate = `${day}/${month}/${year} at ${hour}:${minute}:${second}`;
  return formatedDate;
}
