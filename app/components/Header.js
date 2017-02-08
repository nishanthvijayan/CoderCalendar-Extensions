var React = require('react');
var Settings = require('../settings');

var Header = React.createClass({
    propTypes: {
    onClickRefresh:      React.PropTypes.func,
    onClickMain:      React.PropTypes.func,
    onClickArchive:      React.PropTypes.func,
    onClickSettings:      React.PropTypes.func,
    isLoading:   React.PropTypes.bool
    },
    onClickBuy: function(){
        // pass
    },
    onClickArchive: function(){
        if(Settings.isPaid()){
            this.props.onClickArchive();
        }
        else{
            var opt = {
              type: "basic",
              title: "View Archived Contests - Premium Feature",
              message: "Upgrade Coder's Calendar to Premium version to use this feature",
              iconUrl: "../img/notification.png",
              buttons: [{"title": "Upgrade"}]
            }
            chrome.notifications.create(opt);
        }
    },
    onClickExapnd: function(){
        chrome.tabs.create({ url: "options.html" });
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
                <i className="fa fa-home fa-2x"  onClick={this.props.onClickMain} />
                <i className="fa fa-shopping-cart fa-2x" onClick={this.onClickBuy} />
                <i className="fa fa-eye fa-2x"  onClick={this.onClickArchive} />
                <h3>Coder Calendar</h3>
                <i className="fa fa-gear fa-2x" onClick={this.props.onClickSettings} />
                <i className={this.refreshButtonSpinState()}  onClick={this.props.onClickRefresh} />
            </header>
        )
    }
});

module.exports = Header;
