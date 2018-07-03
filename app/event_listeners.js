const Feedback = require('./feedback');
const Util = require('./util');

Util.checkIfFirstRun();

chrome.runtime.onMessage.addListener((message) => {
  if (message.request == 'askForFeedback') {
    setTimeout(() => {
      Feedback.init();
    }, 3000);
  }
});

chrome.runtime.setUninstallURL('https://goo.gl/forms/j9iP6qA9IuWbLimj1');
