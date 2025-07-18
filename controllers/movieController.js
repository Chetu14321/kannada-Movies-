const Movie = require('../models/Movie');

const getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

const getMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ message: 'Not found' });
  res.json(movie);
};


const addMovie = async (req, res) => {
  try {
    const { title, genre, description, poster } = req.body;
    const videoFile = req.file;

    if (!videoFile) {
      return res.status(400).json({ message: "Video file is required." });
    }

    const videoUrl = `${req.protocol}://${req.get("host")}/uploads/${videoFile.filename}`;

    const newMovie = await Movie.create({
      title,
      genre,
      description,
      poster, // Use poster from body directly
      file: videoUrl,
    });

    res.status(201).json(newMovie);
  } catch (err) {
    console.error("Add Movie Error:", err);
    res.status(500).json({ message: "Error while adding movie" });
  }
};










const deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

module.exports = { getAllMovies, getMovie, addMovie, deleteMovie };
