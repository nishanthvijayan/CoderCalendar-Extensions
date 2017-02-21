var Feedback = require('./feedback');

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.request == "askForFeedback") {
        setTimeout(function(){
            Feedback.init();
        }, 3000);
    }
});
