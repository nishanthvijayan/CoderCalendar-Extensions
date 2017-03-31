var Notifications = require('./notifications');

var serviceLoop = function(contest){
    Notifications.serviceQueue();
}

setInterval(function(){serviceLoop();}, 120000);
