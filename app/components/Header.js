const React = require('react');
const { GITHUB_PROJECT_URL } = require('../constants');

const Header = ({
  isLoading, onClickArchive, onClickListings, onClickDonate, onClickRefresh, onClickSettings,
}) => {
  const refreshButtonSpinState = () => (
    isLoading ? 'fa fa-refresh fa-2x fa-spin' : 'fa fa-refresh fa-2x'
  );

  const onClickGitHub = () => {
    chrome.tabs.create({ url: GITHUB_PROJECT_URL });
  };

  return (
    <header>
      <i className="fa fa-home fa-2x" onClick={onClickListings} title="Home" />
      <i className="fa fa-trash archive-icon fa-2x" onClick={onClickArchive} title="Hidden Contests" />
      {/* <i className="fa fa-beer fa-2x" onClick={onClickDonate} title="Buy me a Beer!" /> */}
      <i className="fa fa-gear fa-2x" onClick={onClickSettings} title="Settings" />
      <i className="fa fa-github-alt fa-2x" onClick={onClickGitHub} title="Star us on GitHub"/>
      <i className={refreshButtonSpinState()} onClick={onClickRefresh} title="Refresh" />
    </header>
  );
};

module.exports = Header;
