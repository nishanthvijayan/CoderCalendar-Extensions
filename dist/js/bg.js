function getURLs(){
	var req =  new XMLHttpRequest();
	req.open("GET","http://contesttrackerapi.herokuapp.com/",true);
	req.send();
	req.onload = function(){
		var notification_count = 0;
		var parsedJSONResult = JSON.parse(req.responseText).result
		var res = parsedJSONResult.upcoming
		var localStorageData = localStorage.getItem("FetchedContestURLs");
		if((localStorageData === null) || (localStorageData.length === 0)){ localStorageData = "{}";}
		var prevFetchContestURLs = JSON.parse(localStorageData);
		for (var i=0,  tot=res.length; i < tot; i++) {
			if(res[i].url in prevFetchContestURLs){continue;}
			notification_count++;
		}
		if(notification_count>0){	
			chrome.browserAction.setBadgeText({text: notification_count.toString()});
			chrome.browserAction.setBadgeBackgroundColor({ color: "#4c9bff"});
		}
	};
}
setInterval(getURLs(),1800000);