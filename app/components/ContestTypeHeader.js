var React = require('react');

var ContestTypeHeader = function ContestTypeHeader(props){
    return(
        <div className = 'title'>
            <h3>{props.type} Contests</h3>
        </div>
    )
};

ContestTypeHeader.propTypes = {
  type: React.PropTypes.string
}

module.exports = ContestTypeHeader;
