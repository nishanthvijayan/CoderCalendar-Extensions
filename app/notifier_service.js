const Notifications = require('./notifications');

const serviceLoop = function () {
  Notifications.serviceQueue();
};

setInterval(() => { serviceLoop(); }, 120000);
