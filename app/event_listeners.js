var Feedback = require('./feedback');

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.request == "askForFeedback") {
        Feedback.init();
    }
});
