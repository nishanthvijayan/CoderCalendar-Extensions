const React = require('react');
const Util = require('../../util');

const ContestImage = function ContestImage(props) {
  return (
    <img
      className="contest-image"
      src={Util.iconPath(props.platform)}
      title={props.platform}
    />
  );
};

ContestImage.propTypes = {
  platform: React.PropTypes.string,
};

module.exports = ContestImage;
