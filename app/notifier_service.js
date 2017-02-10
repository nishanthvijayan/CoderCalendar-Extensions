var Settings = require('./settings');
var Notifications = require('./notifications');

var serviceLoop = function(contest){
    if(Settings.isPaid()){
        Notifications.serviceQueue();
    }
}

setInterval(function(){serviceLoop();}, 60000);
