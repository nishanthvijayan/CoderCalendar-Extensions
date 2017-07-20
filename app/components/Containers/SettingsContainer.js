var React = require("react");
var ContestTypeHeader = require("../ContestTypeHeader");
var ContestList = require("../ContestList");
var PlatformSetting = require("../PlatformSetting");
var Cache = require("../../appCache");
var Hide = require("../../hide");
var Settings = require("../../settings");

var SettingsContainer = React.createClass({
    getInitialState: function(){
        return{
            alertBefore: 30,
            snoozeInterval: 5
        };
    },
    onAlertChange: function(event){
        Settings.setAlertBeforeTime(parseInt(event.target.value) * 60000);
        this.setState({alertBefore: parseInt(event.target.value)});
    },
    onSnoozeChange: function(event){
        Settings.setSnoozeInterval(parseInt(event.target.value) * 60000);
        this.setState({snoozeInterval: parseInt(event.target.value)});
    },
    componentWillMount: function(){
        var component = this;
        Settings.getAlertBeforeTime(function(response){
            var alertBefore = response["ALERT_BEFORE_TIME"]/60000;
            component.setState({alertBefore: alertBefore});
        });

        Settings.getSnoozeInterval(function(response){
            var snoozeTime = response["SNOOZE_INTERVAL"]/60000;
            component.setState({snoozeInterval: snoozeTime});
        });
    },
    render: function(){
        var supportedPlatforms = ["HACKEREARTH", "HACKERRANK", "CODECHEF", "CODEFORCES", "TOPCODER", "GOOGLE", "OTHER"];

        return(
            <div className= 'settings-container'>
                <div id="subscribe" className="top-title">
                    <div className='title'><h3>Subscribe</h3></div>
                    <div className="subscribeContent">
                        {supportedPlatforms.map(function(platform){
                            return (
                                <div>
                                    <PlatformSetting platform={platform} />
                                    <hr/>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div id="subscribe">
                    <div className='title'><h3>Desktop Notification</h3></div>
                    <div className="subscribeContent">
                        <li className="notification-setting">
                            <label>Show Desktop Notification Alert </label>
                            <input type="number" name="alertBefore" min="10" max="120" step="10" value={this.state.alertBefore} onChange={this.onAlertChange}/>
                            minutes before start time
                        </li>
                        <hr/>
                        <li className="notification-setting">
                            <label>Snooze length  </label>
                            <input type="number" name="snoozeInterval" min="5" max="10" step="5" value={this.state.snoozeInterval} onChange={this.onSnoozeChange}/> minutes
                        </li>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SettingsContainer;
