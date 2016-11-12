// converts the input time(which is Indian Standard Time) to
// the browser timezone.
var convertToBrowzerTimezone = function (date){
    var d = new Date(date);
    var offset = -(d.getTimezoneOffset());
    var newDate = new Date(d.getTime() + offset*60000 - 19800000);
    return newDate;
}

var getVersion = function () {
    var details = chrome.app.getDetails();
    return details.version;
}

// Checks if the app version has changed
// Opens settings page on first run after install/upgrade
var checkIfFirstRun = function (){
    var currVersion = getVersion();
    var prevVersion = localStorage['version']
    if (currVersion != prevVersion) {
        chrome.tabs.create({ url: "http://nishanthvijayan.github.io/CoderCalendar" });
        localStorage['version'] = currVersion;
    }
}

module.exports = {
    convertToBrowzerTimezone: convertToBrowzerTimezone,
    checkIfFirstRun: checkIfFirstRun
};
