var React = require('react');

var HideContestButton = React.createClass({
    render: function(){
      return (
        <i
          className="fa fa-eye-slash fa-lg option-icon"
          style={{"color": "#FF0000", "cursor": "pointer"}}
          onClick={this.props.hideHandler}
          title="Hide Contest"
      />)
    }
});

HideContestButton.propTypes = {
  type: React.PropTypes.string,
  details: React.PropTypes.object,
  hideHandler: React.PropTypes.func
}

module.exports = HideContestButton;
