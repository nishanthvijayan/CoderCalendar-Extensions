// converts the input time(which is Indian Standard Time) to
// the browser timezone.
var convertToBrowzerTimezone = function (date){
    var d = new Date(date);
    var offset = -(d.getTimezoneOffset());
    var newDate = new Date(d.getTime() + offset*60000 - 19800000);
    return newDate;
};

var getVersion = function () {
    var details = chrome.app.getDetails();
    return details.version;
};

// Checks if the app version has changed
// Opens settings page on first run after install/upgrade
var checkIfFirstRun = function (){
    var currVersion = getVersion();
    var prevVersion = localStorage["version"];
    console.log(currVersion);
    console.log(prevVersion);
    if(prevVersion == undefined){
        chrome.tabs.create({ url: "http://nishanthvijayan.github.io/CoderCalendar" });
    }
    else if (currVersion != prevVersion) {
        var opt = {
            type: "basic",
            title: "Coder's Calendar Updated",
            message: "Desktop notifications is now free!\n",
            iconUrl: "../img/icon32.png",
        };
        chrome.notifications.create(opt, function(id){});
    }
    localStorage["version"] = currVersion;
};

var icon_path = function (platform){
    switch (platform){
    case "CODECHEF":
        return "img/codechef.jpg";
    case "HACKEREARTH":
        return "img/hackerearth.png";
    case "CODEFORCES":
        return "img/codeforces.png";
    case "TOPCODER":
        return "img/topcoder.gif";
    case "HACKERRANK":
        return "img/hackerrank.png";
    case "GOOGLE":
        return "img/google.png";
    default:
        return "img/other.png";
    }
};


module.exports = {
    convertToBrowzerTimezone: convertToBrowzerTimezone,
    checkIfFirstRun: checkIfFirstRun,
    icon_path: icon_path
};
