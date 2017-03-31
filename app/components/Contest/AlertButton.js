var React = require('react');
var moment = require('moment');
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
      if(component.state.hasAlert){
        ga('send', 'event', "Remove Desktop Notification");
        Notifications.removeAlert(component.props.details);
        component.setState({hasAlert: false});
      }else{
        ga('send', 'event', "Add Desktop Notification");
        Notifications.addAlert(component.props.details);
        component.setState({hasAlert: true});
      }
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
