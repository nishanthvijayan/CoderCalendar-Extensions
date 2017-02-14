var React = require('react');
var Payment = require('../payment');

var BuyIcon = React.createClass({
    getInitialState: function(){
        return ({
            premiumUser: false
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
