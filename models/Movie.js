const mongoose=require('mongoose')
const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  genre: String,
  year: Number,
  poster: String,
  file: String, // path or URL to poster image
});
module.exports = mongoose.model('Movie', movieSchema);