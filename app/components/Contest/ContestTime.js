const React = require('react');
const moment = require('moment');

const ContestTime = ({ type, contest }) => {
  let time;
  let timeText;

  if (type == 'live') {
    time = new Date(contest.endTime * 1000).toString().slice(0, 21);
    timeText = 'End';
  } else {
    time = new Date(contest.startTime * 1000).toString().slice(0, 21);
    timeText = 'Start';
  }
  const humanReadableTime = moment(time).fromNow();

  return (
    <h4>
      {timeText}
:
      {' '}
      {time}
      {' '}
(
      {humanReadableTime}
)
    </h4>
  );
};

module.exports = ContestTime;
