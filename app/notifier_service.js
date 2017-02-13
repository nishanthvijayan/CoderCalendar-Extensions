var Payment = require('./payment');
var Notifications = require('./notifications');

var serviceLoop = function(contest){
    Payment.isPremiumUser(function(){
        Notifications.serviceQueue();
    }, function(){console.log("Not premium user")})
}

setInterval(function(){serviceLoop();}, 120000);
