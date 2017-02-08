var subscription = function (platform){
    if(localStorage.getItem(platform) == 'true'){
        return true;
    }else if(!localStorage.getItem(platform)){
        return true;
    }
    return false;
}

var initialize = function(){
    var supportedPlatforms = ['HACKEREARTH', 'HACKERRANK', 'CODECHEF', 'CODEFORCES', 'TOPCODER', 'GOOGLE', 'OTHER'];
    $.each(supportedPlatforms,function(i, platform){
        if(!localStorage.getItem(platform)) localStorage.setItem(platform,'true');
    });
    // Initialize Hidden Contest List
    if(!localStorage.getItem('HIDDEN_LIST')) localStorage.setItem('HIDDEN_LIST', "{}");
}

var isPaid = function(){
    // paid
    // free
    // Something went wrong with a desktop notification
    return true;
}

var alertBefore = function(){
    localStorage.getItem('alertBefore');
}
module.exports = {
    subscription: subscription,
    initialize: initialize,
    isPaid: isPaid
};
