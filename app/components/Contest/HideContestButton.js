var React = require('react');

var HideContestButton = React.createClass({
    onClickHandler: function(){
        return null // for now
    },
    render: function(){
        return (<i className="fa fa-eye-slash fa-lg option-icon" style={{"color": "#FF0000", "cursor": "pointer"}} onClick={this.onClickAddToCalendarButton} title="Hide Contest" />)
    }
});

HideContestButton.propTypes = {
  type: React.PropTypes.string,
  details: React.PropTypes.object
}

module.exports = HideContestButton;
