const { isFirstLaunch } = require('./util');

if (isFirstLaunch()) {
  chrome.tabs.create({ url: 'http://nishanthvijayan.github.io/CoderCalendar' });
}

chrome.runtime.setUninstallURL('https://goo.gl/forms/j9iP6qA9IuWbLimj1');
