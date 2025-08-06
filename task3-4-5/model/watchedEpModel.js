const mongoose = require('mongoose');

const epSchema = new mongoose.Schema({
  title: String,
  season: Number,
  episodeNumber: Number,
  userReview: String,
  watchedAt: {
    type: Date,
    default: Date.now
  }
});

const watched_episode = mongoose.model('watchedEpisode', epSchema);
module.exports = watched_episode;