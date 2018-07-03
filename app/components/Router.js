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
    switch (this.props.route) {
      case 'main':
        return (<MainContainer />);
      case 'archive':
        return (<ArchiveContainer />);
      case 'settings':
        return (<SettingsContainer />);
      case 'help':
        return (<HelpContainer />);
      case 'donate':
        return (<DonationsContainer />);
      default:
        return (<MainContainer />);
    }
  },
});

module.exports = Router;
