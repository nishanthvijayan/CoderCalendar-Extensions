var React = require('react');
var Settings = require('../settings');
var Util = require('../util');

var PlatformSettings = React.createClass({
    getInitialState: function(){
        return{
            checked: Settings.subscription(this.props.platform)
        }
    },
    onClickHandler: function(){
        Settings.toggleSubscription(this.props.platform);
        this.setState({checked: Settings.subscription(this.props.platform)})

    },
    render: function(){
        var icon_and_color = function(platform){
            if(Settings.subscription(platform))
                return "fa-check green-text"
            else
                return "fa-times red-text"
        }
        return(
            <li className="platform-setting">
                <img  src={Util.icon_path(this.props.platform)}/>
                <i
                    className={"fa fa-2x "+ icon_and_color(this.props.platform)}
                    id={this.props.platform}
                    onClick={this.onClickHandler}
                ></i>
            </li>
        )
    }
});

module.exports = PlatformSettings;
