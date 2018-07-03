const moment = require('moment');

const Util = require('./util');
const Settings = require('./settings');

const haveNoAlerts = function (contest, success_callback, failure_callback) {
  if (failure_callback == undefined) failure_callback = function () {};

  chrome.storage.local.get('NOTIFICATIONQueue', (response) => {
    const notificationQueue = response.NOTIFICATIONQueue;
    for (let i = 0; i <= notificationQueue.length - 1; i++) {
      if (contest.Name == notificationQueue[i].contest.Name && contest.EndTime == notificationQueue[i].contest.EndTime) {
        failure_callback();
        return;
      }
    }
    success_callback();
  });
};

/*
    yes - alert is scheduled to be within a minute
    no - alert is scheduled to be after a minute
    ignore - contest has already started
*/
const isServisable = function (notification) {
  const curTime = new Date().getTime();
  const alertTime = parseInt(notification.alertTime);

  if ((curTime > Date.parse(notification.contest.StartTime))) return 'ignore';
  if ((alertTime - curTime) <= 120000) return 'yes';
  return 'no';
};

const sortByAlertTime = function (a, b) {
  return a.alertTime - b.alertTime;
};

const saveToQueue = function (contest, alertTime) {
  chrome.storage.local.get('NOTIFICATIONQueue', (response) => {
    const notificationQueue = response.NOTIFICATIONQueue;
    // TODO: comment out below
    // var curTime = new Date().getTime();
    // var alertTime = curTime + (1000 * 60 * 2);
    //

    haveNoAlerts(contest, () => {
      notificationQueue.push({ alertTime, contest });
      notificationQueue.sort(sortByAlertTime);
      chrome.storage.local.set({ NOTIFICATIONQueue: notificationQueue });
    });
  });
};

const serviceQueue = function () {
  chrome.storage.local.get('NOTIFICATIONQueue', (response) => {
    let notificationQueue = response.NOTIFICATIONQueue;
    let servicedRequests = 0;
    for (let i = 0; i <= notificationQueue.length - 1; i++) {
      const notification = notificationQueue[i];
      const contest = notification.contest;
      const servisableStatus = isServisable(notification);
      if (servisableStatus == 'yes') {
        const curTime = new Date().getTime();
        const startTime = Date.parse(contest.StartTime);
        const beginInTime = moment.duration(startTime - curTime).humanize();
        var opt = {
          type: 'basic',
          title: contest.Name,
          message: `will start in about ${beginInTime}\nat ${contest.StartTime.slice(0, 21)}`,
          iconUrl: Util.iconPath(contest.Platform),
          buttons: [{ title: 'Snooze' }, { title: 'Dismiss' }],
        };

        !(function outer(contest) {
          chrome.notifications.create(opt, (currentNotificationId) => {
            chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
              chrome.notifications.clear(notificationId, () => {
                if (notificationId == currentNotificationId && buttonIndex == 0) {
                  snooze(contest);
                }
              });
            });
          });
        }(contest));

        servicedRequests += 1;
      } else if (servisableStatus == 'ignore') {
        servicedRequests += 1;
      } else {
        break;
      }
    }

    if (servicedRequests > 0) {
      notificationQueue = notificationQueue.slice(servicedRequests);
      chrome.storage.local.set({ NOTIFICATIONQueue: notificationQueue });
    }
  });
};

const addAlert = function (contest) {
  Settings.getAlertBeforeTime((response) => {
    const alertBefore = response.ALERT_BEFORE_TIME;
    const startTime = Date.parse(contest.StartTime);
    const alertTime = startTime - alertBefore;
    saveToQueue(contest, alertTime);
  });
};

var snooze = function (contest) {
  Settings.getSnoozeInterval((response) => {
    const snoozeTime = response.SNOOZE_INTERVAL;
    const curTime = new Date().getTime();
    const alertTime = curTime + snoozeTime;
    saveToQueue(contest, alertTime);
  });
};

const removeAlert = function (contest) {
  chrome.storage.local.get('NOTIFICATIONQueue', (response) => {
    const notificationQueue = response.NOTIFICATIONQueue;
    for (let i = 0; i <= notificationQueue.length - 1; i++) {
      if (contest.Name == notificationQueue[i].contest.Name && contest.EndTime == notificationQueue[i].contest.EndTime) {
        notificationQueue.splice(i, 1);
        break;
      }
    }
    chrome.storage.local.set({ NOTIFICATIONQueue: notificationQueue });
  });
};

module.exports = {
  addAlert,
  removeAlert,
  serviceQueue,
  haveNoAlerts,
};
