var React = require('react');
var Hide = require('../../hide')

var HideContestButton = React.createClass({
    render: function(){
      if(Hide.isHidden(this.props.details)){
        style = {"color": "#4caf50", "cursor": "pointer"};
        icon = "fa-eye";
        action = "Unhide";
      }
      else{
        style = {"color": "#FF0000", "cursor": "pointer"};
        icon = "fa-eye-slash";
        action = "Hide";
      }

      return (
        <i
          className={"fa " + icon + " fa-lg option-icon"}
          style={style}
          onClick={this.props.hideHandler}
          title={action + " this Contest"}
      />)
    }
});

HideContestButton.propTypes = {
  details: React.PropTypes.object,
  hideHandler: React.PropTypes.func
}

module.exports = HideContestButton;
