const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    genre: { type: String },
    videoUrl: { type: String, required: true },  // Path to the video file
    thumbnailUrl: { type: String },
    duration: { type: Number },
    rating: { type: Number }
});

module.exports = mongoose.model('Movie', movieSchema);
