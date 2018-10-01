const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const songListSchema = require('./songs_sub')


const songSchema = new Schema({
    station: String,
    song_list: [songListSchema]
}, { collection: 'songs' })

module.exports = mongoose.model('songs', songSchema);

