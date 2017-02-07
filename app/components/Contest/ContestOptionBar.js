var React = require('react');
var AddToCalendarButton = require('./AddToCalendarButton');
var HideContestButton = require('./HideContestButton');

var ContestOptionBar = React.createClass({
      propTypes: {
        visible: React.PropTypes.bool,
        details: React.PropTypes.object,
        type: React.PropTypes.string
      },
       render: function(){
        if (this.props.visible){
            return(
                <div>
                  <AddToCalendarButton type={this.props.type} details={this.props.details}/>
                  <HideContestButton type={this.props.type} details={this.props.details}/>
                </div>
            )
        }else{
            return <br/>
        }
      }
});

module.exports = ContestOptionBar;
