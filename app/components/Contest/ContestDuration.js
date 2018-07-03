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

module.exports = ContestDuration;
