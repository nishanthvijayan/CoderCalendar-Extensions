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

// Checks if the app version has changed
// Opens settings page on first run after install/upgrade
const checkIfFirstRun = () => {
  const currVersion = getVersion();
  const prevVersion = localStorage.version;

  if (prevVersion == undefined) {
    chrome.tabs.create({ url: 'http://nishanthvijayan.github.io/CoderCalendar' });
  }

  localStorage.version = currVersion;
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

module.exports = {
  convertToBrowzerTimezone,
  checkIfFirstRun,
  iconPath,
};
