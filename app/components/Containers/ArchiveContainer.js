const React = require('react');
const ContestTypeHeader = require('./../ContestTypeHeader');
const ContestList = require('./../ContestList');
const Cache = require('../../appCache');
const Hide = require('../../hide');

const Archive = React.createClass({
  render() {
    const hiddenContests = {
      ongoing: Cache.fetch().data.ongoing.filter(contest => Hide.isHidden(contest)),
      upcoming: Cache.fetch().data.upcoming.filter(contest => Hide.isHidden(contest)),
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
