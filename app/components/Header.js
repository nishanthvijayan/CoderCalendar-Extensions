var React = require('react');

var Header = React.createClass({
    propTypes: {
    onClickRefresh:      React.PropTypes.func,
    isLoading:   React.PropTypes.bool
    },
    onClickBuy: function(){
        // pass
    },
    onClickShowHidden: function(){
        // pass
    },
    onClickSettings: function(){
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
                <i className="fa fa-shopping-cart fa-2x" onClick={this.onClickBuy} />
                <i className="fa fa-eye fa-2x"  onClick={this.onClickShowHidden} />
                <h3>Coder Calendar</h3>
                <i className="fa fa-gear fa-2x" onClick={this.onClickSettings} />
                <i className={this.refreshButtonSpinState()}  onClick={this.props.onClickRefresh} />
            </header>
        )
    }
});

module.exports = Header;
