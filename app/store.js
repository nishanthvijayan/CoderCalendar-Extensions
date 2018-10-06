const Util = require('./util');

const contestsStore = {
  setContests(contests) {
    localStorage.CACHED_DATA = JSON.stringify({
      ongoing: contests.ongoing.map(contest => ({
        ...contest,
        EndTime: Util.convertToBrowzerTimezone(contest.EndTime).toString(),
      })),

      upcoming: contests.upcoming.map(contest => ({
        ...contest,
        StartTime: Util.convertToBrowzerTimezone(contest.StartTime).toString(),
        EndTime: Util.convertToBrowzerTimezone(contest.EndTime).toString(),
      })),
    });

    const now = (new Date()).getTime() / 1000;
    localStorage.CACHED_TIME = now;
  },

  getContests() {
    if (this.isContestsDataEmpty()) {
      return { data: { ongoing: [], upcoming: [] }, time: 0 };
    }
    return {
      data: JSON.parse(localStorage.CACHED_DATA),
      time: localStorage.CACHED_TIME,
    };
  },

  isContestsDataStale(minutes) {
    const now = (new Date()).getTime() / 1000;
    return !!((now - (minutes * 60)) > localStorage.CACHED_TIME);
  },

  isContestsDataEmpty: () => !(localStorage.CACHED_DATA),
};

const scrollPositionStore = {
  isScollPositionDataFresh() {
    const now = (new Date()).getTime() / 1000;
    return (localStorage.scrollPosition && now - parseInt(localStorage.scrolltime, 10) < 5 * 60);
  },

  getScrollPosition: () => localStorage.scrollPosition,

  setScrollPosition(pos) {
    localStorage.scrollPosition = pos;
    localStorage.scrolltime = (new Date()).getTime() / 1000;
  },

};

const openCountStore = {
  incrementOpenCount() {
    if (isNaN(parseInt(localStorage.OPENCOUNT, 10))) {
      localStorage.OPENCOUNT = '0';
    }

    localStorage.OPENCOUNT = (parseInt(localStorage.OPENCOUNT, 10) + 1).toString();
  },

  getOpenCount: () => parseInt(localStorage.OPENCOUNT, 10),
};

const platformSettingsStore = {
  enablePlatform: platform => localStorage.setItem(platform, 'true'),

  disablePlatform: platform => localStorage.setItem(platform, 'false'),

  isPlatformInitialized: platform => !!localStorage.getItem(platform),

  isPlatformEnabled(platform) {
    if (localStorage.getItem(platform) == 'true') {
      return true;
    } if (!localStorage.getItem(platform)) {
      return true;
    }
    return false;
  },
};

const hiddenContestsStore = {
  isHiddenListInitialized: () => !!localStorage.getItem('HIDDEN_LIST'),

  initializeHiddenList: () => localStorage.setItem('HIDDEN_LIST', '{}'),

  getHiddenList() {
    try {
      return JSON.parse(localStorage.getItem('HIDDEN_LIST'));
    } catch (e) {
      return {};
    }
  },

  addToHiddenList: (itemID) => {
    const hiddenItems = hiddenContestsStore.getHiddenList();
    hiddenItems[itemID] = 1;
    hiddenContestsStore.setHiddenList(hiddenItems);
  },

  removeFromHiddenList: (itemID) => {
    const hiddenItems = hiddenContestsStore.getHiddenList();
    hiddenItems[itemID] = 0;
    hiddenContestsStore.setHiddenList(hiddenItems);
  },

  setHiddenList: obj => localStorage.setItem('HIDDEN_LIST', JSON.stringify(obj)),

  isHidden: (itemID) => {
    const hiddenItems = hiddenContestsStore.getHiddenList();
    if (hiddenItems == {}) return false;
    if (hiddenItems == null) return false;
    if (itemID in hiddenItems && hiddenItems[itemID] == 1) return true;
    if (!(itemID in hiddenItems)) return false;
    return false;
  },
};

const store = {
  ...contestsStore,
  ...scrollPositionStore,
  ...hiddenContestsStore,
  ...platformSettingsStore,
  ...openCountStore,
};

module.exports = store;
