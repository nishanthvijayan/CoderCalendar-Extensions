var React = require("react");
var AddToCalendarButton = require("./AddToCalendarButton");
var HideContestButton = require("./HideContestButton");
var AlertButton = require("./AlertButton");

var ContestOptionBar = React.createClass({
    propTypes: {
        visible: React.PropTypes.bool,
        details: React.PropTypes.object,
        type: React.PropTypes.string,
    },
    render: function(){
        if (this.props.visible && this.props.type == "upcoming"){
            return(
                <div>
                    <AddToCalendarButton type={this.props.type} details={this.props.details}/>
                    <AlertButton type={this.props.type} details={this.props.details}/>
                </div>
            );
        }else if(this.props.type == "upcoming"){
            return <br/>;
        }else{
            return null;
        }
    }
});

module.exports = ContestOptionBar;
