var React = require('react');
var Payment = require('../payment');

var BuyIcon = React.createClass({
    onClickBuy: function(){
        Payment.isPremiumUser(function(){}, function(){
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
        });
    },
    render: function(){
        return <i className="fa fa-shopping-cart fa-2x" onClick={this.onClickBuy} title="Buy Premium" />
    }
});

module.exports = BuyIcon;
