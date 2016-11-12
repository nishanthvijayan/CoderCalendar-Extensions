var React = require('react');

var ContestImage = function ContestImage(props){

    // returns the relative path of the icon file
    // corresponding to the platform of each contest
    var icon_path = function (platform){
        switch (platform){
            case "CODECHEF":
                return "img/cc32.jpg";
            case "HACKEREARTH":
                return "img/he32.png";
            case "CODEFORCES":
                return "img/cf32.png";
            case "TOPCODER":
                return "img/tc32.gif";
            case "HACKERRANK":
                return "img/hr36.png";
            case "GOOGLE":
                return "img/google32.png";
            default:
                return "img/other32.png";
        }
    }

    return(
        <img
            className = 'contest-image'
            src={icon_path(props.platform)}
            title={props.platform}
        />
    )
};

ContestImage.propTypes = {
  platform: React.PropTypes.string
}

module.exports = ContestImage;
