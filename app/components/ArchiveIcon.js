var React = require('react');
var Payment = require('../payment');

var ArchiveIcon = React.createClass({
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
        if (this.state.premiumUser){
            return (<i 
                        className="fa fa-trash archive-icon fa-2x"
                        onClick={this.props.onClickArchive}
                        title="Hidden Contests"
                    />)
        }else{
            return null
        }
    }
});

module.exports = ArchiveIcon;
