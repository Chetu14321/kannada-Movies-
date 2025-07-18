const express = require('express');
const {
  getAllMovies,
  getMovie,
  addMovie,
  deleteMovie,
} = require('../controllers/movieController');

const protect = require('../middleware/authMiddleware');
const restrictTo = require('../middleware/roleMiddleware');

const router = express.Router();
const upload = require('../middleware/upload');
router.post("/movies", upload.single("file"), addMovie);



router.get('/getall', getAllMovies);
router.get('/:id', getMovie);
// router.post('/', protect, addMovie); // only logged in
router.delete('/:id', protect, restrictTo('admin'), deleteMovie); // only admin

module.exports = router;
