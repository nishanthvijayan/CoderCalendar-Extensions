var askForRatings = function(){
    var opt = {
        type: "basic",
        title: "How about a rating on the Extension Store?",
        message: "  ",
        iconUrl: "../img/icon32.png",
        buttons: [{"title": "Ok, sure"}, {"title": "No, thanks"}]
    }

    var currentNotificationId;
    chrome.notifications.create(opt, function(id){currentNotificationId = id;});
    chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
        chrome.notifications.clear(notificationId, function(){
            if(notificationId == currentNotificationId && buttonIndex == 0){
                chrome.tabs.create({ url: "https://chrome.google.com/webstore/detail/coders-calendar/bageaffklfkikjigoclfgengklfnidll/reviews"});
            }
        });
    });    
}

var askForFeedback = function(){
    var opt = {
        type: "basic",
        title: "Would you mind giving us some feedback?",
        message: "  ",
        iconUrl: "../img/icon32.png",
        buttons: [{"title": "Ok, sure"}, {"title": "No, thanks"}]
    }

    var currentNotificationId;
    chrome.notifications.create(opt, function(id){currentNotificationId = id;});
    chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
        chrome.notifications.clear(notificationId, function(){
            if(notificationId == currentNotificationId && buttonIndex == 0){
                chrome.tabs.create({ url: "https://goo.gl/forms/vgVJOQKwooO2pur13"});
            }
        });
    });    
}

var init = function(){
    var opt = {
        type: "basic",
        title: "Are you enjoing Coder's Calendar?",
        message: "",
        iconUrl: "../img/icon32.png",
        buttons: [{"title": "Yes!"}, {"title": "Not Really"}]
    }

    var currentNotificationId;
    chrome.notifications.create(opt, function(id){currentNotificationId = id;});
    chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
        chrome.notifications.clear(notificationId, function(){
            if(notificationId == currentNotificationId && buttonIndex == 0){
                askForRatings();
            }else if(notificationId == currentNotificationId && buttonIndex == 1){
                askForFeedback();
            }
        });
    });
}

module.exports = {
    init: init
};
