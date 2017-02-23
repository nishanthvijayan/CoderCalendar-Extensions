// Standard Google Universal Analytics code
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); // Note: https protocol here

ga('create', 'UA-64496539-2', 'auto');
ga('set', 'checkProtocolTask', function(){}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
ga('send', 'pageview', '/index.html');

var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App')
var UtilHelpers = require('./util');
var Feedback = require('./feedback');

$(document).ready(function(){

    if(isNaN(parseInt(localStorage.OPENCOUNT))){
        localStorage.OPENCOUNT = "0";
    }
    localStorage.OPENCOUNT = (parseInt(localStorage.OPENCOUNT) + 1).toString();
    if(parseInt(localStorage.OPENCOUNT) > 0 && parseInt(localStorage.OPENCOUNT)%30 == 0){
        chrome.runtime.sendMessage({request: "askForFeedback"});
    }

    ReactDOM.render(<App />, document.getElementById('ui-content'));

    addEventListener('scroll', function(){
        localStorage.scrollTop = document.body.scrollTop;
        localStorage.scrolltime = (new Date()).getTime()/1000;
    });

    var now = (new Date()).getTime()/1000;
    if(localStorage.scrollTop && now - parseInt(localStorage.scrolltime) < 5*60){
      document.body.scrollTop = localStorage.scrollTop;
    }
});
