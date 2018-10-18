const React = require('react');
const Util = require('../util');
const store = require('../store');

const PlatformSettings = React.createClass({
  getInitialState() {
    return {
      checked: store.isPlatformEnabled(this.props.platform),
    };
  },
  onClickHandler() {
    if (store.isPlatformEnabled(this.props.platform)) {
      ga('send', 'event', 'Platform Setting', 'UnCheck', this.props.platform);
      store.disablePlatform(this.props.platform);
    } else {
      ga('send', 'event', 'Platform Setting', 'Check', this.props.platform);
      store.enablePlatform(this.props.platform);
    }

    this.setState({ checked: store.isPlatformEnabled(this.props.platform) });
  },
  render() {
    const iconAndColor = (platform) => {
      if (store.isPlatformEnabled(platform)) return 'fa-check green-text';
      return 'fa-times red-text';
    };

    return (
      <li className="platform-setting">
        <img src={Util.iconPath(this.props.platform)} alt={this.props.platform} />
        <span className="platform-name">{this.props.platform}</span>
        <i
          className={`fa fa-2x ${iconAndColor(this.props.platform)}`}
          id={this.props.platform}
          onClick={this.onClickHandler}
        />
      </li>
    );
  },
});

module.exports = PlatformSettings;
