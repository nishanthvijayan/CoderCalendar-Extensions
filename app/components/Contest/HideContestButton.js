const React = require('react');

const HideContestButton = ({ contest, hideHandler, visible }) => {
  let style;
  let icon;
  let action;

  if (contest.isHidden()) {
    style = { color: '#4caf50', cursor: 'pointer', float: 'right' };
    icon = 'fa-check';
    action = 'Unhide';
  } else {
    style = { color: '#FF0000', cursor: 'pointer', float: 'right' };
    icon = 'fa-trash';
    action = 'Hide';
  }

  if (visible) {
    return (
      <i
        className={`fa ${icon} fa-lg circular-border option-icon`}
        style={style}
        onClick={hideHandler}
        title={`${action} this Contest`}
      />);
  }

  return null;
};

module.exports = HideContestButton;
