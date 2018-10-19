const {
  CODECHEF,
  CODEFORCES,
  HACKEREARTH,
  HACKERRANK,
  TOPCODER, LEETCODE, KAGGLE, CSACADEMY, ATCODER,
} = require('./constants');

// converts input dateTime (which is UTC) to browser timezone.
const convertToBrowzerTimezone = (dateTime) => {
  const d = new Date(dateTime);
  const offset = -(d.getTimezoneOffset());
  const newDate = new Date(d.getTime() + offset * 60000);
  return newDate;
};

const getVersion = () => {
  if (chrome.app) {
    return chrome.app.getDetails().version;
  }
  if (browser.runtime) {
    return browser.runtime.getManifest().version;
  }

  return '1.0.0';
};

// Returns true if the app is being launched for the first time after installion/update
const isFirstLaunch = () => {
  const currVersion = getVersion();
  const prevVersion = localStorage.version;
  localStorage.version = currVersion;

  if (prevVersion == undefined || prevVersion != currVersion) {
    return true;
  }

  return false;
};

const iconPath = (platform) => {
  switch (platform) {
    case CODECHEF:
      return 'img/codechef.jpg';
    case HACKEREARTH:
      return 'img/hackerearth.png';
    case CODEFORCES:
      return 'img/codeforces.png';
    case TOPCODER:
      return 'img/topcoder.gif';
    case HACKERRANK:
      return 'img/hackerrank.png';
    case LEETCODE:
      return 'img/leetcode.png';
    case CSACADEMY:
      return 'img/csacademy.png';
    case KAGGLE:
      return 'img/kaggle.png';
    case ATCODER:
      return 'img/atcoder.png';
    default:
      return 'img/other.png';
  }
};

const capitalize = (str) => {
  if (!str || str.length == 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = {
  convertToBrowzerTimezone,
  isFirstLaunch,
  iconPath,
  capitalize,
};
