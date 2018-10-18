const store = require('./store');

class Contest {
  constructor({
    name, startTime, endTime, platform, url,
  }) {
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
    this.platform = platform;
    this.url = url;
  }

  getID() {
    return this.name + this.endTime;
  }

  getDuration() {
    return '2h';
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
    const curTime = new Date();
    const startTime = new Date(this.startTime);
    const endTime = new Date(this.endTime);

    const s = new Date(startTime - ((curTime).getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace(/-/g, '')
      .replace(/:/g, '');
    const e = new Date(endTime - ((curTime).getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace(/-/g, '')
      .replace(/:/g, '');
    const calendarTime = `${s}/${e}`;

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(this.name)
    }&dates=${calendarTime}&location=${this.url}&pli=1&uid=&sf=true&output=xml#eventpage_6`;
  }
}

module.exports = Contest;
