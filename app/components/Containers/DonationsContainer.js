const React = require('react');

const onClickBeerDonationHandler = () => {
  ga('send', 'event', 'Buy me Beer link');
  chrome.tabs.create({ url: 'https://imjo.in/rbNqse' });
};

const onClickAnyDonationHandler = () => {
  ga('send', 'event', 'Donate any amount link');
  chrome.tabs.create({ url: 'https://www.instamojo.com/@nishanthvijayan' });
};

const onClickImageHandler = () => {
  ga('send', 'event', 'Github Profile link');
  chrome.tabs.create({ url: 'https://github.com/nishanthvijayan' });
};

const onClickFeedbackHandler = () => {
  ga('send', 'event', 'Feedback link');
  chrome.tabs.create({ url: 'https://goo.gl/forms/vgVJOQKwooO2pur13' });
};

const Donations = () => (
  <div className="donations-container" style={{ height: 400 }}>
    <div className="top-title">
      <div className="title">
        <h3>
Buy me a Beer!
        </h3>
      </div>
    </div>
    <div className="message">
      <img
        src="https://github.com/nishanthvijayan.png"
        className="circle-image"
        style={{ height: 80 }}
        alt="nishanth"
        onClick={onClickImageHandler}
      />
      <br />
      <br />
      <p>
                    If you find this extension helpful, I urge you to make a small donation
                    to help me keep this awesome product running.
                    Thank you!
      </p>
      <br />
      <br />
      <a className="donation-button" onClick={onClickBeerDonationHandler}>
Buy me a Beer! (₹200)
      </a>
      <a className="donation-button" onClick={onClickAnyDonationHandler}>
Donate any amount
      </a>
    </div>
    <br />
    <br />
    <br />
    <div className="message">
      <hr />
      <br />
                    Complaints? Suggestions for Improvement? Feedback?
      <br />
                    Let me know
      <span onClick={onClickFeedbackHandler} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
        {' '}
here
      </span>
      <br />
    </div>
  </div>
);

module.exports = Donations;
