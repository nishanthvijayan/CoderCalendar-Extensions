const React = require('react');
const AllPlatformsSettings = require('../AllPlatformsSettings.js');

const SettingsContainer = () => (
  <div className="settings-container">
    <div id="subscribe" className="top-title">
      <div className="title">
        <h3>
Subscribe
        </h3>
      </div>
      <div className="subscribeContent">
      <AllPlatformsSettings />
      </div>
    </div>
  </div>
);

module.exports = SettingsContainer;
