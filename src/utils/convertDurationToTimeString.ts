const SECONDS = 60;
const HOUR_IN_SECONDS = 60 * 60;

function convertDurationToTimeString(duration: number) {
  const hours = Math.floor(duration / HOUR_IN_SECONDS);
  const minutes = Math.floor((duration % HOUR_IN_SECONDS) / SECONDS);
  const seconds = duration % SECONDS;

  const timeString = [hours, minutes, seconds]
    .map(unit => String(unit).padStart(2, '0'))
    .join(':');

  return timeString;
}

export { convertDurationToTimeString };
