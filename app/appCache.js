var Util = require("./util");

var appCache = {
    store: function(contests){
        contests.ongoing = contests.ongoing.map(function(contest){
            contest.EndTime = Util.convertToBrowzerTimezone(contest.EndTime).toString();
            return contest;
        });

        contests.upcoming = contests.upcoming.map(function(contest){
            contest.StartTime = Util.convertToBrowzerTimezone(contest.StartTime).toString();
            contest.EndTime = Util.convertToBrowzerTimezone(contest.EndTime).toString();
            return contest;
        });

        var now = (new Date()).getTime()/1000;
        localStorage.CACHED_DATA  = JSON.stringify(contests);
        localStorage.CACHED_TIME = now;
    },

    fetch: function(){
        if (this.empty()){
            return { data: {ongoing: [], upcoming: []}, time: 0 };
        }else{
            return {
                data: JSON.parse(localStorage.CACHED_DATA),
                time: localStorage.CACHED_TIME
            };
        }
    },

    dataOlderThan: function(minutes){
        var now = (new Date()).getTime()/1000;
        return !!((now-(minutes*60)) > localStorage.CACHED_TIME);
    },

    empty: function(){
        return !(localStorage.CACHED_DATA);
    }
};

module.exports = appCache;
