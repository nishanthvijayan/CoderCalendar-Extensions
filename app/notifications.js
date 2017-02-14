var moment = require('moment');

var Util = require('./util');
var Settings = require('./settings');

var haveNoAlerts = function(contest, success_callback, failure_callback){
    if(failure_callback == undefined)
        failure_callback = function(){};

    chrome.storage.local.get("NOTIFICATIONQueue", function(response){
        var notificationQueue = response.NOTIFICATIONQueue;
        for (var i = 0; i <= notificationQueue.length - 1; i++) {
            if(contest.Name == notificationQueue[i].contest.Name && contest.EndTime == notificationQueue[i].contest.EndTime){
                failure_callback();
                return;
            }
        }
        success_callback();
    });
}

/*
    yes - alert is scheduled to be within a minute
    no - alert is scheduled to be after a minute
    ignore - contest has already started
*/
var isServisable = function(notification){
    var curTime = new Date().getTime();
    var alertTime = parseInt(notification.alertTime);

    if((curTime > Date.parse(notification.contest.StartTime)))
        return "ignore"
    else if((alertTime - curTime) <= 120000)
        return "yes"
    else
        return "no"
}

var sortByAlertTime = function(a, b){
    return a.alertTime - b.alertTime;
}

var saveToQueue = function (contest, alertTime){
    chrome.storage.local.get("NOTIFICATIONQueue", function(response){
        var notificationQueue = response.NOTIFICATIONQueue;
        // TODO: comment out below
        var curTime = new Date().getTime();
        var alertTime = curTime + (1000 * 60 * 2);
        // 

        haveNoAlerts(contest, function(){
            notificationQueue.push({"alertTime": alertTime, "contest": contest});
            notificationQueue.sort(sortByAlertTime);
            chrome.storage.local.set({"NOTIFICATIONQueue": notificationQueue}, function(){});
        });
    });
}

var serviceQueue = function (){
    chrome.storage.local.get("NOTIFICATIONQueue", function(response){
        var notificationQueue = response.NOTIFICATIONQueue;
        var servicedRequests = 0;
        for (var i = 0; i <= notificationQueue.length - 1; i++) {
            var notification = notificationQueue[i];
            var contest = notification.contest;
            var servisableStatus = isServisable(notification);
            if(servisableStatus == "yes"){

                var curTime = new Date().getTime();
                var startTime = Date.parse(contest.StartTime);
                var beginInTime = moment.duration(startTime - curTime).humanize();
                var opt = {
                  type: "basic",
                  title: contest.Name,
                  message: "will start in about " + beginInTime + "\nat " + contest.StartTime.slice(0,21),
                  iconUrl: Util.icon_path(contest.Platform),
                  buttons: [{"title": "Snooze"}, {"title": "Dismiss"}],
                }

                !function outer(contest){
                    chrome.notifications.create(opt, function(currentNotificationId){
                        chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
                            chrome.notifications.clear(notificationId, function(){
                                if(notificationId == currentNotificationId && buttonIndex == 0){
                                    snooze(contest);
                                }
                            });
                        });
                    });
                }(contest)

                servicedRequests = servicedRequests + 1;
            }else if(servisableStatus == "ignore"){
                servicedRequests = servicedRequests + 1;
            }else{
                break;
            }
        }
        notificationQueue = notificationQueue.slice(servicedRequests);
        chrome.storage.local.set({"NOTIFICATIONQueue": notificationQueue}, function(){});
    });
}

var addAlert = function(contest){
    Settings.getAlertBeforeTime(function(response){
        var alertBefore = response['ALERT_BEFORE_TIME'];
        var startTime = Date.parse(contest.StartTime);
        var alertTime = startTime - alertBefore;
        saveToQueue(contest, alertTime);
    });
}

var snooze = function(contest){
    Settings.getSnoozeInterval(function(response){
        var snoozeTime = response['SNOOZE_INTERVAL'];
        var curTime = new Date().getTime();
        var alertTime = curTime + snoozeTime;
        saveToQueue(contest, alertTime);
    });
}

var removeAlert = function(contest){
    chrome.storage.local.get("NOTIFICATIONQueue", function(response){
        var notificationQueue = response.NOTIFICATIONQueue;
        for (var i = 0; i <= notificationQueue.length - 1; i++) {
            if(contest.Name == notificationQueue[i].contest.Name && contest.EndTime == notificationQueue[i].contest.EndTime){
                notificationQueue.splice(i, 1);
                break;
            }
        }
        chrome.storage.local.set({"NOTIFICATIONQueue": notificationQueue}, function(){});
    });
}

module.exports = {
    addAlert: addAlert,
    removeAlert: removeAlert,
    serviceQueue: serviceQueue,
    haveNoAlerts: haveNoAlerts
};
