var subscription = function (platform){
    if(localStorage.getItem(platform) == 'true'){
        return true;
    }else if(!localStorage.getItem(platform)){
        return true;
    }
    return false;
}

var toggleSubscription = function(platform){
    if(subscription(platform)){
        localStorage.setItem(platform, 'false');
    }else{
        localStorage.setItem(platform, 'true');
    }
}

var initialize = function(){
    var supportedPlatforms = ['HACKEREARTH', 'HACKERRANK', 'CODECHEF', 'CODEFORCES', 'TOPCODER', 'GOOGLE', 'OTHER'];
    $.each(supportedPlatforms,function(i, platform){
        if(!localStorage.getItem(platform)) localStorage.setItem(platform,'true');
    });
    // Initialize Hidden Contest List
    if(!localStorage.getItem('HIDDEN_LIST'))
        localStorage.setItem('HIDDEN_LIST', "{}");

    // Initialize NotificationQueue
    chrome.storage.local.getBytesInUse("NOTIFICATIONQueue", function(bytes){
        if(bytes == 0){
            chrome.storage.local.set({"NOTIFICATIONQueue": []}, function(){});
        }
    });

    chrome.storage.local.getBytesInUse("ALERT_BEFORE_TIME", function(bytes){
        if(bytes == 0){
            chrome.storage.local.set({"ALERT_BEFORE_TIME": (30 * 60 * 1000)}, function(){});
        }
    });

    chrome.storage.local.getBytesInUse("SNOOZE_INTERVAL", function(bytes){
        if(bytes == 0){
            chrome.storage.local.set({"SNOOZE_INTERVAL": (5 * 60 * 1000)}, function(){});
        }
    });
}

var getAlertBeforeTime = function(callback){
    chrome.storage.local.get("ALERT_BEFORE_TIME", callback);
}

var getSnoozeInterval = function(callback){
    chrome.storage.local.get("SNOOZE_INTERVAL", callback);
}

var setAlertBeforeTime = function(value){
    chrome.storage.local.set({"ALERT_BEFORE_TIME": value});
}

var setSnoozeInterval = function(value){
    chrome.storage.local.set({"SNOOZE_INTERVAL": value});
}

module.exports = {
    subscription: subscription,
    initialize: initialize,
    toggleSubscription: toggleSubscription,
    getAlertBeforeTime: getAlertBeforeTime,
    getSnoozeInterval: getSnoozeInterval,
    setAlertBeforeTime: setAlertBeforeTime,
    setSnoozeInterval: setSnoozeInterval
};
