var React = require('react');
var UtilHelpers = require('../util');
var ContestTime = require('./Contest/ContestTime');
var ContestImage = require('./Contest/ContestImage');
var ContestDuration = require('./Contest/ContestDuration');
var ContestOptionBar = require('./Contest/ContestOptionBar');

var Contest = React.createClass({
    propTypes: {
        details:      React.PropTypes.object,
        type:      React.PropTypes.string
    },
    getInitialState: function(){
        return{
            isSelected: false,
        }
    },
    onClickContestTitle: function(){
         chrome.tabs.create({url: this.props.details.url});
    },
    toggleSelection: function(){
        this.setState({
            isSelected: !(this.state.isSelected)
        });
    },
    onClickContest: function(){
        this.toggleSelection();
    },
    render: function(){
        return(
            <a>
                <li onClick={this.onClickContest}>
                    <br/>
                    <h3 className="contest-title"  onClick={this.onClickContestTitle}>{this.props.details.Name}</h3>
                    <ContestImage platform={this.props.details.Platform} /> <br/>
                    <ContestTime type={this.props.type} details={this.props.details} /> <br/>
                    <ContestDuration type={this.props.type} details={this.props.details} /> <br/>
                    <ContestOptionBar visible={this.state.isSelected} type={this.props.type} details={this.props.details}/>
                </li>
                <hr/>
            </a>
        )
    }
});

module.exports = Contest;
