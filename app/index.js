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
