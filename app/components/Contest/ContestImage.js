var React = require("react");
var Util = require("../../util");

var ContestImage = function ContestImage(props){
    return(
        <img
            className = 'contest-image'
            src={Util.icon_path(props.platform)}
            title={props.platform}
        />
    );
};

ContestImage.propTypes = {
    platform: React.PropTypes.string
};

module.exports = ContestImage;
