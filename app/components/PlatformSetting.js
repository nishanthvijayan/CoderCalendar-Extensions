const React = require('react');
const Settings = require('../settings');
const Util = require('../util');

const PlatformSettings = React.createClass({
  getInitialState() {
    return {
      checked: Settings.subscription(this.props.platform),
    };
  },
  onClickHandler() {
    Settings.toggleSubscription(this.props.platform);
    this.setState({ checked: Settings.subscription(this.props.platform) });
  },
  render() {
    const icon_and_color = (platform) => {
      if (Settings.subscription(platform)) return 'fa-check green-text';
      return 'fa-times red-text';
    };
    return (
      <li className="platform-setting">
        <img src={Util.iconPath(this.props.platform)} />
        <i
          className={`fa fa-2x ${icon_and_color(this.props.platform)}`}
          id={this.props.platform}
          onClick={this.onClickHandler}
        />
      </li>
    );
  },
});

module.exports = PlatformSettings;
