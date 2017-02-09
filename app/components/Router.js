var React = require('react');
var MainContainer = require('./MainContainer');
var ArchiveContainer = require('./ArchiveContainer');
var SettingsContainer = require('./SettingsContainer');
var HelpContainer = require('./HelpContainer');
var MobileContainer = require('./MobileContainer');

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
