const React = require('react');
const PlatformSetting = require('../PlatformSetting');
const { SUPPORTED_PLATFORMS } = require('../../constants');

const SettingsContainer = () => (
  <div className="settings-container">
    <div id="subscribe" className="top-title">
      <div className="title">
        <h3>
Subscribe
        </h3>
      </div>
      <div className="subscribeContent">
        {SUPPORTED_PLATFORMS.map(platform => (
          <div>
            <PlatformSetting platform={platform} />
            <hr />
          </div>
        ))}
      </div>
    </div>
  </div>
);

module.exports = SettingsContainer;
