const { SUPPORTED_PLATFORMS } = require('constants');

const isPlatformEnabled = (platform) => {
  if (localStorage.getItem(platform) == 'true') {
    return true;
  } if (!localStorage.getItem(platform)) {
    return true;
  }
  return false;
};

const disablePlatform = () => {
  ga('send', 'event', 'Platform Setting', 'UnCheck', platform);
  localStorage.setItem(platform, 'false');
}

const enablePlatform = () => {
  ga('send', 'event', 'Platform Setting', 'Check', platform);
  localStorage.setItem(platform, 'true');
}

const togglePlatform = (platform) => {
  if (isPlatformEnabled(platform)) {
    disablePlatform()    
  } else {
    enablePlatform()
  }
};

const initializeSettings = () => {
  SUPPORTED_PLATFORMS
    .filter(p => !localStorage.getItem(p))
    .forEach(p => localStorage.setItem(p, 'true'));

  // Initialize Hidden Contest List
  if (!localStorage.getItem('HIDDEN_LIST')) {
    localStorage.setItem('HIDDEN_LIST', '{}');
  }
};

module.exports = {
  isPlatformEnabled,
  initializeSettings,
  togglePlatform,
};
