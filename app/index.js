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
const $ = require('jquery');

const App = require('./components/App');

const resetScrollPosition = () => {
  const now = (new Date()).getTime() / 1000;
  if (localStorage.scrollPosition && now - parseInt(localStorage.scrolltime, 10) < 5 * 60) {
    window.scroll(0, localStorage.scrollPosition);
  }
};

const updateScrollPositionStore = () => {
  localStorage.scrollPosition = window.scrollY;
  localStorage.scrolltime = (new Date()).getTime() / 1000;
};

const incrementOpenCount = () => {
  if (isNaN(parseInt(localStorage.OPENCOUNT, 10))) {
    localStorage.OPENCOUNT = '0';
  }

  localStorage.OPENCOUNT = (parseInt(localStorage.OPENCOUNT, 10) + 1).toString();
};

const askForFeedbackIfNeeded = () => {
  if (parseInt(localStorage.OPENCOUNT, 10) > 0 && parseInt(localStorage.OPENCOUNT, 10) % 30 == 0) {
    chrome.runtime.sendMessage({ request: 'askForFeedback' });
  }
};

$(document).ready(() => {
  incrementOpenCount();
  askForFeedbackIfNeeded();

  ReactDOM.render(<App />, document.getElementById('ui-content'));

  addEventListener('scroll', updateScrollPositionStore);

  resetScrollPosition();
});
