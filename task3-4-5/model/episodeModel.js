const mongoose = require('mongoose');

const epSchema = new mongoose.Schema({
  id: Number,
  name: String,
  season: Number,
  number: Number,
  airdate: String,
  summary: String
})

const Episode = mongoose.model('episode', epSchema);
module.exports = Episode;