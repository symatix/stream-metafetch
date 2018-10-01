var radio = require('radio-stream');
var mongoose = require('mongoose');
var parseMetaData = require('./utils/parseMetaData');

// set up dbs
var Stations = require('./models/stations');
var Songs = require('./models/songs');
mongoose.connect('mongodb://yammat:gazda.321@ds257851.mlab.com:57851/yammat', { useNewUrlParser: true });

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
                    if (err) { return console.log(err) };
                    console.log(`==> ${station} updated with [${metadata.artist} - ${metadata.title}]`)
            });
        })
    })
});
