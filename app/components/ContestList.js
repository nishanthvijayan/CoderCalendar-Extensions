const React = require('react');
const Contest = require('./Contest');

const ContestList = ({ contests, type }) => (
  <div className="contest-list">
    {contests.map(contest => (
      <Contest
        contest={contest}
        type={type}
        key={contest.getID()}
      />
    ))}
  </div>
);

module.exports = ContestList;
