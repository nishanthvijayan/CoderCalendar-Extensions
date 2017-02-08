var React = require('react');

var ContestImage = function ContestImage(props){

    // returns the relative path of the icon file
    // corresponding to the platform of each contest
    var icon_path = function (platform){
        switch (platform){
            case "CODECHEF":
                return "img/codechef.jpg";
            case "HACKEREARTH":
                return "img/hackerearth.png";
            case "CODEFORCES":
                return "img/codeforces.png";
            case "TOPCODER":
                return "img/topcoder.gif";
            case "HACKERRANK":
                return "img/hackerrank.png";
            case "GOOGLE":
                return "img/google.png";
            default:
                return "img/other.png";
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
