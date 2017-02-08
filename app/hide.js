var hideContest = function (contest){
    var hash = contest.Name + contest.EndTime;
    var hiddenContests = JSON.parse(localStorage.getItem('HIDDEN_LIST'));
    hiddenContests[hash] = 1;
    localStorage.setItem('HIDDEN_LIST', JSON.stringify(hiddenContests));
}

var showContest = function (contest){
    var hash = contest.Name + contest.EndTime;
    var hiddenContests = JSON.parse(localStorage.getItem('HIDDEN_LIST'));
    hiddenContests[hash] = 0;
    localStorage.setItem('HIDDEN_LIST', JSON.stringify(hiddenContests));
}

var isHidden = function (contest){
    var hash = contest.Name + contest.EndTime;
    var hiddenContests = JSON.parse(localStorage.getItem('HIDDEN_LIST'));
    if(hiddenContests == {})
        return false;
    if(hiddenContests == null)
        return false;
    if(hash in hiddenContests && hiddenContests[hash] == 1)
        return true;
    if(!hash in hiddenContests)
        return false;
    return false;
}

module.exports = {
    hideContest: hideContest,
    showContest: showContest,
    isHidden: isHidden
};
