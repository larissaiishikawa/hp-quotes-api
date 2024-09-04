const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  text: String,
  character: String,
  movie: String
});

module.exports = mongoose.model('Quote', quoteSchema);
