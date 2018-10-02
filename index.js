var radio = require('radio-stream');
var mongoose = require('mongoose');
var parseMetaData = require('./utils/parseMetaData');
var config = require('./config');
var log = require('./utils/log');
var generateLog = require('./utils/generateLog');

// set up dbs
var Stations = require('./models/stations');
var Songs = require('./models/songs');
mongoose.connect(config.mongoUri, { useNewUrlParser: true });

// find all stations from "stations collection, prepare event listener and 
// push song changes to subdocument in "songs" collection on metadata event
Stations.find({}, function (err, stations) {
    if (err) { return console.log(err); }

    // append eventlistener
    var streams = stations.map(stream => {
        stream.readStream = radio.createReadStream(stream.url);
        return stream
    })

    // push changes to corresponding document in "songs" collection
    streams.forEach(({ station, readStream }) => {
        readStream.on("metadata", function(data){
            var metadata = parseMetaData(data)
            Songs.findOneAndUpdate({ station }, 
                {$push: { song_list: metadata }}, 
                function(err, song){
                    if (err) { return generateLog(log(err)); };
                    generateLog(log(null, station, metadata));
            });
        })
    })
});
