var saveLicence = function(type){
    if(type == 'free'){
        chrome.storage.sync.set({'5646265949': "8791325632"});
    }else{
        chrome.storage.sync.set({'5646265949': "kmjnhb456"});
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

    chrome.storage.sync.get("5646265949", function(response){
        var value = response['5646265949'];
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
