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
// const Movie = require('../models/Movie');

const addMovie = async (req, res) => {
  try {
    const { title, description, genre, year } = req.body;
    const filePath = req.file ? req.file.path : null;

    const movie = await Movie.create({
      title,
      description,
      genre,
      year,
      file: filePath,
      poster,
    });

    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addMovie };



const deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

module.exports = { getAllMovies, getMovie, addMovie, deleteMovie };
