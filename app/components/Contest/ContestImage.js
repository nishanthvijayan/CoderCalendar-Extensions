const React = require('react');
const Util = require('../../util');

const ContestImage = ({ platform }) => (
  <img
    className="contest-image"
    src={Util.iconPath(platform)}
    title={platform}
    alt={platform}
  />
);

module.exports = ContestImage;
