const React = require('react');
const Hide = require('../../hide');

const HideContestButton = React.createClass({
  render() {
    let style,
      icon,
      action;
    if (Hide.isHidden(this.props.details)) {
      style = { color: '#4caf50', cursor: 'pointer', float: 'right' };
      icon = 'fa-check';
      action = 'Unhide';
    } else {
      style = { color: '#FF0000', cursor: 'pointer', float: 'right' };
      icon = 'fa-trash';
      action = 'Hide';
    }

    if (this.props.visible) {
      return (
        <i
          className={`fa ${icon} fa-lg circular-border option-icon`}
          style={style}
          onClick={this.props.hideHandler}
          title={`${action} this Contest`}
        />);
    }
    return null;
  },
});

module.exports = HideContestButton;
