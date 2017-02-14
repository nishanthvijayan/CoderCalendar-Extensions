var React = require('react');

var AddToCalendarButton = React.createClass({
    constructGoogleAddToCalendarButton: function(contest){
        var curTime  = new Date();
        var startTime = Date.parse(contest.StartTime);
        var endTime = Date.parse(contest.EndTime);
        var s = new Date(startTime - ((curTime).getTimezoneOffset()*60000 )).toISOString().slice(0,19).replace(/-/g,"").replace(/:/g,"");
        var e = new Date(endTime - ((curTime).getTimezoneOffset()*60000 )).toISOString().slice(0,19).replace(/-/g,"").replace(/:/g,"");
        var calendarTime = s+'/'+e
        return "https://www.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(contest.Name)+
                   "&dates="+calendarTime+"&location="+contest.url+"&pli=1&uid=&sf=true&output=xml#eventpage_6";
    },
    onClickAddToCalendarButton: function(){
        chrome.tabs.create({url: this.state.url});
    },
    componentDidMount: function(){
        if (this.props.type == 'upcoming'){
            this.setState({
                url: this.constructGoogleAddToCalendarButton(this.props.details)
            });
        }
    },
    render: function(){
        if (this.props.type == 'upcoming'){
            return(
                <i className="fa fa-calendar fa-lg option-icon" style={{"color": "#4caf50", "cursor": "pointer"}} onClick={this.onClickAddToCalendarButton} title="Add to Google Calendar" />
            )
        }else{
            return null
        }
    }
});

AddToCalendarButton.propTypes = {
  type: React.PropTypes.string,
  details: React.PropTypes.object
}

module.exports = AddToCalendarButton;
