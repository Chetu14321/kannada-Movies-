const Movie = require('../models/Movie');

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
};

const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movie' });
  }
};

const addMovie = async (req, res) => {
  try {
    console.log('BODY:', req.body);

    const { title, genre, description, year, poster, file } = req.body;

    

    const newMovie = await Movie.create({
      title,
      genre,
      description,
      year: year ? Number(year) : undefined,
      poster,
      file 
    });

    res.status(201).json(newMovie);
  } catch (err) {
    console.error('Add Movie Error:', err);
    res.status(500).json({ message: 'Error while adding movie' });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting movie' });
  }
};

module.exports = { getAllMovies, getMovie, addMovie, deleteMovie };
