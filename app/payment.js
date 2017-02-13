var saveLicence = function(type){
	if(type == 'free'){
		chrome.storage.local.set({'SOMEKEY': "8791325632"});
	}else{
		chrome.storage.local.set({'SOMEKEY': "kmjnhb456"});
	}
}

var buyPremium = function(){
	var sku = "cc_premium";
	google.payments.inapp.buy({
	  'parameters': {'env': 'prod'},
	  'sku': sku,
	  'success': function(){
			saveLicence('premium');
	  },
	  'failure': function(){}
	});
}

var isPremiumUser = function(premiumUserCallback, freeUserCallback){
  	if(freeUserCallback == undefined)
  		freeUserCallback = function(){};

  	chrome.storage.local.get("SOMEKEY", function(response){
  		var value = response['SOMEKEY'];
  		if(value == undefined){
			google.payments.inapp.getPurchases({
				'parameters': {'env': 'prod'},
				'success': function(response){
					details = response.response;
					if(details.length == 1){
						saveLicence('premium');
						premiumUserCallback();
					}else{
						saveLicence('free');
						freeUserCallback();	
					}
				},
				'failure': function(response){
					freeUserCallback();
				}
			});
  		}else if(value == 'kmjnhb456'){
  			premiumUserCallback();
  		}else{
  			freeUserCallback();
  		}
  	});
}

module.exports = {
    buyPremium: buyPremium,
    isPremiumUser: isPremiumUser
};
