const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  title: String,
  score: Number,
  carbon: String,
  plastic: String,
  chemicals: String,
  reward: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scan', scanSchema);
