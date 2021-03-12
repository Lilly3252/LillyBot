const { Message } = require("discord.js");

function msToHMS( ms ) {
    // 1- Convert to seconds:
    var seconds = ms / 1000;
    // 2- Extract hours:
    var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    alert( hours+" hours and "+minutes+" minutes and "+seconds+" seconds!" );
}

var timespan = 3723000; // duration in milliseconds
msToHMS( timespan );
msToHMS( 65000 );


setTimeout(time, arg);
clearTimeout(time);
exports.time = time;
