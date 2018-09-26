const askForRatings = () => {
  const opt = {
    type: 'basic',
    title: 'How about a rating on the Extension Store?',
    message: '  ',
    iconUrl: '../img/icon32.png',
    buttons: [{ title: 'Ok, Sure' }, { title: 'Nope' }],
  };

  let currentNotificationId;
  chrome.notifications.create(opt, (id) => { currentNotificationId = id; });
  chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    chrome.notifications.clear(notificationId, () => {
      if (notificationId == currentNotificationId && buttonIndex == 0) {
        chrome.tabs.create({ url: 'https://chrome.google.com/webstore/detail/coders-calendar/bageaffklfkikjigoclfgengklfnidll/reviews' });
      }
    });
  });
};

const askForFeedback = () => {
  const opt = {
    type: 'basic',
    title: 'Help us improve',
    message: 'Would you mind giving us some Feedback?',
    iconUrl: '../img/icon32.png',
    buttons: [{ title: 'Ok, Sure' }, { title: 'Nope' }],
  };

  let currentNotificationId;
  chrome.notifications.create(opt, (id) => { currentNotificationId = id; });
  chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    chrome.notifications.clear(notificationId, () => {
      if (notificationId == currentNotificationId && buttonIndex == 0) {
        chrome.tabs.create({ url: 'https://goo.gl/forms/vgVJOQKwooO2pur13' });
      }
    });
  });
};

const init = () => {
  const opt = {
    type: 'basic',
    title: "Are you enjoying Coder's Calendar?",
    message: '',
    iconUrl: '../img/icon32.png',
    buttons: [{ title: 'Yes!' }, { title: 'Not Really' }],
  };

  let currentNotificationId;
  chrome.notifications.create(opt, (id) => { currentNotificationId = id; });
  chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    chrome.notifications.clear(notificationId, () => {
      if (notificationId == currentNotificationId && buttonIndex == 0) {
        askForRatings();
      } else if (notificationId == currentNotificationId && buttonIndex == 1) {
        askForFeedback();
      }
    });
  });
};

module.exports = {
  init,
};
