var React = require('react');
var MainContainer = require('./MainContainer');
var ArchiveContainer = require('./ArchiveContainer');

var Router = React.createClass({
    propTypes: {
        route:      React.PropTypes.string
    },
    render: function(){
        if(this.props.route == 'main'){
            return (<MainContainer />)
        }else if(this.props.route == 'archive'){
            return (<ArchiveContainer />)
        }
    }
});

module.exports = Router;
