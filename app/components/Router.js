var React = require('react');
var MainContainer = require('./Containers/MainContainer');
var ArchiveContainer = require('./Containers/ArchiveContainer');
var SettingsContainer = require('./Containers/SettingsContainer');
var HelpContainer = require('./Containers/HelpContainer');
var MobileContainer = require('./Containers/MobileContainer');

var Router = React.createClass({
    propTypes: {
        route:      React.PropTypes.string
    },
    render: function(){
        if(this.props.route == 'main'){
            return (<MainContainer />)
        }else if(this.props.route == 'archive'){
            return (<ArchiveContainer />)
        }else if(this.props.route == 'settings'){
            return (<SettingsContainer />)
        }else if(this.props.route == 'help'){
            return (<HelpContainer />)
        }else if(this.props.route == 'mobile'){
            return (<MobileContainer />)
        }
    }
});

module.exports = Router;
