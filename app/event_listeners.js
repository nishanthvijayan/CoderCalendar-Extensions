var Feedback = require("./feedback");
var Util = require("./util");

Util.checkIfFirstRun();

chrome.runtime.onMessage.addListener(function(message) {
    if (message.request == "askForFeedback") {
        setTimeout(function(){
            Feedback.init();
        }, 3000);
    }
});

chrome.runtime.setUninstallURL("https://goo.gl/forms/j9iP6qA9IuWbLimj1");
