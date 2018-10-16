const React = require('react');
const Contest = require('./Contest');

const ContestList = ({ contests, type, route }) => (
  <div className="contest-list">
    {contests.map(contest => (
      <Contest
        contest={contest}
        type={type}
        key={contest.getID()}
        route={route}
      />
    ))}
  </div>
);

module.exports = ContestList;
