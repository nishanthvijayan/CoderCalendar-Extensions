const React = require('react');

const axios = require('axios');
const Router = require('./Router');
const Header = require('./Header');
const store = require('../store');
const { SUPPORTED_PLATFORMS } = require('../constants');

const App = React.createClass({
  getInitialState() {
    return {
      isLoading: false,
      route: 'listings',
    };
  },
  getContestList() {
    this.setState({
      isLoading: true,
    });

    const component = this;
    axios.get('https://contesttrackerapi.herokuapp.com/')
      .then(({ result: contests }) => store.setContests(contests))
      .catch(error => console.log(`Error accessing API: ${error}`))
      .then(() => {
        component.setState({
          isLoading: false,
        });
      });
  },

  onClickSettingsHandler() {
    ga('send', 'pageview', '/settings.html');
    this.setState({ route: 'settings' });
  },
  onClickArchiveHandler() {
    ga('send', 'pageview', '/archive.html');
    this.setState({ route: 'archive' });
  },
  onClickListingsHandler() {
    this.setState({ route: 'listings' });
  },
  onClickHelpHandler() {
    ga('send', 'pageview', '/help.html');
    this.setState({ route: 'help' });
  },
  onClickDonateHandler() {
    ga('send', 'pageview', '/donate.html');
    this.setState({ route: 'donate' });
  },
  onClickRefreshHandler() {
    ga('send', 'event', 'Refresh');
    this.getContestList();
  },

  componentDidMount() {
    // Initialize Platform settings
    SUPPORTED_PLATFORMS
      .filter(p => !store.isPlatformInitialized(p))
      .forEach(p => store.enablePlatform(p));

    // Initialize Hidden Contest List
    if (!store.isHiddenListInitialized()) {
      store.initializeHiddenList();
    }

    if (store.isContestsDataEmpty() || store.isContestsDataStale(5)) {
      this.getContestList();
    }
  },
  render() {
    const { isLoading, route } = this.state;

    return (
      <div>
        <Header
          onClickRefresh={this.onClickRefreshHandler}
          onClickSettings={this.onClickSettingsHandler}
          onClickArchive={this.onClickArchiveHandler}
          onClickListings={this.onClickListingsHandler}
          onClickHelp={this.onClickHelpHandler}
          onClickDonate={this.onClickDonateHandler}
          isLoading={isLoading}
        />
        <Router route={route} />
      </div>
    );
  },
});

module.exports = App;
