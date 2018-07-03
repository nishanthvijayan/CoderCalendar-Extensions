const React = require('react');
const PlatformSetting = require('../PlatformSetting');
const Settings = require('../../settings');

const SettingsContainer = React.createClass({
  render() {
    const supportedPlatforms = ['HACKEREARTH', 'HACKERRANK', 'CODECHEF', 'CODEFORCES', 'TOPCODER', 'GOOGLE', 'OTHER'];

    return (
      <div className="settings-container">
        <div id="subscribe" className="top-title">
          <div className="title">
            <h3>
Subscribe
            </h3>
          </div>
          <div className="subscribeContent">
            {supportedPlatforms.map(platform => (
              <div>
                <PlatformSetting platform={platform} />
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
});

module.exports = SettingsContainer;
