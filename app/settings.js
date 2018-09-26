const { SUPPORTED_PLATFORMS } = require('constants');

const subscription = (platform) => {
  if (localStorage.getItem(platform) == 'true') {
    return true;
  } if (!localStorage.getItem(platform)) {
    return true;
  }
  return false;
};

const toggleSubscription = (platform) => {
  if (subscription(platform)) {
    ga('send', 'event', 'Platform Setting', 'UnCheck', platform);
    localStorage.setItem(platform, 'false');
  } else {
    ga('send', 'event', 'Platform Setting', 'Check', platform);
    localStorage.setItem(platform, 'true');
  }
};

const initialize = () => {
  SUPPORTED_PLATFORMS
    .filter(p => !localStorage.getItem(p))
    .forEach(p => localStorage.setItem(p, 'true'));

  // Initialize Hidden Contest List
  if (!localStorage.getItem('HIDDEN_LIST')) {
    localStorage.setItem('HIDDEN_LIST', '{}');
  }
};

module.exports = {
  subscription,
  initialize,
  toggleSubscription,
};
