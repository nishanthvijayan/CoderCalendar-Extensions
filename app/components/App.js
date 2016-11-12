var React = require('react');
var MainContainer = require('./MainContainer');
var Header = require('./Header');
var Cache = require('../appCache');

var App = React.createClass({
    getInitialState: function(){
        return{
            isLoading: false,
            contests: this.processContestList(Cache.fetch().data)
        }
    },
    initializeSettings: function(){
        var supportedPlatforms = ['HACKEREARTH', 'HACKERRANK', 'CODECHEF', 'CODEFORCES', 'TOPCODER', 'GOOGLE', 'OTHER'];
        $.each(supportedPlatforms,function(i, platform){
            if(!localStorage.getItem(platform)) localStorage.setItem(platform,'true');
        });
    },
    filterContestsBySettings: function(contests){
        var filteredContests = contests.filter(function(contest){
            return !!(localStorage.getItem(contest.Platform));
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
    getContestList: function(){
        this.setState({
            isLoading: true
        });

        var component = this;
        $.when( $.ajax( "https://contesttrackerapi.herokuapp.com/" )).then(function(data, textStatus, jqXHR){

            var contests = data.result;

            Cache.store(contests);

            component.setState({
                contests: component.processContestList(contests),
                isLoading: false
            });
        }, function(data, textStatus, jqXHR){

            component.setState({
                isLoading: false
            });
        });
    },
    componentDidMount: function(){
        this.initializeSettings();
        if (Cache.empty() || Cache.dataOlderThan(5)) {
            this.getContestList();
        }
    },
    render: function(){
        return (
            <div>
                <Header
                    onClickRefresh = {this.getContestList.bind(this)}
                    isLoading = {this.state.isLoading}
                />
                <MainContainer contests = {this.state.contests}/>
            </div>
        )
    }
});

module.exports = App;
