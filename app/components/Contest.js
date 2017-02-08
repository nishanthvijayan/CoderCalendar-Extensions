var React = require('react');
var UtilHelpers = require('../util');
var ContestTime = require('./Contest/ContestTime');
var ContestImage = require('./Contest/ContestImage');
var ContestDuration = require('./Contest/ContestDuration');
var HideContestButton = require('./Contest/HideContestButton');
var ContestOptionBar = require('./Contest/ContestOptionBar');
var Settings = require('../settings');
var Hide = require('../hide');

var Contest = React.createClass({
    propTypes: {
        details:      React.PropTypes.object,
        type:      React.PropTypes.string
    },
    getInitialState: function(){
        return{
            isSelected: false,
            visible: true,
            archived: Hide.isHidden(this.props.details) 
        }
    },
    onClickContestTitle: function(){
         chrome.tabs.create({url: this.props.details.url});
    },
    onMouseEnterHandler: function(){
        this.setState({
            isSelected: true
        });
    },
    onMouseLeaveHandler: function(){
        this.setState({
            isSelected: false
        });
    },
    archive: function(){
        if(Settings.isPaid()){
            Hide.hideContest(this.props.details);
            this.setState({visible: false, archived: true});
        }
        else{
            var opt = {
                type: "basic",
                title: "Archive/Hide Contests - Premium Feature",
                message: "Upgrade Coder's Calendar to Premium version to use this feature",
                iconUrl: "../img/notification.png",
                buttons: [{"title": "Upgrade"}]
            }
            chrome.notifications.create(opt);
        }
    },
    unArchive: function(){
        if(Settings.isPaid()){
            Hide.showContest(this.props.details);
            this.setState({visible: false, archived: false});
        }
        else{
            var opt = {
                type: "basic",
                title: "Archive/Hide Contests - Premium Feature",
                message: "Upgrade Coder's Calendar to Premium version to use this feature",
                iconUrl: "../img/notification.png",
                buttons: [{"title": "Upgrade"}]
            }
            chrome.notifications.create(opt);
        }
    },
    hide: function(){
        if(this.state.archived){
            this.unArchive();
        }else{
            this.archive();
        }
    },
    render: function(){
        if(!this.state.visible){
            return null
        }

        return(
            <a>
                <li onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
                    <ContestImage platform={this.props.details.Platform} />
                    <div className='details-container'>
                        <h3 className="contest-title"  onClick={this.onClickContestTitle}>{this.props.details.Name}</h3>
                        <HideContestButton visible={this.state.isSelected} details={this.props.details} hideHandler={this.hide} />
                        <ContestTime type={this.props.type} details={this.props.details} /> <br/>
                        <ContestDuration type={this.props.type} details={this.props.details} /> <br/>
                        <ContestOptionBar
                            visible={this.state.isSelected}
                            type={this.props.type}
                            details={this.props.details}
                        />
                    </div>
                </li>
                <hr/>
            </a>
        )
    }
});

module.exports = Contest;
