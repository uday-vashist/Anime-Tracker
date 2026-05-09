const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Anime', 'TV Series'],
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  totalEpisodes: {
    type: Number,
    required: true
  },
  watchedEpisodes: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'],
    default: 'Plan to Watch'
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  review: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  streamingLink: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Show', showSchema);