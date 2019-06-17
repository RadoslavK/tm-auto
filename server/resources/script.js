const fs = require('fs');

const formatTime = (date) => {
  const hours = date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
  const mins = date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
  const sec = date.getSeconds() > 9 ? `${date.getSeconds()}` : `0${date.getSeconds()}`;

  return `${hours}:${mins}:${sec}`;
};

const formatTimeFromSeconds = (seconds) => {
  const time = new Date(0, 0, 0, 0, 0, seconds);
  return formatTime(time);
};

const info = JSON.parse(fs.readFileSync('./buildingsInfo.json').toString());
const mb = Object.values(info[15].costs).map(cost => cost.buildTime);

const speed = 1;

const mbs = mb.map(b => formatTimeFromSeconds(10 * Math.round(b / speed / 10)));

console.log(mbs);