const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// POST: Add movie with file upload
router.post('/', movieController.upload.single('video'), movieController.addMovie);

// GET: Fetch all movies
router.get('/getall', movieController.getAllMovies);

// GET: Fetch a movie by ID
router.get('/:movieId', movieController.getMovieById);

// DELETE: Delete a movie by ID
router.delete('/:movieId', movieController.deleteMovie);

// GET: Stream the movie video
router.get('/:movieId/stream', movieController.streamMovie);

module.exports = router;
