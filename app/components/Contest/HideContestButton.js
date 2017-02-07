var React = require('react');

var HideContestButton = React.createClass({
    onClickHandler: function(){
        var opt = {
          type: "basic",
          title: "Archive/Hide Contests - Premium Feature",
          message: "Upgrade Coder's Calendar to Premium version to use this feature",
          iconUrl: "../img/notification.png",
          buttons: [{"title": "Upgrade"}]
        }
        chrome.notifications.create(opt);
    },
    render: function(){
        return (<i className="fa fa-eye-slash fa-lg option-icon" style={{"color": "#FF0000", "cursor": "pointer"}} onClick={this.onClickHandler} title="Hide Contest" />)
    }
});

HideContestButton.propTypes = {
  type: React.PropTypes.string,
  details: React.PropTypes.object
}

module.exports = HideContestButton;
