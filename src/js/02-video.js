import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

const throttledOnTimeUpdate = throttle(getTimeupdateData, 1000);
player.on('timeupdate', throttledOnTimeUpdate);

function getTimeupdateData(data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
  console.log(data);
}

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player
  .setCurrentTime(
    JSON.parse(localStorage.getItem('videoplayer-current-time')).seconds
  )
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
