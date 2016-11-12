var React = require('react');
var CalendarLink = require('./CalendarLink');

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
                  <CalendarLink type={this.props.type} details={this.props.details}/>
                </div>
            )
        }else{
            return null
        }
      }
});

module.exports = ContestOptionBar;
