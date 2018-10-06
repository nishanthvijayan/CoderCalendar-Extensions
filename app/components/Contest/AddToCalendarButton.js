const React = require('react');

const AddToCalendarButton = React.createClass({
  onClickAddToCalendarButton() {
    ga('send', 'event', 'Add to Calendar');
    chrome.tabs.create({ url: this.state.url });
  },
  componentDidMount() {
    if (this.props.type == 'upcoming') {
      this.setState({
        url: this.props.contest.createGoogleAddToCalendarUrl(),
      });
    }
  },
  render() {
    if (this.props.type == 'upcoming' && this.props.visible) {
      return (
        <i className="fa fa-calendar fa-lg option-icon circular-border" style={{ color: '#4caf50', cursor: 'pointer' }} onClick={this.onClickAddToCalendarButton} title="Add to Google Calendar" />
      );
    }
    return null;
  },
});

module.exports = AddToCalendarButton;
