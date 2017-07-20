var Notifications = require("./notifications");

var serviceLoop = function(){
    Notifications.serviceQueue();
};

setInterval(function(){serviceLoop();}, 120000);
