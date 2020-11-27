const store = require('./store');

const SECONDS_IN_A_DAY = 24 * 60 * 60;
const SECONDS_IN_AN_HOUR = 60 * 60;
const SECONDS_IN_A_MINUTE = 60;

class Contest {
  constructor({
    name, startTime, endTime, platform, url,
  }) {
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
    this.platform = platform;
    if (platform === 'atcoder') {
      this.url = 'https://atcoder.jp' + url;
    } else {
      this.url = url;
    }
  }

  getID() {
    return this.name + this.endTime;
  }

  getDuration() {
    let durationInSeconds = this.endTime - this.startTime;

    const days = parseInt(durationInSeconds / SECONDS_IN_A_DAY);
    durationInSeconds %= SECONDS_IN_A_DAY;

    const hours = parseInt(durationInSeconds / SECONDS_IN_AN_HOUR);
    durationInSeconds %= SECONDS_IN_AN_HOUR;

    const minutes = parseInt(durationInSeconds / SECONDS_IN_A_MINUTE);

    let durationStr = '';
    if (days === 1) {
      durationStr += `${days} day `;
    } else if (days !== 0) {
      durationStr += `${days} days `;
    }

    if (hours !== 0) {
      durationStr += `${hours}h `;
    }

    if (minutes !== 0) {
      durationStr += `${minutes}m`;
    }

    return durationStr;
  }

  isHidden() {
    return store.isHidden(this.getID());
  }

  shouldBeDisplayed() {
    return !store.isHidden(this.getID())
        && store.isPlatformEnabled(this.platform);
  }

  hide() {
    store.addToHiddenList(this.getID());
  }

  show() {
    store.removeFromHiddenList(this.getID());
  }

  createGoogleAddToCalendarUrl() {
    const startTimeInMs = new Date(this.startTime).getTime() * 1000;
    const endTimeInMs = new Date(this.endTime).getTime() * 1000;
    const zoneOffsetInMs = new Date().getTimezoneOffset() * 60000;

    const s = new Date(startTimeInMs - zoneOffsetInMs).toISOString().slice(0, 19).replace(/-/g, '')
      .replace(/:/g, '');
    const e = new Date(endTimeInMs - zoneOffsetInMs).toISOString().slice(0, 19).replace(/-/g, '')
      .replace(/:/g, '');
    const calendarTime = `${s}/${e}`;

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(this.name)
    }&dates=${calendarTime}&location=${this.url}&pli=1&uid=&sf=true&output=xml#eventpage_6`;
  }
}

module.exports = Contest;
