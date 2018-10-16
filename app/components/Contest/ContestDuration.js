const React = require('react');

const ContestDuration = ({ type, contest }) => {
  if (type !== 'upcoming') {
    return null;
  }

  return (
    <h4>
      {' '}
Duration:
      {contest.Duration}
    </h4>
  );
};

module.exports = ContestDuration;
