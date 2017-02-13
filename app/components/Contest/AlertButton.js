var React = require('react');
var moment = require('moment');
var Settings = require('../../settings');
var Notifications = require('../../notifications');
var Util = require('../../util')
var Payment = require('../../payment');

var AlertButton = React.createClass({
    getInitialState: function(){
        return{
            hasAlert: false
        }
    },
    onClickHandler: function(){
      var component = this;

      Payment.isPremiumUser(function(){
        if(component.state.hasAlert){
          Notifications.removeAlert(component.props.details);
          component.setState({hasAlert: false});
        }else{
          Notifications.addAlert(component.props.details);
          component.setState({hasAlert: true});
        }
      }, function(){
        var opt = {
          type: "basic",
          title: "Set Desktop Notification alert few min before contest",
          message: "PERMIUM FEATURE. Upgrade Coder's Calendar to Premium version to use this feature",
          iconUrl: "../img/icon32.png",
          buttons: [{"title": "See Example!"}, {"title": "Upgrade"}]
        }
        var currentNotificationId;
        chrome.notifications.create(opt, function(id){currentNotificationId = id;});
        chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
          chrome.notifications.clear(notificationId, function(){
            if(notificationId == currentNotificationId && buttonIndex == 0){
              var curTime = Util.getCurTime();
              var startTime = Date.parse(component.props.details.StartTime);
              var beginInTime = moment.duration(startTime - curTime).humanize();

              var opt = {
                type: "basic",
                title: component.props.details.Name,
                message: "will start in about " + beginInTime + "\nat " + component.props.details.StartTime +
                "\n\n(This is an example, so snooze won't work.)",
                iconUrl: Util.icon_path(component.props.details.Platform),
                buttons: [{"title": "Snooze"}, {"title": "Dismiss"}],
              }
              chrome.notifications.create(opt);
            }else if(notificationId == currentNotificationId && buttonIndex == 1){
              Payment.buyPremium();
              console.log("Upgrade Button clicked");
            }
          });
        });
      });
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
          var action = "Remove ";
        }else{
          var icon = "fa-bell-o";
          var color = "#4caf50";
          var action = "Add ";
        }
        if (this.props.type == 'upcoming'){
            return(
              <i
                className={"fa " + icon + " fa-lg option-icon"}
                style={{"color": color, "cursor": "pointer"}}
                onClick={this.onClickHandler}
                title={ action + "Desktop Notification Alert"}
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
