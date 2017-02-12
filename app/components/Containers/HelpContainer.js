var React = require('react');

var Help = React.createClass({
	onClickAndroid: function(){
		chrome.tabs.create({ url: "https://play.google.com/store/apps/details?id=com.corphots.coderscalendar" });
	},
    render: function(){
        return(
        	<div>
	            <div className="top-title">
	                <div className = 'title'>
	                    <h3>New Features!</h3>
	                </div>
	                
	                <a><li><h3>
	                	<br/>
	                	Click <i className="fa fa-bell-o fa-lg green-text option-icon"/> to recieve Desktop Notification alert few minutes before a contest starts!
	                	<br/><br/>
	                	<b>Note:</b> Chrome should be open to recieve the Notification.
	                	<br/>
	                </h3></li></a>
	                <hr/>
	                <a><li><h3>
	                	<br/>
	                	Click <i className="fa fa-bell-slash fa-lg red-text option-icon"/> to remove Desktop Notification alert
	                	<br/>
	                </h3></li></a>
	                <hr/>
	                <a><li><h3>
	                	<br/>
	                	Click <i className="fa fa-trash fa-lg option-icon circular-border red-text"/ > to recieve Hide a contest.
	                	<br/>
	                </h3></li></a>
	            </div>
            </div>
        )
    }
});

module.exports = Help;
