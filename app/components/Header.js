var React = require('react');

var Header = React.createClass({
    propTypes: {
    onClickRefresh:      React.PropTypes.func,
    isLoading:   React.PropTypes.bool
    },
    onClickGitHub: function(){
        chrome.tabs.create({ url: "https://bit.ly/1LUziPN" });
    },
    onClickAndroid: function(){
        chrome.tabs.create({ url: "https://bit.ly/1KqFi3U" });
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
                <i className="fa fa-code fa-2x gh-btn" onClick={this.onClickGitHub} />
                <i className="fa fa-android fa-2x"  onClick={this.onClickAndroid} />
                <h3>Coder Calendar</h3>
                <i className="fa fa-gear fa-2x" onClick={this.onClickSettings} />
                <i className={this.refreshButtonSpinState()}  onClick={this.props.onClickRefresh} />
            </header>
        )
    }
});

module.exports = Header;
