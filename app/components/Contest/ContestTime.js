var React = require('react');
var moment = require('moment');

var ContestTime = React.createClass({
       render: function(){
            if (this.props.type == 'live'){
                var time = this.props.details.EndTime.slice(0,21);
                var timeText = 'End';
            } else{
                var time = this.props.details.StartTime.slice(0,21);
                var timeText = 'Start';
            }
            var humanReadableTime = moment(time).fromNow();

            return (<h4>{timeText}: {time} ({humanReadableTime})</h4>)
        }
});

ContestTime.propTypes = {
  type: React.PropTypes.string,
  details: React.PropTypes.object
}

module.exports = ContestTime;
