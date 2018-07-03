const React = require('react');
const ArchiveIcon = require('./ArchiveIcon');

const Header = React.createClass({
  propTypes: {
    onClickRefresh: React.PropTypes.func,
    onClickMain: React.PropTypes.func,
    onClickArchive: React.PropTypes.func,
    onClickSettings: React.PropTypes.func,
    onClickHelp: React.PropTypes.func,
    onClickDonate: React.PropTypes.func,
    isLoading: React.PropTypes.bool,
  },
  refreshButtonSpinState() {
    if (this.props.isLoading) {
      return 'fa fa-refresh fa-2x fa-spin';
    }

    return 'fa fa-refresh fa-2x';
  },
  render() {
    return (
      <header>
        <i className="fa fa-home fa-2x" onClick={this.props.onClickMain} title="Home" />
        <ArchiveIcon onClickArchive={this.props.onClickArchive} />
        <i className="fa fa-question fa-2x" onClick={this.props.onClickHelp} title="Help" />
        <i className="fa fa-beer fa-2x" onClick={this.props.onClickDonate} title="Buy me a Beer!" />
        <i className="fa fa-gear fa-2x" onClick={this.props.onClickSettings} title="Settings" />
        <i className={this.refreshButtonSpinState()} onClick={this.props.onClickRefresh} title="Refresh" />
      </header>
    );
  },
});

module.exports = Header;
