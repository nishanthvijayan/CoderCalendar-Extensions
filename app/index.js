var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App')
var UtilHelpers = require('./util');

$(document).ready(function(){
    UtilHelpers.checkIfFirstRun();
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
