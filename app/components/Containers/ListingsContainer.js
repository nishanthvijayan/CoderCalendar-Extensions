const React = require('react');
const ContestTypeHeader = require('../ContestTypeHeader');
const ContestList = require('../ContestList');
const store = require('../../store');
const Contest = require('../../Contest');

const Listings = React.createClass({

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
    const contestsFilteredBySettings = this.filterContestsByTime(contests);

    return {
      ongoing: contestsFilteredBySettings.ongoing
        .map(contestJson => new Contest(contestJson))
        .filter(contest => contest.shouldBeDisplayed())
        .sort(this.sortByEndTime),

      upcoming: contestsFilteredBySettings.upcoming
        .map(contestJson => new Contest(contestJson))
        .filter(contest => contest.shouldBeDisplayed())
        .sort(this.sortByStartTime),
    };
  },
  render() {
    const contests = this.processContestList(store.getContests().data);
    return (
      <div className="listings-container">
        <div id="ongoing" className="top-title">
          <ContestTypeHeader type="Live" />
          <ContestList contests={contests.ongoing} type="live" route="listings" />
        </div>
        <div id="upcoming">
          <ContestTypeHeader type="Upcoming" />
          <ContestList contests={contests.upcoming} type="upcoming" route="listings" />
        </div>
      </div>
    );
  },
});

module.exports = Listings;
