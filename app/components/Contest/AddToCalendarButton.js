const React = require('react');

const AddToCalendarButton = (contest) => {
  const onClickAddToCalendarButton = () => {
    ga('send', 'event', 'Add to Calendar');
    chrome.tabs.create({ url: contest.createGoogleAddToCalendarUrl() });
  };

  if (this.props.type == 'upcoming' && this.props.visible) {
    return (
      <i
        className="fa fa-calendar fa-lg option-icon circular-border"
        style={{ color: '#4caf50', cursor: 'pointer' }}
        onClick={onClickAddToCalendarButton}
        title="Add to Google Calendar"
      />
    );
  }

  return null;
};

module.exports = AddToCalendarButton;
