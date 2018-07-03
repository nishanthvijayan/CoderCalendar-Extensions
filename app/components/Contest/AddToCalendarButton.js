const React = require('react');

const AddToCalendarButton = React.createClass({
  constructGoogleAddToCalendarButton(contest) {
    const curTime = new Date();
    const startTime = Date.parse(contest.StartTime);
    const endTime = Date.parse(contest.EndTime);
    const s = new Date(startTime - ((curTime).getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace(/-/g, '')
      .replace(/:/g, '');
    const e = new Date(endTime - ((curTime).getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace(/-/g, '')
      .replace(/:/g, '');
    const calendarTime = `${s}/${e}`;
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(contest.Name)
    }&dates=${calendarTime}&location=${contest.url}&pli=1&uid=&sf=true&output=xml#eventpage_6`;
  },
  onClickAddToCalendarButton() {
    ga('send', 'event', 'Add to Calendar');
    chrome.tabs.create({ url: this.state.url });
  },
  componentDidMount() {
    if (this.props.type == 'upcoming') {
      this.setState({
        url: this.constructGoogleAddToCalendarButton(this.props.details),
      });
    }
  },
  render() {
    if (this.props.type == 'upcoming') {
      return (
        <i className="fa fa-calendar fa-lg option-icon" style={{ color: '#4caf50', cursor: 'pointer' }} onClick={this.onClickAddToCalendarButton} title="Add to Google Calendar" />
      );
    }
    return null;
  },
});

AddToCalendarButton.propTypes = {
  type: React.PropTypes.string,
  details: React.PropTypes.object,
};

module.exports = AddToCalendarButton;
