const React = require('react');
const AddToCalendarButton = require('./AddToCalendarButton');
const AlertButton = require('./AlertButton');

const ContestOptionBar = React.createClass({
  propTypes: {
    visible: React.PropTypes.bool,
    details: React.PropTypes.object,
    type: React.PropTypes.string,
  },
  render() {
    if (this.props.visible && this.props.type == 'upcoming') {
      return (
        <div>
          <AddToCalendarButton type={this.props.type} details={this.props.details} />
          <AlertButton type={this.props.type} details={this.props.details} />
        </div>
      );
    } if (this.props.type == 'upcoming') {
      return <br />;
    }
    return null;
  },
});

module.exports = ContestOptionBar;
