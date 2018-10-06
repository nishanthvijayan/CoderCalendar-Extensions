const React = require('react');
const ContestTime = require('./Contest/ContestTime');
const ContestImage = require('./Contest/ContestImage');
const ContestDuration = require('./Contest/ContestDuration');
const HideContestButton = require('./Contest/HideContestButton');
const AddToCalendarButton = require('./Contest/AddToCalendarButton');

const Contest = React.createClass({
  getInitialState() {
    return {
      isSelected: false,
      visible: true,
      archived: this.props.contest.isHidden(),
    };
  },
  onClickContestTitle() {
    ga('send', 'event', 'Open Contest');
    chrome.tabs.create({ url: this.props.contest.url });
  },
  onMouseEnterHandler() {
    this.setState({
      isSelected: true,
    });
  },
  onMouseLeaveHandler() {
    this.setState({
      isSelected: false,
    });
  },
  onMouseMoveHandler() {
    if (!this.state.isSelected) {
      this.setState({
        isSelected: true,
      });
    }
  },
  hide() {
    ga('send', 'event', 'Hide');
    this.props.contest.hide();
    this.setState({ visible: false, archived: true });
  },
  show() {
    ga('send', 'event', 'Unhide');
    this.props.contest.show();
    this.setState({ visible: false, archived: false });
  },
  toggleVisiblity() {
    if (this.state.archived) {
      this.hide();
    } else {
      this.show();
    }
  },
  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <a>
        <li
          onMouseMove={this.onMouseMoveHandler}
          onMouseEnter={this.onMouseEnterHandler}
          onMouseLeave={this.onMouseLeaveHandler}
        >
          <ContestImage platform={this.props.contest.Platform} />
          <div className="details-container">

            <h2 className="contest-title" onClick={this.onClickContestTitle}>
              {this.props.contest.Name}
            </h2>

            <HideContestButton
              visible={this.state.isSelected}
              contest={this.props.contest}
              hideHandler={this.toggleVisiblity}
            />

            <AddToCalendarButton
              visible={this.state.isSelected}
              type={this.props.type}
              contest={this.props.contest}
            />

            <br />

            <ContestTime type={this.props.type} contest={this.props.contest} />

            <ContestDuration type={this.props.type} contest={this.props.contest} />
            {' '}
            <br />
          </div>
        </li>
        <hr />
      </a>
    );
  },
});

module.exports = Contest;
