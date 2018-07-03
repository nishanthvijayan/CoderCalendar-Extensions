const React = require('react');
const Contest = require('./Contest');

const ContestList = React.createClass({
  propTypes: {
    contests: React.PropTypes.arrayOf(React.PropTypes.object),
    type: React.PropTypes.string,
  },
  render() {
    const component = this;
    return (
      <div className="contest-list">
        {this.props.contests.map(contest => (
          <Contest
            details={contest}
            type={component.props.type}
            key={contest.Name + contest.EndTime}
          />
        ))}
      </div>
    );
  },
});

module.exports = ContestList;
