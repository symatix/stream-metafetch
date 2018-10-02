var fs = require('fs');
var date = require('./date');

module.exports = function(log){
    var logName = `./logs/LOG-${date()}`

    var logFile = fs.createWriteStream(logName, {flags:'a'});
    logFile.write(log + "\n")
}