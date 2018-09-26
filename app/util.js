// converts the input time(which is Indian Standard Time) to
// the browser timezone.
const convertToBrowzerTimezone = function (date) {
  const d = new Date(date);
  const offset = -(d.getTimezoneOffset());
  const newDate = new Date(d.getTime() + offset * 60000 - 19800000);
  return newDate;
};

const getVersion = function () {
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
const checkIfFirstRun = function () {
  const currVersion = getVersion();
  const prevVersion = localStorage.version;

  if (prevVersion == undefined) {
    chrome.tabs.create({ url: 'http://nishanthvijayan.github.io/CoderCalendar' });
  }

  localStorage.version = currVersion;
};

const iconPath = function (platform) {
  switch (platform) {
    case 'CODECHEF':
      return 'img/codechef.jpg';
    case 'HACKEREARTH':
      return 'img/hackerearth.png';
    case 'CODEFORCES':
      return 'img/codeforces.png';
    case 'TOPCODER':
      return 'img/topcoder.gif';
    case 'HACKERRANK':
      return 'img/hackerrank.png';
    default:
      return 'img/other.png';
  }
};


module.exports = {
  convertToBrowzerTimezone,
  checkIfFirstRun,
  iconPath,
};
