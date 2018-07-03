const React = require('react');
const MainContainer = require('./Containers/MainContainer');
const ArchiveContainer = require('./Containers/ArchiveContainer');
const SettingsContainer = require('./Containers/SettingsContainer');
const HelpContainer = require('./Containers/HelpContainer');
const DonationsContainer = require('./Containers/DonationsContainer');

const Router = React.createClass({
  propTypes: {
    route: React.PropTypes.string,
  },
  render() {
    if (this.props.route == 'main') {
      return (<MainContainer />);
    } if (this.props.route == 'archive') {
      return (<ArchiveContainer />);
    } if (this.props.route == 'settings') {
      return (<SettingsContainer />);
    } if (this.props.route == 'help') {
      return (<HelpContainer />);
    } if (this.props.route == 'donate') {
      return (<DonationsContainer />);
    }
  },
});

module.exports = Router;
