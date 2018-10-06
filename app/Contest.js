const store = require('./store');

class Contest {
  constructor({
    Name, StartTime, EndTime, Platform, url, Duration,
  }) {
    this.Name = Name;
    this.StartTime = StartTime;
    this.EndTime = EndTime;
    this.Platform = Platform;
    this.url = url;
    this.Duration = Duration;
  }

  getID() {
    return this.Name + this.EndTime;
  }

  isHidden() {
    return store.isHidden(this.getID());
  }

  shouldBeDisplayed() {
    return !store.isHidden(this.getID())
        && store.isPlatformEnabled(this.Platform);
  }

  hide() {
    store.addToHiddenList(this.getID());
  }

  show() {
    store.removeFromHiddenList(this.getID());
  }

  createGoogleAddToCalendarUrl() {
    const curTime = new Date();
    const startTime = Date.parse(this.StartTime);
    const endTime = Date.parse(this.EndTime);

    const s = new Date(startTime - ((curTime).getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace(/-/g, '')
      .replace(/:/g, '');
    const e = new Date(endTime - ((curTime).getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace(/-/g, '')
      .replace(/:/g, '');
    const calendarTime = `${s}/${e}`;

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(this.Name)
    }&dates=${calendarTime}&location=${this.url}&pli=1&uid=&sf=true&output=xml#eventpage_6`;
  }
}

module.exports = Contest;
