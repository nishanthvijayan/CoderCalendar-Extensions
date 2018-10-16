// Standard Google Universal Analytics code
(function (i, s, o, g, r, a, m) {
  i.GoogleAnalyticsObject = r; i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date(); a = s.createElement(o),
  m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m);
}(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')); // Note: https protocol here

ga('create', 'UA-64496539-2', 'auto');
ga('set', 'checkProtocolTask', () => {}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
ga('send', 'pageview', '/index.html');

const ReactDOM = require('react-dom');
const React = require('react');
const store = require('./store');
const App = require('./components/App');

const resetScrollPosition = () => {
  if (store.isScollPositionDataFresh()) {
    window.scroll(0, store.getScrollPosition());
  }
};

const updateScrollPositionStore = () => store.setScrollPosition(window.scrollY);

const askForFeedbackIfNeeded = () => {
  const openCount = store.getOpenCount();
  if (openCount > 0 && openCount % 30 == 0) {
    chrome.runtime.sendMessage({ request: 'askForFeedback' });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  store.incrementOpenCount();
  askForFeedbackIfNeeded();

  ReactDOM.render(<App />, document.getElementById('ui-content'));

  addEventListener('scroll', updateScrollPositionStore);

  resetScrollPosition();
}, false);
