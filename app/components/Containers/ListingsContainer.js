const React = require('react');
const ContestTypeHeader = require('../ContestTypeHeader');
const ContestList = require('../ContestList');
const Cache = require('../../appCache');
const Settings = require('../../settings');
const Hide = require('../../hide');

const Listings = React.createClass({

  filterContestsBySettings(contests) {
    return contests
      .filter(contest => Settings.isPlatformEnabled(contest.Platform))
      .filter(contest => !Hide.isHidden(contest));
  },

  filterContestsByTime(allContests) {
    const currentTime = new Date().getTime();
    const filteredContests = {};

    // Remove contests that are already over from ongoing contests list
    filteredContests.ongoing = allContests.ongoing.filter((contest) => {
      const endTime = Date.parse(contest.EndTime);
      return (endTime > currentTime);
    });

    // Move contests that have started, to ongoing events list
    allContests.upcoming.forEach((contest) => {
      const startTime = Date.parse(contest.StartTime);
      const endTime = Date.parse(contest.EndTime);
      if (startTime < currentTime && endTime > currentTime) {
        filteredContests.ongoing.push(contest);
      }
    });

    //  Remove contests that have started/ended from upcoming contests list
    filteredContests.upcoming = allContests.upcoming.filter((contest) => {
      const startTime = Date.parse(contest.StartTime);
      const endTime = Date.parse(contest.EndTime);
      return (startTime > currentTime && endTime > currentTime);
    });

    return filteredContests;
  },

  sortByStartTime: (a, b) => Date.parse(a.StartTime) - Date.parse(b.StartTime),
  sortByEndTime: (a, b) => Date.parse(a.EndTime) - Date.parse(b.EndTime),

  processContestList(contests) {
    let contestsFilteredBySettings = {
      ongoing: this.filterContestsBySettings(contests.ongoing),
      upcoming: this.filterContestsBySettings(contests.upcoming),
    };

    contestsFilteredBySettings = this.filterContestsByTime(contestsFilteredBySettings);

    return {
      ongoing: contestsFilteredBySettings.ongoing.sort(this.sortByEndTime),
      upcoming: contestsFilteredBySettings.upcoming.sort(this.sortByStartTime),
    };
  },
  render() {
    const contests = this.processContestList(Cache.fetch().data);
    return (
      <div className="listings-container">
        <div id="ongoing" className="top-title">
          <ContestTypeHeader type="Live" />
          <ContestList contests={contests.ongoing} type="live" />
        </div>
        <div id="upcoming">
          <ContestTypeHeader type="Upcoming" />
          <ContestList contests={contests.upcoming} type="upcoming" />
        </div>
      </div>
    );
  },
});

module.exports = Listings;
