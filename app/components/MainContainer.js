var React = require('react');
var ContestTypeHeader = require('./ContestTypeHeader');
var ContestList = require('./ContestList');

var Main = React.createClass({
    propTypes: {
        contests:      React.PropTypes.object
    },
    render: function(){
        return(
            <div className = 'main-container'>
                <div id='ongoing'>
                    <ContestTypeHeader type="Live" />
                    <ContestList contests={this.props.contests.ongoing} type='live' />
                </div>
                <div id='upcoming'>
                    <ContestTypeHeader type="Upcoming" />
                    <ContestList contests={this.props.contests.upcoming} type='upcoming' />
                </div>
            </div>
        )
    }
});

module.exports = Main;
