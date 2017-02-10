var Util = require('util');
var Settings = require('./settings');

var isDuplicate = function(){
    return false;
}

var isValidAlertData = function(){
    return true;
}

/*
    yes - alert is scheduled to be within a minute
    no - alert is scheduled to be after a minute
    ignore - alert time is already over
*/
var isServisable = function(notification){
    var curTime = (new Date()).getTime();
    var alertTime = parseInt(notification.alertTime);
    if((alertTime - curTime) > 60000)
        return "ignore"
    else if(Math.abs(alertTime - curTime) <= 60000)
        return "yes"
    else
        return "no"
    return true;
}

var sortByAlertTime = function(a, b){
    var keyA = a.alertTime,
        keyB = b.alertTime;

    if(keyA < keyB) return -1;
    if(keyA > keyB) return 1;
    return 0;
}

var saveToQueue = function (contest, alertTime){
    notificationQueue = JSON.parse(localStorage.getItem("NOTIFICATIONQueue")).notifications;
    if(isValidAlertData(contest, alertTime) && !isDuplicate(contest, alertTime)){
        notificationQueue.push({"alertTime": alertTime, "contest": contest});
        notificationQueue.sort(sortByAlertTime);
        localStorage.setItem('NOTIFICATIONQueue', JSON.stringify({"notifications": notificationQueue}));
    }
}

var serviceQueue = function (){
    notificationQueue = JSON.parse(localStorage.getItem("NOTIFICATIONQueue")).notifications;
    var servicedRequests = 0;
    for (var i = 0; i <= notificationQueue.length - 1; i++) {
        var notification = notificationQueue[i];
        var contest = notification.contest;

        if(isServisable(notification) == "yes"){
            console.log('notification made');
            var curTime = (new Date()).getTime();
            var startTime = Date.parse(contest.StartTime);
            var beginInTime = ((startTime - curTime)/60000) + "minutes";
            var opt = {
              type: "basic",
              title: contest.Name,
              message: "will begin in about" + beginInTime,
              iconUrl: Util.icon_path(contest.Platform),
              buttons: [{"title": "Snooze"}, {"title": "Dismiss"}]
            }
            var currentNotificationId;
            chrome.notifications.create(opt, function(id){currentNotificationId = id;});
            chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
              if(notificationId == currentNotificationId && buttonIndex == 0){
                snooze(contest);
              }else if(notificationId == currentNotificationId && buttonIndex == 1){
                chrome.notifications.clear(currentNotificationId, function(){})
              }
            });
            servicedRequests = servicedRequests + 1;
        }else if(isServisable(notification) == "ignore"){
            servicedRequests = servicedRequests + 1;
            continue;
        }else{
            break;
        }
    }
    notificationQueue = notificationQueue.slice(servicedRequests);
    localStorage.setItem('NOTIFICATIONQueue', JSON.stringify({"notifications": notificationQueue}));
}

var addAlert = function(contest){
    var startTime = Date.parse(contest.StartTime);
    var alertBefore = Settings.getAlertBeforeTime();
    var alertTime = startTime - alertBefore;
    saveToQueue(contest, alertTime);
}

var snooze = function(contest){
    var curTime = (new Date()).getTime();
    var snoozeTime = Settings.getSnoozeTime();
    var alertTime = curTime + snoozeTime;
    saveToQueue(contest, alertTime);
}


module.exports = {
    addAlert: addAlert,
    serviceQueue: serviceQueue
};
