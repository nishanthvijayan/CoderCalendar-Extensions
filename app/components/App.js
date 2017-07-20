var React = require("react");

var Router = require("./Router");
var Header = require("./Header");
var Cache = require("../appCache");
var Settings = require("../settings");

var App = React.createClass({
    getInitialState: function(){
        return{
            isLoading: false,
            route: "main"
        };
    },
    getContestList: function(){
        ga("send", "event", "Refresh");

        this.setState({
            isLoading: true
        });

        var component = this;
        $.when( $.ajax( "https://contesttrackerapi.herokuapp.com/" )).then(function(data){

            var contests = data.result;

            Cache.store(contests);

            component.setState({
                isLoading: false
            });
        }, function(){
            component.setState({
                isLoading: false
            });
        });
    },

    onClickSettingsHandler: function(){
        ga("send", "pageview", "/settings.html");
        this.setState({route: "settings"});
    },
    onClickArchiveHandler: function(){
        ga("send", "pageview", "/archive.html");
        this.setState({route: "archive"});
    },
    onClickMainHandler: function(){
        this.setState({route: "main"});
    },
    onClickHelpHandler: function(){
        ga("send", "pageview", "/help.html");
        this.setState({route: "help"});
    },

    componentDidMount: function(){
        Settings.initialize();
        if (Cache.empty() || Cache.dataOlderThan(5)) {
            this.getContestList();
        }
    },
    render: function(){
        return (
            <div>
                <Header
                    onClickRefresh = {this.getContestList}
                    onClickSettings = {this.onClickSettingsHandler}
                    onClickArchive = {this.onClickArchiveHandler}
                    onClickMain = {this.onClickMainHandler}
                    onClickHelp = {this.onClickHelpHandler}
                    isLoading = {this.state.isLoading}
                />
                <Router route={this.state.route} />
            </div>
        );
    }
});

module.exports = App;
