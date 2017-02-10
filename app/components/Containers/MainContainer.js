var React = require('react');
var ContestTypeHeader = require('../ContestTypeHeader');
var ContestList = require('../ContestList');
var Cache = require('../../appCache');
var Settings = require('../../settings');
var Hide = require('../../hide');

var Main = React.createClass({
    filterContestsBySettings: function(contests){
        var filteredContests = contests.filter(function(contest){
            return Settings.subscription(contest.Platform);
        }).filter(function(contest){
            return !Hide.isHidden(contest);
        });
        return filteredContests;
    },
    filterContestsByTime: function(allContests){
        var currentTime  = new Date().getTime();
        var filteredContests = {}

        // Remove contests that are already over from ongoing contests list
        filteredContests.ongoing = allContests.ongoing.filter(function(contest){
            var endTime   = Date.parse(contest.EndTime);
            return (endTime > currentTime);
        });

        // Move contests that have started, to ongoing events list
        $.each(allContests.upcoming, function(i, contest){
            var startTime = Date.parse(contest.StartTime);
            var endTime   = Date.parse(contest.EndTime);
            if(startTime < currentTime && endTime > currentTime){
                filteredContests.ongoing.push(contest)
            }
        });

        //  Remove contests that have started/ended from upcoming contests list
        filteredContests.upcoming = allContests.upcoming.filter(function(contest){
            var startTime = Date.parse(contest.StartTime);
            var endTime   = Date.parse(contest.EndTime);
            return (startTime > currentTime && endTime > currentTime);
        });

        return filteredContests;
    },
    processContestList: function(contests){
        var contestsFilteredBySettings =  {
            ongoing: this.filterContestsBySettings(contests.ongoing),
            upcoming: this.filterContestsBySettings(contests.upcoming)
        };
        return this.filterContestsByTime(contestsFilteredBySettings);
    },
    render: function(){
        contests = this.processContestList(Cache.fetch().data);
        return(
            <div className = 'main-container'>
                <div id='ongoing' className="top-title">
                    <ContestTypeHeader type="Live" />
                    <ContestList contests={contests.ongoing} type='live' />
                </div>
                <div id='upcoming'>
                    <ContestTypeHeader type="Upcoming" />
                    <ContestList contests={contests.upcoming} type='upcoming' />
                </div>
            </div>
        )
    }
});

module.exports = Main;
