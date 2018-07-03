const React = require('react');

const ContestDuration = React.createClass({
  render() {
    if (this.props.type == 'upcoming') {
      return (
        <h4>
Duration:
          {this.props.details.Duration}
        </h4>
      );
    }
    return null;
  },
});

ContestDuration.propTypes = {
  type: React.PropTypes.string,
  details: React.PropTypes.object,
};

module.exports = ContestDuration;
