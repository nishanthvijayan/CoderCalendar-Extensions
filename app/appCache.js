const Util = require('./util');

const appCache = {
  store(contests) {
    contests.ongoing = contests.ongoing.map((contest) => {
      contest.EndTime = Util.convertToBrowzerTimezone(contest.EndTime).toString();
      return contest;
    });

    contests.upcoming = contests.upcoming.map((contest) => {
      contest.StartTime = Util.convertToBrowzerTimezone(contest.StartTime).toString();
      contest.EndTime = Util.convertToBrowzerTimezone(contest.EndTime).toString();
      return contest;
    });

    const now = (new Date()).getTime() / 1000;
    localStorage.CACHED_DATA = JSON.stringify(contests);
    localStorage.CACHED_TIME = now;
  },

  fetch() {
    if (this.empty()) {
      return { data: { ongoing: [], upcoming: [] }, time: 0 };
    }
    return {
      data: JSON.parse(localStorage.CACHED_DATA),
      time: localStorage.CACHED_TIME,
    };
  },

  dataOlderThan(minutes) {
    const now = (new Date()).getTime() / 1000;
    return !!((now - (minutes * 60)) > localStorage.CACHED_TIME);
  },

  empty() {
    return !(localStorage.CACHED_DATA);
  },
};

module.exports = appCache;
