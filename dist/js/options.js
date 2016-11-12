$(document).ready(function(){
    supportedPlatforms = ['Hackerearth', 'Hackerrank', 'Codechef', 'Codeforces', 'Topcoder', 'Google', 'Other'];

    //initializing preference values in care they are not set.
    $.each(supportedPlatforms,function(i, platform){
        if(!localStorage.getItem(platform.toUpperCase())) localStorage.setItem(platform.toUpperCase(),'true');
        $('#' + platform)[0].checked = ( localStorage.getItem(platform.toUpperCase())=="true" );
    });

    $(':checkbox').change( function(){
        $.each(supportedPlatforms,function(i, platform){
            localStorage.setItem(platform.toUpperCase(), $('#' + platform)[0].checked);    
        });
    });
});