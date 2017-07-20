var React = require("react");

var ArchiveIcon = React.createClass({
    render: function(){
        return (<i
            className="fa fa-trash archive-icon fa-2x"
            onClick={this.props.onClickArchive}
            title="Hidden Contests"
        />);
    }
});

module.exports = ArchiveIcon;
