var React = require('react');
var Settings = require('../../settings');
var Notifications = require('../../notifications');
var Util = require('../../util')

var AlertButton = React.createClass({
    getInitialState: function(){
        return{
            hasAlert: false
        }
    },
    onClickHandler: function(){
      var component = this;

      if(Settings.isPaid()){
        if(this.state.hasAlert){
          Notifications.removeAlert(this.props.details);
          this.setState({hasAlert: false});
        }else{
          Notifications.addAlert(this.props.details);
          this.setState({hasAlert: true});
        }

      }else{
        var opt = {
          type: "basic",
          title: "Desktop Notification 10 min before contest",
          message: "PERMIUM FEATURE. Upgrade Coder's Calendar to Premium version to use this feature",
          iconUrl: "../img/notification.png",
          buttons: [{"title": "See Example!"}, {"title": "Upgrade"}]
        }
        var currentNotificationId;
        chrome.notifications.create(opt, function(id){currentNotificationId = id;});
        chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
          if(notificationId == currentNotificationId && buttonIndex == 0){
            var opt = {
              type: "basic",
              title: component.props.details.Name,
              message: "will begin in " + component.props.details.Duration,
              iconUrl: Util.icon_path(component.props.details.Platform)
            }
            chrome.notifications.create(opt);
          }else if(notificationId == currentNotificationId && buttonIndex == 1){
            // TODO: Lead to Upgrade path
            return null
          }
        });
      }
    },
    alertIcon: function(){

    },
    componentWillMount: function(){
      var component = this;
      Notifications.haveNoAlerts(this.props.details, function(){
        component.setState({hasAlert: false});
      },function(){
        component.setState({hasAlert: true});
      });
    },
    render: function(){
        if(this.state.hasAlert){
          var icon = "fa-bell-slash";
          var color = "#FF0000"
        }else{
          var icon = "fa-bell-o";
          var color = "#4caf50";
        }
        if (this.props.type == 'upcoming'){
            return(
              <i
                className={"fa " + icon + " fa-lg option-icon"}
                style={{"color": color, "cursor": "pointer"}}
                onClick={this.onClickHandler}
                title="Desktop Notification Alert"
              />
            )
        }else{
            return null
        }
    }
});

AlertButton.propTypes = {
  type: React.PropTypes.string,
  details: React.PropTypes.object
}

module.exports = AlertButton;
