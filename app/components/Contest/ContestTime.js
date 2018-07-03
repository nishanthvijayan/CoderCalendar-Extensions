const React = require('react');
const moment = require('moment');

const ContestTime = React.createClass({
  render() {
    let time,
      timeText;
    if (this.props.type == 'live') {
      time = this.props.details.EndTime.slice(0, 21);
      timeText = 'End';
    } else {
      time = this.props.details.StartTime.slice(0, 21);
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
  },
});

ContestTime.propTypes = {
  type: React.PropTypes.string,
  details: React.PropTypes.object,
};

module.exports = ContestTime;
