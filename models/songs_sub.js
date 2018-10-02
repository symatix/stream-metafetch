const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const songListSchema = new Schema({
	artist: String,
	title: String,
	time: Number
});

module.exports = songListSchema;