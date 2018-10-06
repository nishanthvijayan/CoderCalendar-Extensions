const React = require('react');

const ContestDuration = ({ type, contest }) => {
  if (type == 'upcoming') {
    return (
      <h4>
        {' '}
Duration:
        {contest.Duration}
      </h4>
    );
  }

  return null;
};

module.exports = ContestDuration;
