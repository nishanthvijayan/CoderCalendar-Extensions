const React = require('react');

const Header = ({
  isLoading, onClickArchive, onClickListings, onClickDonate, onClickRefresh, onClickSettings,
}) => {
  const refreshButtonSpinState = () => (
    isLoading ? 'fa fa-refresh fa-2x fa-spin' : 'fa fa-refresh fa-2x'
  );

  return (
    <header>
      <i className="fa fa-home fa-2x" onClick={onClickListings} title="Home" />
      <i className="fa fa-trash archive-icon fa-2x" onClick={onClickArchive} title="Hidden Contests" />
      {/* <i className="fa fa-beer fa-2x" onClick={onClickDonate} title="Buy me a Beer!" /> */}
      <i className="fa fa-gear fa-2x" onClick={onClickSettings} title="Settings" />
      <i className={refreshButtonSpinState()} onClick={onClickRefresh} title="Refresh" />
    </header>
  );
};

module.exports = Header;
