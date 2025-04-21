const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  spotifyId: String,
  title: String,
  artist: String,
  coverUrl: String
});

module.exports = mongoose.model('Song', songSchema);
