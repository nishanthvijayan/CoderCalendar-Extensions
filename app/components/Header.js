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
    isLoading:   React.PropTypes.bool
    },
    getInitialState: function(){
        return ({
            isPremiumUser: false
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
    renderArchiveOrPaymentIcon: function(){
        if(this.state.isPremiumUser){
            return (null)
        }else{
            return (<BuyIcon />)
        }
    },
    componentWillMount: function(){
        var component = this;
        Payment.isPremiumUser(function(){
            component.setState({isPremiumUser: true});
        }, function(){
            component.setState({isPremiumUser: false});
        });
    },
    render: function(){
        return(
            <header>
                <i className="fa fa-home fa-2x"  onClick={this.props.onClickMain} title="Home" />
                <ArchiveIcon onClickArchive={this.props.onClickArchive} />
                {this.renderArchiveOrPaymentIcon()}
                <i className="fa fa-question fa-2x" onClick={this.props.onClickHelp} title="Help" />
                <i className="fa fa-gear fa-2x" onClick={this.props.onClickSettings} title="Settings" />
                <i className={this.refreshButtonSpinState()}  onClick={this.props.onClickRefresh} title="Refresh" />
            </header>
        )
    }
});

module.exports = Header;
