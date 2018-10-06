const React = require('react');
const ListingsContainer = require('./Containers/ListingsContainer');
const ArchiveContainer = require('./Containers/ArchiveContainer');
const SettingsContainer = require('./Containers/SettingsContainer');
const DonationsContainer = require('./Containers/DonationsContainer');

const Router = React.createClass({
  render() {
    switch (this.props.route) {
      case 'listings':
        return (<ListingsContainer />);
      case 'archive':
        return (<ArchiveContainer />);
      case 'settings':
        return (<SettingsContainer />);
      case 'donate':
        return (<DonationsContainer />);
      default:
        return (<ListingsContainer />);
    }
  },
});

module.exports = Router;
