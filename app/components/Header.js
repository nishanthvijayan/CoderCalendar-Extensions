var React = require('react');
var Payment = require('../payment');
var ArchiveIcon = require('./ArchiveIcon');
var BuyIcon = require('./BuyIcon');

var Header = React.createClass({
    propTypes: {
    onClickRefresh:      React.PropTypes.func,
    onClickMain:      React.PropTypes.func,
    onClickArchive:      React.PropTypes.func,
    onClickSettings:      React.PropTypes.func,
    onClickHelp:      React.PropTypes.func,
    onClickMobile:      React.PropTypes.func,
    isLoading:   React.PropTypes.bool
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
                    console.log("Upgrade Button clicked");
                }
            });
        });
    },
    refreshButtonSpinState: function(){
        if (this.props.isLoading){
            return 'fa fa-refresh fa-2x fa-spin'
        }
        else{
            return 'fa fa-refresh fa-2x'
        }
    },
    render: function(){
        return(
            <header>
                <i className="fa fa-home fa-2x"  onClick={this.props.onClickMain} title="Home" />
                <ArchiveIcon onClickArchive={this.props.onClickArchive} />
                <BuyIcon />
                <i className="fa fa-question fa-2x" onClick={this.props.onClickHelp} title="Help" />
                <i className="fa fa-mobile fa-2x" onClick={this.props.onClickMobile} title="Mobile App" />
                <i className="fa fa-gear fa-2x" onClick={this.props.onClickSettings} title="Settings" />
                <i className={this.refreshButtonSpinState()}  onClick={this.props.onClickRefresh} title="Refresh" />
            </header>
        )
    }
});

module.exports = Header;
