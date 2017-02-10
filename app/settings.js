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
    if(!localStorage.getItem('NOTIFICATIONQueue'))
        localStorage.setItem('NOTIFICATIONQueue', JSON.stringify({"notifications": []}));
}

var isPaid = function(){
    // paid
    // free
    // Something went wrong with a desktop notification
    return true;
}

var getAlertBeforeTime = function(){
    return 30 * 60 * 1000;
}

var getSnoozeTime = function(){
    return 5 * 60 * 1000;
}

module.exports = {
    subscription: subscription,
    initialize: initialize,
    isPaid: isPaid,
    toggleSubscription: toggleSubscription,
    getAlertBeforeTime: getAlertBeforeTime,
    getSnoozeTime: getSnoozeTime
};
