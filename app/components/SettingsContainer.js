var React = require('react');
var ContestTypeHeader = require('./ContestTypeHeader');
var ContestList = require('./ContestList');
var PlatformSetting = require('./PlatformSetting');
var Cache = require('../appCache');
var Hide = require('../hide')

var Settings = React.createClass({
    render: function(){
        var supportedPlatforms = ['HACKEREARTH', 'HACKERRANK', 'CODECHEF', 'CODEFORCES', 'TOPCODER', 'GOOGLE', 'OTHER'];

        return(
            <div className= 'settings-container'>
                <div id="subscribe" className="top-title">
                    <div className='title'><h3>Subscribe</h3></div>
                    <div className="subscribeContent">
                        {supportedPlatforms.map(function(platform){
                            return (
                                <div>
                                    <PlatformSetting platform={platform} />
                                    <hr/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Settings;
