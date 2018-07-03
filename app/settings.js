const subscription = function (platform) {
  if (localStorage.getItem(platform) == 'true') {
    return true;
  } if (!localStorage.getItem(platform)) {
    return true;
  }
  return false;
};

const toggleSubscription = function (platform) {
  if (subscription(platform)) {
    ga('send', 'event', 'Platform Setting', 'UnCheck', platform);
    localStorage.setItem(platform, 'false');
  } else {
    ga('send', 'event', 'Platform Setting', 'Check', platform);
    localStorage.setItem(platform, 'true');
  }
};

const initialize = function () {
  const supportedPlatforms = ['HACKEREARTH', 'HACKERRANK', 'CODECHEF', 'CODEFORCES', 'TOPCODER', 'GOOGLE', 'OTHER'];
  supportedPlatforms.forEach((platform) => {
    if (!localStorage.getItem(platform)) localStorage.setItem(platform, 'true');
  });
  // Initialize Hidden Contest List
  if (!localStorage.getItem('HIDDEN_LIST')) localStorage.setItem('HIDDEN_LIST', '{}');

  // Initialize NotificationQueue
  chrome.storage.local.getBytesInUse('NOTIFICATIONQueue', (bytes) => {
    if (bytes == 0) {
      chrome.storage.local.set({ NOTIFICATIONQueue: [] });
    }
  });

  chrome.storage.local.getBytesInUse('ALERT_BEFORE_TIME', (bytes) => {
    if (bytes == 0) {
      chrome.storage.local.set({ ALERT_BEFORE_TIME: (30 * 60 * 1000) });
    }
  });

  chrome.storage.local.getBytesInUse('SNOOZE_INTERVAL', (bytes) => {
    if (bytes == 0) {
      chrome.storage.local.set({ SNOOZE_INTERVAL: (5 * 60 * 1000) });
    }
  });
};

const getAlertBeforeTime = function (callback) {
  chrome.storage.local.get('ALERT_BEFORE_TIME', callback);
};

const getSnoozeInterval = function (callback) {
  chrome.storage.local.get('SNOOZE_INTERVAL', callback);
};

const setAlertBeforeTime = function (value) {
  chrome.storage.local.set({ ALERT_BEFORE_TIME: value });
};

const setSnoozeInterval = function (value) {
  chrome.storage.local.set({ SNOOZE_INTERVAL: value });
};

module.exports = {
  subscription,
  initialize,
  toggleSubscription,
  getAlertBeforeTime,
  getSnoozeInterval,
  setAlertBeforeTime,
  setSnoozeInterval,
};
