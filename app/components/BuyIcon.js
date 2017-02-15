var React = require('react');
var Payment = require('../payment');

var BuyIcon = React.createClass({
    getInitialState: function(){
        return ({
            premiumUser: false
        });
    },
    onClickBuy: function(){
        var opt = {
          type: "basic",
          title: "Coder's Calendar Premium",
          message: "Coder's Calendar now has a freemium model. Premium users can " +
          "hide / unhide contests and add desktop notification alerts for upcoming contests",
          iconUrl: "../img/icon32.png",
          buttons: [{"title": "Upgrade"}]
        }
        var currentNotificationId;
        chrome.notifications.create(opt, function(id){currentNotificationId = id;});
        chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
            chrome.notifications.clear(notificationId, function(){
                if(notificationId == currentNotificationId && buttonIndex == 0){
                    Payment.buyPremium();
                }
            });
        });
    },
    componentWillMount: function(){
        var component = this;
        Payment.isPremiumUser(function(){
            component.setState({premiumUser: true});
        }, function(){
            component.setState({premiumUser: false});
        });
    },
    render: function(){
        if (!this.state.premiumUser){
            return <i className="fa fa-shopping-cart fa-2x" onClick={this.onClickBuy} title="Buy Premium" />
        }else{
            return null
        }
    }
});

module.exports = BuyIcon;
