const subscription = function (platform) {
  if (localStorage.getItem(platform) == 'true') {
    return true;
  } if (!localStorage.getItem(platform)) {
    return true;
  }
  return false;
};

const toggleSubscription = function (platform) {
  if (subscription(platform)) {
    ga('send', 'event', 'Platform Setting', 'UnCheck', platform);
    localStorage.setItem(platform, 'false');
  } else {
    ga('send', 'event', 'Platform Setting', 'Check', platform);
    localStorage.setItem(platform, 'true');
  }
};

const initialize = function () {
  const supportedPlatforms = ['HACKEREARTH', 'HACKERRANK', 'CODECHEF', 'CODEFORCES', 'TOPCODER', 'GOOGLE', 'OTHER'];
  supportedPlatforms.forEach((platform) => {
    if (!localStorage.getItem(platform)) localStorage.setItem(platform, 'true');
  });
  // Initialize Hidden Contest List
  if (!localStorage.getItem('HIDDEN_LIST')) localStorage.setItem('HIDDEN_LIST', '{}');
};

module.exports = {
  subscription,
  initialize,
  toggleSubscription,
};
