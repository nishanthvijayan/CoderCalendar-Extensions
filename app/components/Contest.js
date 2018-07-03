const React = require('react');
const ContestTime = require('./Contest/ContestTime');
const ContestImage = require('./Contest/ContestImage');
const ContestDuration = require('./Contest/ContestDuration');
const HideContestButton = require('./Contest/HideContestButton');
const ContestOptionBar = require('./Contest/ContestOptionBar');
const Hide = require('../hide');

const Contest = React.createClass({
  getInitialState() {
    return {
      isSelected: false,
      visible: true,
      archived: Hide.isHidden(this.props.details),
    };
  },
  onClickContestTitle() {
    ga('send', 'event', 'Open Contest');
    chrome.tabs.create({ url: this.props.details.url });
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
  archive() {
    ga('send', 'event', 'Hide');
    Hide.hideContest(this.props.details);
    this.setState({ visible: false, archived: true });
  },
  unArchive() {
    ga('send', 'event', 'Unhide');
    Hide.showContest(this.props.details);
    this.setState({ visible: false, archived: false });
  },
  hide() {
    if (this.state.archived) {
      this.unArchive();
    } else {
      this.archive();
    }
  },
  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <a>
        <li onMouseMove={this.onMouseMoveHandler} onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
          <ContestImage platform={this.props.details.Platform} />
          <div className="details-container">
            <h2 className="contest-title" onClick={this.onClickContestTitle}>
              {this.props.details.Name}
            </h2>
            <HideContestButton visible={this.state.isSelected} details={this.props.details} hideHandler={this.hide} />
            <br />
            <ContestTime type={this.props.type} details={this.props.details} />
            <ContestDuration type={this.props.type} details={this.props.details} />
            {' '}
            <br />
            <ContestOptionBar
              visible={this.state.isSelected}
              type={this.props.type}
              details={this.props.details}
            />
          </div>
        </li>
        <hr />
      </a>
    );
  },
});

module.exports = Contest;
