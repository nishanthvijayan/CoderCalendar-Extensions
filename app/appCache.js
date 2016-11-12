var appCache = {
    store: function(contests){
        var now = (new Date()).getTime()/1000;
        localStorage.CACHED_DATA  = JSON.stringify(contests);
        localStorage.CACHED_TIME = now;
    },

    fetch: function(){
        if (this.empty()){
            return { data: {ongoing: [], upcoming: []}, time: 0 };
        }else{
            return {
                data: JSON.parse(localStorage.CACHED_DATA),
                time: localStorage.CACHED_TIME
            };
        }
    },

    dataOlderThan: function(minutes = 5){
        var now = (new Date()).getTime()/1000;
        return !!((now-(minutes*60)) > localStorage.CACHED_TIME);
    },

    empty: function(){
        return !(localStorage.CACHED_DATA);
    }
};

module.exports = appCache;
