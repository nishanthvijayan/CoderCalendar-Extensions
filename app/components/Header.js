const React = require('react');

const Header = React.createClass({
  refreshButtonSpinState() {
    if (this.props.isLoading) {
      return 'fa fa-refresh fa-2x fa-spin';
    }

    return 'fa fa-refresh fa-2x';
  },
  render() {
    return (
      <header>
        <i className="fa fa-home fa-2x" onClick={this.props.onClickListings} title="Home" />
        <i className="fa fa-trash archive-icon fa-2x" onClick={this.props.onClickArchive} title="Hidden Contests" />
        <i className="fa fa-beer fa-2x" onClick={this.props.onClickDonate} title="Buy me a Beer!" />
        <i className="fa fa-gear fa-2x" onClick={this.props.onClickSettings} title="Settings" />
        <i className={this.refreshButtonSpinState()} onClick={this.props.onClickRefresh} title="Refresh" />
      </header>
    );
  },
});

module.exports = Header;
