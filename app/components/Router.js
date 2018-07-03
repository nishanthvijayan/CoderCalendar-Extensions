const React = require('react');
const MainContainer = require('./Containers/MainContainer');
const ArchiveContainer = require('./Containers/ArchiveContainer');
const SettingsContainer = require('./Containers/SettingsContainer');
const DonationsContainer = require('./Containers/DonationsContainer');

const Router = React.createClass({
  render() {
    switch (this.props.route) {
      case 'main':
        return (<MainContainer />);
      case 'archive':
        return (<ArchiveContainer />);
      case 'settings':
        return (<SettingsContainer />);
      case 'donate':
        return (<DonationsContainer />);
      default:
        return (<MainContainer />);
    }
  },
});

module.exports = Router;
