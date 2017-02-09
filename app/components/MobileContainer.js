var React = require('react');

var Mobile = React.createClass({
	onClickAndroid: function(){
		chrome.tabs.create({ url: "https://play.google.com/store/apps/details?id=com.corphots.coderscalendar" });
	},
    render: function(){
        return(
        	<div>
	            <div className="top-title">
	                <div className = 'title'>
	                    <h3>Available on Android</h3>
	                </div>
	                <img 
	                	height="80px" width="180px" alt="Get it on Google Play" 
	                	src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
	                	onClick={this.onClickAndroid}
	                />
	            </div>
            </div>
        )
    }
});

module.exports = Mobile;
