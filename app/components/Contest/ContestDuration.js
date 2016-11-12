var React = require('react');

var ContestDuration = React.createClass({
    render: function(){
        if (this.props.type == 'upcoming'){
            return <h4>Duration: {this.props.details.Duration}</h4>
        }else{
            return null
        }
    }
});

ContestDuration.propTypes = {
  type: React.PropTypes.string,
  details: React.PropTypes.object
}

module.exports = ContestDuration;
