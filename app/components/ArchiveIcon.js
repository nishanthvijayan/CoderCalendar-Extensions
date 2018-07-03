const React = require('react');

const ArchiveIcon = React.createClass({
  render() {
    return (
      <i
        className="fa fa-trash archive-icon fa-2x"
        onClick={this.props.onClickArchive}
        title="Hidden Contests"
      />
    );
  },
});

module.exports = ArchiveIcon;
