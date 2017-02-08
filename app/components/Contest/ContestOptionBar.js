var React = require('react');
var AddToCalendarButton = require('./AddToCalendarButton');
var HideContestButton = require('./HideContestButton');
var AlertButton = require('./AlertButton');

var ContestOptionBar = React.createClass({
      propTypes: {
        visible: React.PropTypes.bool,
        details: React.PropTypes.object,
        type: React.PropTypes.string,
        hideHandler: React.PropTypes.func
      },
       render: function(){
        if (this.props.visible){
            return(
                <div>
                  <AddToCalendarButton type={this.props.type} details={this.props.details}/>
                  <HideContestButton
                    type={this.props.type}
                    details={this.props.details}
                    hideHandler={this.props.hideHandler}
                  />
                  <AlertButton type={this.props.type} details={this.props.details}/>
                </div>
            )
        }else{
            return <br/>
        }
      }
});

module.exports = ContestOptionBar;
