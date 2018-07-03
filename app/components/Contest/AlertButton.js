const React = require('react');
const Notifications = require('../../notifications');

const AlertButton = React.createClass({
  getInitialState() {
    return {
      hasAlert: false,
    };
  },
  onClickHandler() {
    const component = this;
    if (component.state.hasAlert) {
      ga('send', 'event', 'Remove Desktop Notification');
      Notifications.removeAlert(component.props.details);
      component.setState({ hasAlert: false });
    } else {
      ga('send', 'event', 'Add Desktop Notification');
      Notifications.addAlert(component.props.details);
      component.setState({ hasAlert: true });
    }
  },
  componentWillMount() {
    const component = this;
    Notifications.haveNoAlerts(this.props.details, () => {
      component.setState({ hasAlert: false });
    }, () => {
      component.setState({ hasAlert: true });
    });
  },
  render() {
    let icon,
      color,
      action;
    if (this.state.hasAlert) {
      icon = 'fa-bell-slash';
      color = '#FF0000';
      action = 'Remove ';
    } else {
      icon = 'fa-bell-o';
      color = '#4caf50';
      action = 'Add ';
    }
    if (this.props.type == 'upcoming') {
      return (
        <i
          className={`fa ${icon} fa-lg option-icon`}
          style={{ color, cursor: 'pointer' }}
          onClick={this.onClickHandler}
          title={`${action}Desktop Notification Alert`}
        />
      );
    }
    return null;
  },
});

module.exports = AlertButton;
