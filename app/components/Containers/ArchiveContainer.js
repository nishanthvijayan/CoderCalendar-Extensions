const React = require('react');
const ContestTypeHeader = require('./../ContestTypeHeader');
const ContestList = require('./../ContestList');
const store = require('../../store');
const Contest = require('../../Contest');

const Archive = React.createClass({
  render() {
    const hiddenContests = {
      ongoing: store.getContests().data.ongoing
        .map(contestJson => new Contest(contestJson))
        .filter(contest => contest.isHidden()),
      upcoming: store.getContests().data.upcoming
        .map(contestJson => new Contest(contestJson))
        .filter(contest => contest.isHidden()),
    };

    if ((hiddenContests.ongoing.length + hiddenContests.upcoming.length) > 0) {
      return (
        <div className="archive-container">
          <div id="ongoing" className="top-title">
            <ContestTypeHeader type="Hidden Live" />
            <ContestList contests={hiddenContests.ongoing} type="live" />
          </div>
          <div id="upcoming">
            <ContestTypeHeader type="Hidden Upcoming" />
            <ContestList contests={hiddenContests.upcoming} type="upcoming" />
          </div>
        </div>
      );
    }
    return (
      <div className="archive-container">
        <div id="ongoing" className="top-title">
          <ContestTypeHeader type="No Hidden" />
        </div>
      </div>
    );
  },
});

module.exports = Archive;
