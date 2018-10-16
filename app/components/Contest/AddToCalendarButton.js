const React = require('react');

const AddToCalendarButton = (contest, type, visible) => {
  const onClickAddToCalendarButton = () => {
    ga('send', 'event', 'Add to Calendar');
    chrome.tabs.create({ url: contest.createGoogleAddToCalendarUrl() });
  };

  if (!visible || type !== 'upcoming') {
    return null;
  }

  return (
    <i
      className="fa fa-calendar fa-lg option-icon circular-border"
      style={{ color: '#4caf50', cursor: 'pointer' }}
      onClick={onClickAddToCalendarButton}
      title="Add to Google Calendar"
    />
  );
};

module.exports = AddToCalendarButton;
