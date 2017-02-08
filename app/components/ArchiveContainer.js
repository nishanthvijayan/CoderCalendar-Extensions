var React = require('react');
var ContestTypeHeader = require('./ContestTypeHeader');
var ContestList = require('./ContestList');
var Cache = require('../appCache');
var Hide = require('../hide')

var Archive = React.createClass({
    render: function(){
        var hiddenContests = {
            ongoing: Cache.fetch().data.ongoing.filter(function(contest){return Hide.isHidden(contest);}),
            upcoming: Cache.fetch().data.upcoming.filter(function(contest){return Hide.isHidden(contest);})
        }

        return(
            <div className = 'archive-container'>
                <div id='ongoing'>
                    <ContestTypeHeader type="Hidden Live" />
                    <ContestList contests={hiddenContests.ongoing} type='live' />
                </div>
                <div id='upcoming'>
                    <ContestTypeHeader type="Hidden Upcoming" />
                    <ContestList contests={hiddenContests.upcoming} type='upcoming' />
                </div>
            </div>
        )
    }
});

module.exports = Archive;
